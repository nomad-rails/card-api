import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma, SessionStatusEnum } from '@prisma/client';
import { Exclude, instanceToPlain } from 'class-transformer';

export class SessionEntity {
  @ApiProperty({ type: String })
  id: bigint;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  expiresAt: Date;

  @ApiPropertyOptional()
  lastSeenAt: Date;

  @ApiProperty({ type: String })
  userId: bigint;

  @Exclude()
  token: string;

  @ApiProperty({ enum: SessionStatusEnum })
  status: SessionStatusEnum;

  @ApiPropertyOptional()
  attributes: Prisma.JsonValue;

  constructor(partial: Partial<SessionEntity>) {
    Object.assign(this, partial);
  }

  toJSON() {
    return instanceToPlain(this) as Omit<SessionEntity, 'token' | 'toJSON'> & {
      attributes: Record<string, any>;
    };
  }
}
