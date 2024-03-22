type BridgeCardApiSuccessResponse<T> = {
  status: string;
  message: string;
  data: T;
};

type BridgeCardApiErrorResponse = {
  message: string;
};

type CardHolderAddress = {
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  house_no: string;
};

type IdentityIdTypeRelated =
  | 'ALGERIA_NATIONAL_ID'
  | 'ALGERIA_DRIVERS_LICENSE'
  // Angola
  | 'ANGOLA_NATIONAL_ID'
  | 'ANGOLA_DRIVERS_LICENSE'
  | 'ANGOLA_RESIDENT_CARD'
  | 'ANGOLA_REFUGEE_CARD'
  | 'ANGOLA_VOTER_ID'
  // Argentina
  | 'ARGENTINA_NATIONAL_ID'
  // Benin Republic
  | 'BENIN_REPUBLIC_NATIONAL_ID'
  | 'BENIN_REPUBLIC_DRIVERS_LICENSE'
  | 'BENIN_REPUBLIC_VOTER_ID'
  | 'BENIN_REPUBLIC_RESIDENT_CARD'
  // Brazil
  | 'BRAZIL_NATIONAL_ID'
  // Burkinafaso
  | 'BURKINAFASO_VOTER_ID'
  | 'BURKINAFASO_NATIONAL_ID'
  | 'BURKINAFASO_DRIVERS_LICENSE'
  // Cameroon
  | 'CAMEROON_VOTER_ID'
  | 'CAMEROON_NATIONAL_ID'
  | 'CAMEROON_DRIVERS_LICENSE'
  // Congo
  | 'CONGO_DRIVERS_LICENSE'
  | 'CONGO_NATIONAL_ID'
  // Congo Brazzaville
  | 'CONGO_BRAZZAVILLE_DRIVERS_LICENSE'
  | 'CONGO_BRAZZAVILLE_NATIONAL_ID'
  // Egypt
  | 'EGYPT_NATIONAL_ID'
  | 'EGYPT_DRIVERS_LICENSE'
  | 'EGYPT_RESIDENT_CARD'
  // Gabon
  | 'GABON_NATIONAL_ID'
  | 'GABON_RESIDENT_CARD'
  | 'GABON_HEALTH_INSURANCE_ID'
  // Guinea
  | 'GUINEA_DRIVERS_LICENSE'
  | 'GUINEA_NATIONAL_ID'
  | 'GUINEA_ECOWAS_ID'
  | 'GUINEA_VOTER_ID'
  // Ivorycoast
  | 'IVORYCOAST_NATIONAL_ID'
  | 'IVORYCOAST_DRIVERS_LICENSE'
  | 'IVORYCOAST_RESIDENT_CARD'
  | 'IVORYCOAST_HEALTH_INSURANCE_ID'
  // Kenya
  | 'KENYAN_NATIONAL_ID'
  | 'KENYAN_ALIEN_CARD'
  | 'KENYAN_REFUGEE_ID'
  | 'KENYAN_DRIVERS_LICENSE'
  // Malaysia
  | 'MALAYSIA_NATIONAL_ID'
  // Mali
  | 'MALI_NATIONAL_ID'
  // Mexico
  | 'MEXICO_NATIONAL_ID'
  // Morroco
  | 'MOROCCO_NATIONAL_ID'
  | 'MOROCCO_DRIVERS_LICENSE'
  | 'MOROCCO_RESIDENT_CARD'
  // Netherland
  | 'NETHERLAND_NATIONAL_ID'
  // Niger
  | 'NIGER_DRIVERS_LICENSE'
  // Rwanda
  | 'RWANDA_DRIVERS_LICENSE'
  | 'RWANDA_NATIONAL_ID'
  | 'RWANDA_REFUGEE_CARD'
  | 'RWANDA_NON_CITIZEN_ID'
  // Senegal
  | 'SENEGAL_NATIONAL_ID'
  | 'SENEGAL_ECOWAS_ID'
  // Sierra Leone
  | 'SIERRA_LEONE_NATIONAL_ID'
  | 'SIERRA_LEONE_DRIVERS_LICENSE'
  | 'SIERRA_LEONE_VOTER_ID'
  // South Africa
  | 'SOUTHAFRICAN_NATIONAL_ID'
  | 'SOUTHAFRICAN_GREEN_BOOK'
  | 'SOUTHAFRICAN_RESIDENT_CARD'
  | 'SOUTHAFRICAN_DRIVERS_LICENSE'
  // Togo
  | 'TOGO_DRIVERS_LICENSE'
  | 'TOGO_NATIONAL_ID'
  | 'TOGO_RESIDENT_CARD'
  | 'TOGO_VOTER_ID'
  // Tunisia
  | 'TUNISIA_DRIVERS_LICENSE'
  // Uganda
  | 'UGANDA_VOTERS_ID'
  | 'UGANDA_NATIONAL_ID'
  | 'UGANDA_DRIVERS_LICENSE'
  // United States
  | 'UNITED_STATES_DRIVERS_LICENSE'
  | 'UNITED_STATES_RESIDENCE_CARD'
  // Zambia
  | 'ZAMBIA_DRIVERS_LICENSE'
  | 'ZAMBIA_NATIONAL_ID';

