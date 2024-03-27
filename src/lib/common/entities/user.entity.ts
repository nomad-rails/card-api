import { instanceToPlain } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  address: string;

  @ApiProperty()
  holderId: string;

  @ApiProperty()
  verified: boolean;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  toJSON() {
    const plain = instanceToPlain(this);
    return plain as Omit<UserEntity, 'toJSON'>;
  }
}
