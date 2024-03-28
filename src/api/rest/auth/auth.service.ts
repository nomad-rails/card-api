import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { VerifySIWSDto } from '@lib/common/dtos/main/verify-siws.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { CryptoService } from '@/crypto/crypto.service';
import { getSIWS } from '@lib/helpers/siws';

@Injectable()
export class AuthService {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly crypto: CryptoService,
  ) {}

  async verifySIWS(dto: VerifySIWSDto) {
    const signature = {
      t: 'sip99',
      s: dto.signature,
    };

    const siws = getSIWS(this.cfg, dto.publicKey, dto.payload);
    const resp = await siws.verify({ payload: siws.payload, signature });
    if (!resp.success) {
      throw new UnauthorizedException(
        resp.error?.message || 'Invalid signature',
      );
    }

    const address = siws.payload.address;
    let user = await this.prisma.user.findUnique({ where: { address } });
    if (!user) user = await this.prisma.user.create({ data: { address } });

    const token = await this.jwt.signAsync(
      { sub: user.id },
      { secret: this.cfg.getOrThrow('JWT_SECRET'), expiresIn: '7d' },
    );
    const { exp } = this.jwt.decode(token) as { exp: number };

    await this.prisma.session.create({
      data: {
        token: this.crypto.hashString(token),
        expiresAt: new Date(exp * 1000),
        user: { connect: { id: user.id } },
      },
    });

    return { token };
  }
}
