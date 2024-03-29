import { AxiosResponse } from 'axios';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CardholderService } from './cardholder.service';
import { PrismaService } from '@/prisma/prisma.service';
import { BridgecardService } from '@/bridgecard/bridgecard.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@/prisma/prisma.module';
import { BridgecardModule } from '@/bridgecard/bridgecard.module';
import { UserEntity } from '@lib/common/entities/user.entity';
import { RegisterCardholderDto } from '@lib/common/dtos/cardholder/register-cardholder.dto';

describe('CardholderService', () => {
  let service: CardholderService;
  let prisma: PrismaService;
  let bc: BridgecardService;

  const user: UserEntity = new UserEntity({
    id: '73fbff5e-050a-4358-8663-215916afd10a',
    createdAt: new Date(),
    updatedAt: new Date(),
    address: 'HTpTS4o4o3THQJ4QSejz9po47LGBauQVhwVAYUaLHmYi',
    holderId: null,
    cardId: null,
    verified: false,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        BridgecardModule,
      ],
      providers: [CardholderService],
    }).compile();

    service = module.get<CardholderService>(CardholderService);
    prisma = module.get<PrismaService>(PrismaService);
    bc = module.get<BridgecardService>(BridgecardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: RegisterCardholderDto = {
      first_name: 'John',
      last_name: 'Doe',
      address: {
        address: '123 Main St',
        city: 'Anytown',
        state: 'NY',
        country: 'US',
        postal_code: '12345',
        house_no: '123',
      },
      phone: '123-456-7890',
      email_address: 'john@example.com',
      identity: {
        id_type: 'ALGERIA_NATIONAL_ID',
      },
    };

    it('should create a cardholder and update the user', async () => {
      const prismaUpdateSpy = jest
        .spyOn(prisma.user, 'update')
        .mockImplementation();
      const bridgecardRegisterSpy = jest
        .spyOn(bc, 'registerCardHolder')
        .mockResolvedValue({
          data: {
            data: {
              cardholder_id: 'cardholder_id',
            },
          },
        } as AxiosResponse);

      await service.create(user, dto);

      expect(bridgecardRegisterSpy).toHaveBeenCalledWith(dto);
      expect(prismaUpdateSpy).toHaveBeenCalledWith({
        where: { id: user.id },
        data: { holderId: expect.any(String) },
      });
    });

    it('should throw a ConflictException if the user already has a cardholder', async () => {
      await expect(
        service.create(
          new UserEntity({
            ...user,
            holderId: 'existing_cardholder_id',
          }),
          dto,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('should find and return the cardholder', async () => {
      const _user = new UserEntity({
        ...user,
        holderId: 'cardholder_id',
      });
      const bridgecardGetSpy = jest
        .spyOn(bc, 'getCardHolder')
        .mockResolvedValue({
          data: {
            data: _user,
          },
        } as AxiosResponse);

      const result = await service.findOne(_user);
      expect(bridgecardGetSpy).toHaveBeenCalledWith(_user.holderId);
      expect(result).toEqual(_user);
    });

    it('should throw a NotFoundException if the user does not have a cardholder', async () => {
      await expect(service.findOne(user)).rejects.toThrow(NotFoundException);
    });
  });
});
