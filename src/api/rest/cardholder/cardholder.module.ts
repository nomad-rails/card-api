import { Module } from '@nestjs/common';
import { CardholderService } from './cardholder.service';
import { CardholderController } from './cardholder.controller';

@Module({
  controllers: [CardholderController],
  providers: [CardholderService],
})
export class CardholderModule {}
