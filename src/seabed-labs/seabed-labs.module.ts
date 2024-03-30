import { Global, Module } from '@nestjs/common';
import { SeabedLabsService } from './seabed-labs.service';

@Global()
@Module({
  providers: [SeabedLabsService],
  exports: [SeabedLabsService],
})
export class SeabedLabsModule {}
