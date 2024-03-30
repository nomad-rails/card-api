import { Request } from 'express';
import { Controller, Post, Body, Req } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { BridgecardWebhookDto } from '@lib/common/dtos/webhook/bridgecard-webhook.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Webhook')
@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('/bridgecard')
  bridgecard(@Req() req: Request, @Body() dto: BridgecardWebhookDto) {
    return this.webhookService.bridgecard(
      req.headers['X-Webhook-Signature'] as string,
      dto,
    );
  }
}
