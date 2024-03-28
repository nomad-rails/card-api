import * as base58 from 'bs58';
import * as nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { JwtModule } from '@/jwt/jwt.module';
import { CryptoModule } from '@/crypto/crypto.module';
import { getSIWS } from '@lib/helpers/siws';

describe('AuthService', () => {
  let service: AuthService;
  let cfg: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        JwtModule,
        CryptoModule,
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    cfg = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifySIWS', () => {
    it('should verify SIWS and create session', async () => {
      const wallet = Keypair.generate();
      const siws = getSIWS(cfg, wallet.publicKey.toBase58());
      const message = new TextEncoder().encode(siws.prepareMessage());
      const dto = {
        publicKey: wallet.publicKey.toBase58(),
        signature: base58.encode(nacl.sign.detached(message, wallet.secretKey)),
        payload: siws.payload as any,
      };

      await expect(service.verifySIWS(dto)).resolves.toEqual({
        token: expect.any(String),
      });
    });

    it('should throw UnauthorizedException for invalid signature', async () => {
      const wallet = Keypair.generate();
      const siws = getSIWS(cfg, wallet.publicKey.toBase58());
      const message = new TextEncoder().encode(
        `Invalid message for ${wallet.publicKey.toBase58()}`,
      );
      const dto = {
        publicKey: wallet.publicKey.toBase58(),
        signature: base58.encode(nacl.sign.detached(message, wallet.secretKey)),
        payload: siws.payload as any,
      };

      await expect(service.verifySIWS(dto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
