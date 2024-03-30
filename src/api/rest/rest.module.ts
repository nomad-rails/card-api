import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '@lib/rest/auth.guard';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { CardholderModule } from './cardholder/cardholder.module';
import { CardModule } from './card/card.module';
import { WebhookModule } from './webhook/webhook.module';
import { SeabedModule } from './seabed/seabed.module';

@Module({
  imports: [
    MainModule,
    AuthModule,
    CardholderModule,
    CardModule,
    WebhookModule,
    SeabedModule,
  ],
  providers: [JwtAuthGuard],
})
export class RestModule {}
