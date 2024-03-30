import { Module } from '@nestjs/common';
import { SeabedService } from './seabed.service';
import { SeabedController } from './seabed.controller';

@Module({
  controllers: [SeabedController],
  providers: [SeabedService],
})
export class SeabedModule {}