type IdentityIdTypeRelatedPassport =
  | 'ALGERIA_PASSPORT'
  // Angola
  | 'ANGOLA_PASSPORT'
  // Argentina
  | 'ARGENTINA_PASSPORT'
  // Benin Republic
  | 'BENIN_REPUBLIC_PASSPORT'
  // Brazil
  | 'BRAZIL_PASSPORT'
  // Burkinafaso
  | 'BURKINAFASO_PASSPORT'
  // Cameroon
  | 'CAMEROON_PASSPORT'
  // Congo
  | 'CONGO_PASSPORT'
  // Congo Brazzaville
  | 'CONGO_BRAZZAVILLE_PASSPORT'
  // Egypt
  | 'EGYPT_PASSPORT'
  // Gabon
  | 'GABON_PASSPORT'
  // Guinea
  | 'GUINEA_PASSPORT'
  // Ivorycoast
  | 'IVORYCOAST_PASSPORT'
  // Kenya
  | 'KENYAN_PASSPORT'
  // Mali
  | 'MALI_PASSPORT'
  // Mexico
  | 'MEXICO_PASSPORT'
  // Morroco
  | 'MOROCCO_PASSPORT'
  // Netherland
  | 'NETHERLAND_PASSPORT'
  // Niger
  | 'NIGER_PASSPORT'
  // Rwanda
  | 'RWANDA_PASSPORT'
  // Sierra Leone
  | 'SIERRA_LEONE_PASSPORT'
  // South Africa
  | 'SOUTHAFRICAN_PASSPORT'
  // Togo
  | 'TOGO_PASSPORT'
  // Tunisia
  | 'TUNISIA_PASSPORT'
  // Uganda
  | 'UGANDA_PASSPORT'
  // United Kingdom
  | 'UNITED_KINGDOM_INTERNATIONAL_PASSPORT'
  // United States
  | 'UNITED_STATES_INTERNATIONAL_PASSPORT'
  // Zambia
  | 'ZAMBIA_PASSPORT';

type IdentityRelated = {
  id_type: IdentityIdTypeRelated;
  id_no: string;
  id_image: string;
  selfie_image: string;
  back_id_image: string;
};

type IdentityRelatedPassport = {
  id_type: IdentityIdTypeRelatedPassport;
  id_no: string;
  id_image: string;
  selfie_image: string;
};

type IdentityGhana = {
  id_type:
    | 'GHANIAN_SSNIT'
    | 'GHANIAN_VOTERS_ID'
    | 'GHANIAN_DRIVERS_LICENSE'
    | 'GHANIAN_INTERNATIONAL_PASSPORT'
    | 'GHANIAN_GHANA_CARD';
  id_no: string;
  id_image: string;
  selfie_image: string;
};

type IdentityIndia = {
  country: 'IN';
  id_type: 'INDIA_NATIONAL_ID' | 'INDIA_PASSPORT' | 'INDIA_DRIVERS_LICENSE';
  id_no: string;
  id_image: string;
  selfie_image: string;
};

type IdentityNigeriaBVN = {
  id_type: 'NIGERIAN_BVN_VERIFICATION';
  bvn: string;
  selfie_image: string;
};

type IdentityNigeriaOthers = {
  id_type:
    | 'NIGERIAN_NIN'
    | 'NIGERIAN_INTERNATIONAL_PASSPORT'
    | 'NIGERIAN_PVC'
    | 'NIGERIAN_DRIVERS_LICENSE';
  id_no: string;
  id_image: string;
  bvn: string;
};

