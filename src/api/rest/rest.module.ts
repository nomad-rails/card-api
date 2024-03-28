import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '@lib/rest/auth.guard';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MainModule, AuthModule],
  providers: [JwtAuthGuard],
})
export class RestModule {}
