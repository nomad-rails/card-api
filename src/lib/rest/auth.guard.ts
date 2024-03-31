import * as base58 from 'bs58';
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
import { PrismaService } from '@/prisma/prisma.service';
import { UserEntity } from '@lib/common/entities/user.entity';

interface Payload {
  kid: string;
  aud: string;
  iss: string;
  sub: string;
  sid: string;
  email: string;
  environment_id: string;
  family_name: string;
  given_name: string;
  lists: any[];
  missing_fields: any[];
  scope: string;
  verified_credentials: (
    | {
        address: string;
        chain: string;
        id: string;
        name_service: Record<string, any>;
        public_identifier: string;
        wallet_name: string;
        wallet_provider: string;
        wallet_properties: {
          turnkeySubOrganizationId: string;
          turnkeyHDWalletId: string;
          isAuthenticatorAttached: boolean;
          turnkeyUserId: string;
        };
        format: 'blockchain';
      }
    | {
        email: string;
        id: string;
        public_identifier: string;
        format: 'email';
        embedded_wallet_id: any;
      }
  )[];
  last_verified_credential_id: string;
  first_visit: string;
  last_visit: string;
  new_user: boolean;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtAuthGuard extends PassportStrategy(Strategy) {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        base58.decode(cfg.getOrThrow('DYNAMIC_AUTH_PK')),
      ).toString(),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Payload) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ForbiddenException('Invalid token');

    const address = payload.verified_credentials.find(
      (cred) => cred.format === 'blockchain',
    )?.public_identifier;
    if (!address) throw new ForbiddenException('Invalid token');

    const user = await this.prisma.user.upsert({
      where: { address },
      create: { address },
      update: {},
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
