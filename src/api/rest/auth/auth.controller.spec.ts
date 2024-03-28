import * as base58 from 'bs58';
import * as nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { CryptoModule } from '@/crypto/crypto.module';
import { getSIWS } from '@lib/helpers/siws';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let cfg: ConfigService<Config>;
  let token: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        JwtModule,
        CryptoModule,
      ],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    cfg = module.get<ConfigService<Config>>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('verifySIWS', () => {
    const wallet = Keypair.generate();

    it('should fail if invalid signature', async () => {
      const siws = getSIWS(cfg, wallet.publicKey.toBase58());
      await expect(
        controller.verifySIWS({
          publicKey: wallet.publicKey.toBase58(),
          signature: base58.encode(
            nacl.sign.detached(
              new TextEncoder().encode(
                `Invalid message for ${wallet.publicKey.toBase58()}`,
              ),
              wallet.secretKey,
            ),
          ),
          payload: siws.payload as any,
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return the token', async () => {
      const siws = getSIWS(cfg, wallet.publicKey.toBase58());
      token = (
        await controller.verifySIWS({
          publicKey: wallet.publicKey.toBase58(),
          signature: base58.encode(
            nacl.sign.detached(
              new TextEncoder().encode(siws.prepareMessage()),
              wallet.secretKey,
            ),
          ),
          payload: siws.payload as any,
        })
      ).token;
      expect(token).toBeDefined();
    });
  });

  describe('whoami', () => {
    it('should return the user', () => {
      // TODO: implement
    });

    it('should fail if not authenticated', () => {
      // TODO: implement
    });

    it('should fail if invalid token', () => {
      // TODO: implement
    });
  });
});
