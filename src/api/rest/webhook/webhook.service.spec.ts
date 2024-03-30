import * as AES256 from 'aes-everywhere';
import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WebhookService } from './webhook.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { PrismaService } from '@/prisma/prisma.service';
import { BridgecardWebhookDto } from '@lib/common/dtos/webhook/bridgecard-webhook.dto';

function getSignature(cfg: ConfigService<Config>) {
  const BRIDGECARD_SK = cfg.getOrThrow('BRIDGECARD_SK');
  const BRIDGECARD_WHSEC = cfg.getOrThrow('BRIDGECARD_WHSEC');
  return {
    valid: AES256.encrypt(BRIDGECARD_WHSEC, BRIDGECARD_SK),
    invalid: AES256.encrypt('invalid_signature', BRIDGECARD_SK),
  };
}

describe('WebhookService', () => {
  let service: WebhookService;
  let cfg: ConfigService<Config>;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule],
      providers: [WebhookService],
    }).compile();

    service = module.get<WebhookService>(WebhookService);
    cfg = module.get<ConfigService<Config>>(ConfigService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('bridgecard', () => {
    const data = {
      cardholder_id: 'valid_cardholder_id',
    };

    it('should throw ForbiddenException if the decrypted signature is invalid', async () => {
      const signature = getSignature(cfg);
      const dto: BridgecardWebhookDto = {
        event: 'cardholder_verification.successful',
        data,
      };

      jest.spyOn(prisma.user, 'update').mockImplementation();

      await expect(service.bridgecard(signature.invalid, dto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should update user verification status when cardholder verification is successful', async () => {
      const signature = getSignature(cfg);
      const dto: BridgecardWebhookDto = {
        event: 'cardholder_verification.successful',
        data,
      };

      jest.spyOn(prisma.user, 'update').mockImplementation();

      await service.bridgecard(signature.valid, dto);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { holderId: dto.data.cardholder_id },
        data: { verified: true },
      });
    });

    it('should update user verification status when cardholder verification fails', async () => {
      const signature = getSignature(cfg);
      const dto: BridgecardWebhookDto = {
        event: 'cardholder_verification.failed',
        data,
      };

      jest.spyOn(prisma.user, 'update').mockImplementation();

      await service.bridgecard(signature.valid, dto);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { holderId: dto.data.cardholder_id },
        data: { verified: false },
      });
    });

    it('should throw ForbiddenException for invalid event', async () => {
      const signature = getSignature(cfg);
      const dto: BridgecardWebhookDto = {
        event: 'invalid_event',
        data,
      };

      jest.spyOn(prisma.user, 'update').mockImplementation();

      await expect(service.bridgecard(signature.valid, dto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
