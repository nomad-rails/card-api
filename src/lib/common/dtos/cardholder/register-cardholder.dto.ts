import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

const ID_TYPE = [
  // Algeria
  'ALGERIA_NATIONAL_ID',
  'ALGERIA_DRIVERS_LICENSE',
  // Angola
  'ANGOLA_NATIONAL_ID',
  'ANGOLA_DRIVERS_LICENSE',
  'ANGOLA_RESIDENT_CARD',
  'ANGOLA_REFUGEE_CARD',
  'ANGOLA_VOTER_ID',
  // Argentina
  'ARGENTINA_NATIONAL_ID',
  // Benin Republic
  'BENIN_REPUBLIC_NATIONAL_ID',
  'BENIN_REPUBLIC_DRIVERS_LICENSE',
  'BENIN_REPUBLIC_VOTER_ID',
  'BENIN_REPUBLIC_RESIDENT_CARD',
  // Brazil
  'BRAZIL_NATIONAL_ID',
  // Burkinafaso
  'BURKINAFASO_VOTER_ID',
  'BURKINAFASO_NATIONAL_ID',
  'BURKINAFASO_DRIVERS_LICENSE',
  // Cameroon
  'CAMEROON_VOTER_ID',
  'CAMEROON_NATIONAL_ID',
  'CAMEROON_DRIVERS_LICENSE',
  // Congo
  'CONGO_DRIVERS_LICENSE',
  'CONGO_NATIONAL_ID',
  // Congo Brazzaville
  'CONGO_BRAZZAVILLE_DRIVERS_LICENSE',
  'CONGO_BRAZZAVILLE_NATIONAL_ID',
  // Egypt
  'EGYPT_NATIONAL_ID',
  'EGYPT_DRIVERS_LICENSE',
  'EGYPT_RESIDENT_CARD',
  // Gabon
  'GABON_NATIONAL_ID',
  'GABON_RESIDENT_CARD',
  'GABON_HEALTH_INSURANCE_ID',
  // Guinea
  'GUINEA_DRIVERS_LICENSE',
  'GUINEA_NATIONAL_ID',
  'GUINEA_ECOWAS_ID',
  'GUINEA_VOTER_ID',
  // Ivorycoast
  'IVORYCOAST_NATIONAL_ID',
  'IVORYCOAST_DRIVERS_LICENSE',
  'IVORYCOAST_RESIDENT_CARD',
  'IVORYCOAST_HEALTH_INSURANCE_ID',
  // Kenya
  'KENYAN_NATIONAL_ID',
  'KENYAN_ALIEN_CARD',
  'KENYAN_REFUGEE_ID',
  'KENYAN_DRIVERS_LICENSE',
  // Malaysia
  'MALAYSIA_NATIONAL_ID',
  // Mali
  'MALI_NATIONAL_ID',
  // Mexico
  'MEXICO_NATIONAL_ID',
  // Morroco
  'MOROCCO_NATIONAL_ID',
  'MOROCCO_DRIVERS_LICENSE',
  'MOROCCO_RESIDENT_CARD',
  // Netherland
  'NETHERLAND_NATIONAL_ID',
  // Niger
  'NIGER_DRIVERS_LICENSE',
  // Rwanda
  'RWANDA_DRIVERS_LICENSE',
  'RWANDA_NATIONAL_ID',
  'RWANDA_REFUGEE_CARD',
  'RWANDA_NON_CITIZEN_ID',
  // Senegal
  'SENEGAL_NATIONAL_ID',
  'SENEGAL_ECOWAS_ID',
  // Sierra Leone
  'SIERRA_LEONE_NATIONAL_ID',
  'SIERRA_LEONE_DRIVERS_LICENSE',
  'SIERRA_LEONE_VOTER_ID',
  // South Africa
  'SOUTHAFRICAN_NATIONAL_ID',
  'SOUTHAFRICAN_GREEN_BOOK',
  'SOUTHAFRICAN_RESIDENT_CARD',
  'SOUTHAFRICAN_DRIVERS_LICENSE',
  // Togo
  'TOGO_DRIVERS_LICENSE',
  'TOGO_NATIONAL_ID',
  'TOGO_RESIDENT_CARD',
  'TOGO_VOTER_ID',
  // Tunisia
  'TUNISIA_DRIVERS_LICENSE',
  // Uganda
  'UGANDA_VOTERS_ID',
  'UGANDA_NATIONAL_ID',
  'UGANDA_DRIVERS_LICENSE',
  // United States
  'UNITED_STATES_DRIVERS_LICENSE',
  'UNITED_STATES_RESIDENCE_CARD',
  // Zambia
  'ZAMBIA_DRIVERS_LICENSE',
  'ZAMBIA_NATIONAL_ID',
  // Algeria
  'ALGERIA_PASSPORT',
  // Angola
  'ANGOLA_PASSPORT',
  // Argentina
  'ARGENTINA_PASSPORT',
  // Benin Republic
  'BENIN_REPUBLIC_PASSPORT',
  // Brazil
  'BRAZIL_PASSPORT',
  // Burkinafaso
  'BURKINAFASO_PASSPORT',
  // Cameroon
  'CAMEROON_PASSPORT',
  // Congo
  'CONGO_PASSPORT',
  // Congo Brazzaville
  'CONGO_BRAZZAVILLE_PASSPORT',
  // Egypt
  'EGYPT_PASSPORT',
  // Gabon
  'GABON_PASSPORT',
  // Guinea
  'GUINEA_PASSPORT',
  // Ivorycoast
  'IVORYCOAST_PASSPORT',
  // Kenya
  'KENYAN_PASSPORT',
  // Mali
  'MALI_PASSPORT',
  // Mexico
  'MEXICO_PASSPORT',
  // Morroco
  'MOROCCO_PASSPORT',
  // Netherland
  'NETHERLAND_PASSPORT',
  // Niger
  'NIGER_PASSPORT',
  // Rwanda
  'RWANDA_PASSPORT',
  // Sierra Leone
  'SIERRA_LEONE_PASSPORT',
  // South Africa
  'SOUTHAFRICAN_PASSPORT',
  // Togo
  'TOGO_PASSPORT',
  // Tunisia
  'TUNISIA_PASSPORT',
  // Uganda
  'UGANDA_PASSPORT',
  // United Kingdom
  'UNITED_KINGDOM_INTERNATIONAL_PASSPORT',
  // United States
  'UNITED_STATES_INTERNATIONAL_PASSPORT',
  // Zambia
  'ZAMBIA_PASSPORT',
  // Ghana
  'GHANIAN_SSNIT',
  'GHANIAN_VOTERS_ID',
  'GHANIAN_DRIVERS_LICENSE',
  'GHANIAN_INTERNATIONAL_PASSPORT',
  'GHANIAN_GHANA_CARD',
  // India
  'INDIA_NATIONAL_ID',
  'INDIA_PASSPORT',
  'INDIA_DRIVERS_LICENSE',
  // Nigeria
  'NIGERIAN_BVN_VERIFICATION',
  'NIGERIAN_NIN',
  'NIGERIAN_INTERNATIONAL_PASSPORT',
  'NIGERIAN_PVC',
  'NIGERIAN_DRIVERS_LICENSE',
];

