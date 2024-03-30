import * as AES256 from 'aes-everywhere';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BridgecardWebhookDto } from '@lib/common/dtos/webhook/bridgecard-webhook.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly prisma: PrismaService,
  ) {}

  async bridgecard(signature: string, dto: BridgecardWebhookDto) {
    const BRIDGECARD_SK = this.cfg.getOrThrow('BRIDGECARD_SK');
    const BRIDGECARD_WHSEC = this.cfg.getOrThrow('BRIDGECARD_WHSEC');
    const decryptedSignature = AES256.decrypt(signature, BRIDGECARD_SK);
    if (decryptedSignature !== BRIDGECARD_WHSEC) {
      throw new ForbiddenException('Invalid signature');
    }

    const event = dto.event as BridgecardWebhookEvents['event'];
    switch (event) {
      case 'cardholder_verification.successful': {
        const data =
          dto.data as unknown as CardholderVerificationSuccessful['data'];
        await this.prisma.user.update({
          where: { holderId: data.cardholder_id },
          data: { verified: true },
        });
        break;
      }

      case 'cardholder_verification.failed': {
        const data =
          dto.data as unknown as CardholderVerificationFailed['data'];
        await this.prisma.user.update({
          where: { holderId: data.cardholder_id },
          data: { verified: false },
        });
        break;
      }

      default:
        throw new ForbiddenException('Invalid event');
    }
  }
}
