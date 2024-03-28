import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class VerifySIWSPayloadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  domain: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uri: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  version: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  chainId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nonce: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  issuedAt: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expirationTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notBefore: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  requestId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  resources: string[];
}

export class VerifySIWSDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  publicKey: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  signature: string;

  @ApiProperty()
  @ValidateNested()
  payload: VerifySIWSPayloadDto;
}
