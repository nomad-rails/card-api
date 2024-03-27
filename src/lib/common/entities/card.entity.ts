import { instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CardEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  cardId: string;

  constructor(partial: Partial<CardEntity>) {
    Object.assign(this, partial);
  }

  toJSON() {
    const plain = instanceToPlain(this);
    return plain as Omit<CardEntity, 'toJSON'>;
  }
}