export class CardholderAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  house_no: string;
}

export class CardholderIdentityDto {
  @ApiProperty({
    description: 'Type of identification.',
    enum: ID_TYPE,
  })
  @IsString()
  @IsNotEmpty()
  id_type: (typeof ID_TYPE)[number];

  @ApiProperty({ description: 'Identification number.', required: false })
  @IsString()
  @IsOptional()
  id_no?: string;

  @ApiProperty({
    description: 'Bank Verification Number (specific to Nigerian users).',
    required: false,
  })
  @IsString()
  @IsOptional()
  bvn?: string;

  @ApiProperty({
    description: 'Image of the identification document.',
    required: false,
  })
  @IsString()
  @IsOptional()
  id_image?: string;

  @ApiProperty({
    description: "Image of the cardholder's selfie.",
    required: false,
  })
  @IsString()
  @IsOptional()
  selfie_image?: string;

  @ApiProperty({
    description: 'Country (specific to Indian users).',
    enum: ['IN'],
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: 'IN';
}

export class RegisterCardholderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ type: CardholderAddressDto })
  @ValidateNested()
  @IsNotEmptyObject()
  address: CardholderAddressDto;

  @ApiProperty()
  @IsPhoneNumber('NG')
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email_address: string;

  @ApiProperty({ type: CardholderIdentityDto })
  @ValidateNested()
  @IsNotEmptyObject()
  identity: CardholderIdentityDto;

  @ApiProperty({ required: false })
  @ValidateNested({ each: true })
  @IsOptional()
  meta_data?: Map<string, string>;
}
