import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { SeabedService } from './seabed.service';
import { SeabedLabsModule } from '@/seabed-labs/seabed-labs.module';

describe('SeabedService', () => {
  let service: SeabedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true }), SeabedLabsModule],
      providers: [SeabedService],
    }).compile();

    service = module.get<SeabedService>(SeabedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
