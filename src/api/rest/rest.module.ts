import { Module } from '@nestjs/common';
import { JwtAuthGuard } from '$lib/rest/auth.guard';
import { MainModule } from './main/main.module';

@Module({
  imports: [MainModule],
  providers: [JwtAuthGuard],
})
export class RestModule {}
