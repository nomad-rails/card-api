import { Test, TestingModule } from '@nestjs/testing';
import { CardholderController } from './cardholder.controller';
import { CardholderService } from './cardholder.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { BridgecardModule } from '@/bridgecard/bridgecard.module';

describe('CardholderController', () => {
  let controller: CardholderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        BridgecardModule,
      ],
      controllers: [CardholderController],
      providers: [CardholderService],
    }).compile();

    controller = module.get<CardholderController>(CardholderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
