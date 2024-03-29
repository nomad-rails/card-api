import { AxiosResponse } from 'axios';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CardService } from './card.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { BridgecardModule } from '@/bridgecard/bridgecard.module';
import { BridgecardService } from '@/bridgecard/bridgecard.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserEntity } from '@lib/common/entities/user.entity';
import { CreateCardDto } from '@lib/common/dtos/card/create-card.dto';

describe('CardService', () => {
  let service: CardService;
  let prisma: PrismaService;
  let bc: BridgecardService;

  const user: UserEntity = new UserEntity({
    id: '73fbff5e-050a-4358-8663-215916afd10a',
    createdAt: new Date(),
    updatedAt: new Date(),
    address: 'HTpTS4o4o3THQJ4QSejz9po47LGBauQVhwVAYUaLHmYi',
    holderId: 'holderId',
    cardId: 'cardId',
    verified: false,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        BridgecardModule,
      ],
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
    prisma = module.get<PrismaService>(PrismaService);
    bc = module.get<BridgecardService>(BridgecardService);
  });

  describe('create', () => {
    const dto = new CreateCardDto();
    dto.card_type = 'virtual';
    dto.card_brand = 'Mastercard';
    dto.card_currency = 'NGN';
    dto.pin = '1234';

    it('should create a new card', async () => {
      jest.spyOn(bc, 'createCard').mockResolvedValue({
        data: {
          data: {
            card_id: 'card_id',
            currency: 'NGN',
          },
        },
      } as AxiosResponse);
      jest.spyOn(prisma.user, 'update').mockImplementation();

      const result = await service.create(
        new UserEntity({ ...user, holderId: 'holderId' }),
        dto,
      );

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { cardId: expect.any(String) },
      });
      expect(result).toEqual({
        card_id: expect.any(String),
        currency: expect.any(String),
      });
    });

    it('should throw NotFoundException if cardholder is not found', async () => {
      await expect(
        service.create(
          new UserEntity({
            ...user,
            holderId: undefined,
            cardId: undefined,
          }),
          dto,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('details', () => {
    it('should get card details', async () => {
      const getCardDetailsMock = jest
        .spyOn(bc, 'getCardDetails')
        .mockResolvedValue({
          data: {
            data: {},
          },
        } as AxiosResponse);

      await service.details(user);
      expect(getCardDetailsMock).toHaveBeenCalledWith(user.cardId, true);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.details(new UserEntity({ ...user, cardId: undefined })),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('balance', () => {
    it('should return card balance', async () => {
      const cardId = user.cardId;
      const balanceData = {
        balance: 1000,
        currency: 'NGN',
      };

      jest.spyOn(bc, 'getCardBalance').mockResolvedValue({
        data: {
          data: balanceData,
        },
      } as AxiosResponse);

      const result = await service.balance(new UserEntity({ ...user, cardId }));
      expect(bc.getCardBalance).toHaveBeenCalledWith(cardId);
      expect(result).toEqual(balanceData);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.balance(new UserEntity({ ...user, cardId: undefined })),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('txs', () => {
    it('should return card transactions', async () => {
      const page = 1;
      const startDate = '2022-01-01';
      const endDate = '2022-01-31';
      const transactionsData = [];

      const getCardTransactionsMock = jest
        .spyOn(bc, 'getCardTransactions')
        .mockResolvedValue({
          data: {
            data: transactionsData,
          },
        } as AxiosResponse);

      const result = await service.txs(user, page, startDate, endDate);
      expect(getCardTransactionsMock).toHaveBeenCalledWith(
        user.cardId,
        page,
        startDate,
        endDate,
      );
      expect(result).toEqual(transactionsData);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.txs(new UserEntity({ ...user, cardId: undefined }), 1),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('txOtp', () => {
    it('should return transaction OTP', async () => {
      const amount = 100;
      const otpData = {
        otp: '123456',
      };

      jest.spyOn(bc, 'getTransactionOtp').mockResolvedValue({
        data: {
          data: otpData,
        },
      } as AxiosResponse);

      const result = await service.txOtp(user, amount);
      expect(bc.getTransactionOtp).toHaveBeenCalledWith(user.cardId, amount);
      expect(result).toEqual(otpData);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.txOtp(new UserEntity({ ...user, cardId: undefined }), 100),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if amount is invalid', async () => {
      await expect(service.txOtp(user, 0)).rejects.toThrow(NotFoundException);
      await expect(service.txOtp(user, -100)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.txOtp(user, NaN)).rejects.toThrow(NotFoundException);
    });
  });

  describe('fund', () => {
    const dto: NairaFundingDto = {
      card_id: user.cardId,
      amount: 1000,
      transaction_reference: '123456789',
    };

    it('should fund the card with naira', async () => {
      const fundNairaCardMock = jest
        .spyOn(bc, 'fundNairaCard')
        .mockResolvedValue({
          data: {
            data: {
              transaction_id: 'transaction_id',
              amount: 1000,
            },
          },
        } as AxiosResponse);

      const result = await service.fund(user, dto);
      expect(fundNairaCardMock).toHaveBeenCalledWith({
        ...dto,
        card_id: user.cardId,
      });
      expect(result).toEqual({
        transaction_id: expect.any(String),
        amount: expect.any(Number),
      });
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.fund(new UserEntity({ ...user, cardId: undefined }), dto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('unload', () => {
    const dto: NairaFundingDto = {
      card_id: user.cardId,
      amount: 1000,
      transaction_reference: '123456789',
    };

    it('should unload naira card', async () => {
      jest.spyOn(bc, 'unloadNairaCard').mockResolvedValue({
        data: {
          data: {
            transaction_id: 'transaction_id',
            amount: 1000,
          },
        },
      } as AxiosResponse);

      const result = await service.unload(user, dto);
      expect(bc.unloadNairaCard).toHaveBeenCalledWith({
        ...dto,
        card_id: user.cardId,
      });
      expect(result).toEqual({
        transaction_id: expect.any(String),
        amount: expect.any(Number),
      });
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.unload(new UserEntity({ ...user, cardId: undefined }), dto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('freeze', () => {
    it('should freeze the card', async () => {
      const expectedResponse = {
        card_id: user.cardId,
      };
      jest.spyOn(bc, 'freezeCard').mockResolvedValue({
        data: { data: expectedResponse },
      } as AxiosResponse);

      const result = await service.freeze(user);
      expect(bc.freezeCard).toHaveBeenCalledWith(user.cardId);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.freeze(new UserEntity({ ...user, cardId: undefined })),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('unfreeze', () => {
    it('should unfreeze the card', async () => {
      const expectedResponse = {
        card_id: user.cardId,
      };
      jest.spyOn(bc, 'unfreezeCard').mockResolvedValue({
        data: { data: expectedResponse },
      } as AxiosResponse);

      const result = await service.unfreeze(user);
      expect(bc.unfreezeCard).toHaveBeenCalledWith(user.cardId);
      expect(result).toEqual(expectedResponse);
    });

    it('should throw NotFoundException if card is not found', async () => {
      await expect(
        service.unfreeze(new UserEntity({ ...user, cardId: undefined })),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
