import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ApiModule } from './api/api.module';
import { JwtModule } from './jwt/jwt.module';
import { CryptoModule } from './crypto/crypto.module';
import { BridgecardModule } from './bridgecard/bridgecard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ApiModule,
    PrismaModule,
    JwtModule,
    CryptoModule,
    BridgecardModule,
  ],
})
export class AppModule {}