type IdentityNigeria = IdentityNigeriaBVN | IdentityNigeriaOthers;

type CardHolderIdentity =
  | IdentityRelated
  | IdentityRelatedPassport
  | IdentityGhana
  | IdentityIndia
  | IdentityNigeria;

type MetaData = {
  [key: string]: any;
};

type RegisterCardHolderDto = {
  first_name: string;
  last_name: string;
  address: CardHolderAddress;
  phone: string;
  email_address: string;
  identity: CardHolderIdentity;
  meta_data?: MetaData;
};

type RegisterCardHolderResponse = BridgeCardApiSuccessResponse<{
  cardholder_id: string;
}>;

type GetCardHolderResponse = BridgeCardApiSuccessResponse<{
  address: {
    address: string;
    city: string;
    country: string;
    house_no: string;
    lga: string;
    postal_code: string;
    state: string;
  };
  cardholder_id: string;
  created_at: number;
  email_address: string;
  first_name: string;
  identity_details: {
    blacklisted: boolean;
    date_of_birth: string;
    first_name: string;
    gender: string;
    id_no: string;
    id_type: string;
    last_name: string;
    phone: string;
  };
  is_active: boolean;
  is_id_verified: boolean;
  issuing_app_id: string;
  last_name: string;
  phone: string;
  meta_data: MetaData;
}>;

type DeleteCardHolderResponse = BridgeCardApiSuccessResponse<object>;

type CreateCardDto = {
  cardholder_id: string;
  card_type: 'virtual' | 'physical';
  card_brand: 'Mastercard' | 'Visa';
  card_currency: string;
  pin: string; // AES 256 encrypted 4 digit pin
  meta_data?: MetaData;
};

type CreateCardResponse = BridgeCardApiSuccessResponse<{
  card_id: string;
  currency: string;
}>;

type GetCardDetailsResponse = BridgeCardApiSuccessResponse<{
  billing_address: {
    billing_address1: string;
    billing_city: string;
    billing_country: string;
    billing_zip_code: string;
    country_code: string;
    state: string;
    state_code: string;
  };
  brand: string;
  card_currency: string;
  card_id: string;
  card_name: string;
  card_number: string;
  card_type: string;
  cardholder_id: string;
  created_at: number;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  is_active: boolean;
  issuing_app_id: string;
  last_4: string;
  livemode: boolean;
  meta_data: MetaData;
  balance: string;
  blocked_due_to_fraud: boolean;
  pin_3ds_activated: boolean;
}>;

type GetCardBalanceResponse = BridgeCardApiSuccessResponse<{
  available_balance: string;
}>;

type GetTransactionOTPResponse = BridgeCardApiSuccessResponse<{
  otp: string;
}>;

type FundNairaCardDto = {
  card_id: string;
  amount: string;
  transaction_reference: string;
};

type FundNairaCardResponse = BridgeCardApiSuccessResponse<{
  transaction_reference: string;
}>;

type UnloadNairaCardDto = {
  card_id: string;
  amount: string;
  transaction_reference: string;
};

type UnloadNairaCardResponse = BridgeCardApiSuccessResponse<{
  transaction_reference: string;
}>;

type FreezeCardResponse = BridgeCardApiSuccessResponse<{
  card_id: string;
}>;

type UnfreezeCardResponse = BridgeCardApiSuccessResponse<{
  card_id: string;
}>;

type GetCardTransactionsResponse = BridgeCardApiSuccessResponse<{
  transactions: {
    amount: string;
    bridgecard_transaction_reference: string;
    card_id: string;
    card_transaction_type: string;
    cardholder_id: string;
    client_transaction_reference: string;
    currency: string;
    description: string;
    issuing_app_id: string;
    livemode: boolean;
    transaction_date: string;
    transaction_timestamp: number;
    merchant_category_code?: string;
    enriched_data: {
      is_recurring: boolean;
      merchant_city?: string;
      merchant_code?: string;
      merchant_logo: string;
      merchant_name?: string;
      merchant_website?: string;
      transaction_category?: string;
      transaction_group: string;
    };
  }[];
  meta: {
    total: number;
    pages: number;
    previous?: string;
    next?: string;
  };
}>;
