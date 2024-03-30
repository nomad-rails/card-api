import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { SeabedController } from './seabed.controller';
import { SeabedService } from './seabed.service';
import { SeabedLabsModule } from '@/seabed-labs/seabed-labs.module';

describe('SeabedController', () => {
  let controller: SeabedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), SeabedLabsModule],
      controllers: [SeabedController],
      providers: [SeabedService],
    }).compile();

    controller = module.get<SeabedController>(SeabedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
