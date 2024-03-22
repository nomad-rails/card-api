import { Global, Module } from '@nestjs/common';
import { BridgecardService } from './bridgecard.service';

@Global()
@Module({
  providers: [BridgecardService],
  exports: [BridgecardService],
})
export class BridgecardModule {}
