import { Test, TestingModule } from '@nestjs/testing';
import { MainService } from './main.service';

describe('MainService', () => {
  let service: MainService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainService],
    }).compile();

    service = module.get<MainService>(MainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "pong" when ping is called', () => {
    const result = service.ping();
    expect(result).toBe('pong');
  });
});
