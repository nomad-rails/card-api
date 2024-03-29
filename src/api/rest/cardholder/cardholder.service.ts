import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterCardholderDto } from '@lib/common/dtos/cardholder/register-cardholder.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { BridgecardService } from '@/bridgecard/bridgecard.service';
import { UserEntity } from '@lib/common/entities/user.entity';
import { bridgecardReq } from '@lib/helpers/bridgecard-request';

@Injectable()
export class CardholderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bc: BridgecardService,
  ) {}

  async create(user: UserEntity, dto: RegisterCardholderDto) {
    if (user.holderId) throw new ConflictException('Cardholder already exists');
    const res = await bridgecardReq(() => this.bc.registerCardHolder(dto));
    await this.prisma.user.update({
      where: { id: user.id },
      data: { holderId: res.data.data.cardholder_id },
    });
    return res.data.data;
  }

  async findOne(user: UserEntity) {
    if (!user.holderId) throw new NotFoundException('Cardholder not found');
    const res = await bridgecardReq(() => this.bc.getCardHolder(user.holderId));
    return res.data.data;
  }
}
