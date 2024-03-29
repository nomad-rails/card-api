import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { BridgecardModule } from '@/bridgecard/bridgecard.module';

describe('CardController', () => {
  let controller: CardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        BridgecardModule,
      ],
      controllers: [CardController],
      providers: [CardService],
    }).compile();

    controller = module.get<CardController>(CardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
