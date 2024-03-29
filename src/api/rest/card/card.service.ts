import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { BridgecardService } from '@/bridgecard/bridgecard.service';
import { UserEntity } from '@lib/common/entities/user.entity';
import { bridgecardReq } from '@lib/helpers/bridgecard-request';
import { CreateCardDto } from '@lib/common/dtos/card/create-card.dto';
import { NairaFundingDto } from '@lib/common/dtos/card/naira-funding.dto';

@Injectable()
export class CardService {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly prisma: PrismaService,
    private readonly bc: BridgecardService,
  ) {}

  async create(user: UserEntity, dto: CreateCardDto) {
    if (!user.holderId) throw new NotFoundException('Cardholder not found');
    const AES256 = await import('aes-everywhere');
    const pin = AES256.encrypt(dto.pin, this.cfg.getOrThrow('BRIDGECARD_SK'));
    const res = await bridgecardReq(() => {
      return this.bc.createCard({ ...dto, cardholder_id: user.holderId, pin });
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { cardId: res.data.data.card_id },
    });
    return res.data.data;
  }

  async details(user: UserEntity, key = false) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => {
      return this.bc.getCardDetails(user.cardId, !key);
    });
    return res.data.data;
  }

  async balance(user: UserEntity) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => this.bc.getCardBalance(user.cardId));
    return res.data.data;
  }

  async txs(
    user: UserEntity,
    page: number,
    start_date?: string,
    end_date?: string,
  ) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => {
      return this.bc.getCardTransactions(
        user.cardId,
        page,
        start_date,
        end_date,
      );
    });
    return res.data.data;
  }

  async txOtp(user: UserEntity, amount: number) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    if (isNaN(amount) || amount <= 0) {
      throw new NotFoundException('Invalid amount');
    }
    const res = await bridgecardReq(() => {
      return this.bc.getTransactionOtp(user.cardId, amount);
    });
    return res.data.data;
  }

  async fund(user: UserEntity, dto: NairaFundingDto) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => {
      return this.bc.fundNairaCard({ ...dto, card_id: user.cardId });
    });
    return res.data.data;
  }

  async unload(user: UserEntity, dto: NairaFundingDto) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => {
      return this.bc.unloadNairaCard({ ...dto, card_id: user.cardId });
    });
    return res.data.data;
  }

  async freeze(user: UserEntity) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => this.bc.freezeCard(user.cardId));
    return res.data.data;
  }

  async unfreeze(user: UserEntity) {
    if (!user.cardId) throw new NotFoundException('Card not found');
    const res = await bridgecardReq(() => this.bc.unfreezeCard(user.cardId));
    return res.data.data;
  }
}
