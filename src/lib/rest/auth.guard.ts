import { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AuthGuard as PassportAuthGuard,
  PassportStrategy,
} from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '$/prisma/prisma.service';
import { CryptoService } from '$/crypto/crypto.service';
import { UserEntity } from '$lib/common/entities/user.entity';

interface Payload {
  sub: string;
  iat: number;
  exp: number;
  bot?: boolean;
}

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.getOrThrow('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Payload) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ForbiddenException('Invalid token');

    const session = await this.prisma.session.findUnique({
      where: {
        token: this.crypto.hashString(token),
        expiresAt: { gte: new Date() },
        status: 'ACTIVE',
      },
    });
    if (!session) throw new ForbiddenException('Invalid token');

    await this.prisma.session.update({
      where: { id: session.id },
      data: { lastSeenAt: new Date() },
    });

    const uid = payload.sub;
    if (!uid) throw new ForbiddenException('Invalid token');

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: uid }, { address: uid }],
      },
    });

    if (!user) throw new ForbiddenException('Invalid token');
    await this.prisma.session.updateMany({
      where: {
        user: { id: user.id },
        expiresAt: { lt: new Date() },
        status: 'ACTIVE',
      },
      data: { status: 'EXPIRED' },
    });

    return new UserEntity(user);
  }
}

@Injectable()
export class AuthGuard extends PassportAuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const { user } = context.switchToHttp().getRequest() as Request;
    if (!user) throw new ForbiddenException('Invalid token');
    return true;
  }
}
