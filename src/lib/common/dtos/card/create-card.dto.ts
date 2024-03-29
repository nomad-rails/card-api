import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ enum: ['virtual', 'physical'] })
  @IsString()
  @IsNotEmpty()
  card_type: 'virtual' | 'physical';

  @ApiProperty({ enum: ['Mastercard', 'Visa'] })
  @IsString()
  @IsNotEmpty()
  card_brand: 'Mastercard' | 'Visa';

  @ApiProperty({ enum: ['NGN', 'USD'] })
  @IsString()
  @IsNotEmpty()
  card_currency: 'NGN' | 'USD';

  @ApiProperty()
  @IsNumber()
  @MinLength(4)
  @MaxLength(4)
  @IsNotEmpty()
  pin: string;

  @ApiProperty({ required: false })
  @ValidateNested({ each: true })
  @IsOptional()
  meta_data?: Map<string, string>;
}
