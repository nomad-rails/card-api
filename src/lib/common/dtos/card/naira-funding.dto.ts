import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NairaFundingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  transaction_reference: string;
}
