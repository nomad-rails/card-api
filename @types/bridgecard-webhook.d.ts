type WebhookMessage<E, T> = {
  event: E;
  data: T;
};

type CardholderVerificationSuccessful = WebhookMessage<
  'cardholder_verification.successful',
  {
    cardholder_id: string;
    is_active: boolean;
    livemode: boolean;
    issuing_app_id: string;
  }
>;

type CardholderVerificationFailed = WebhookMessage<
  'cardholder_verification.failed',
  {
    cardholder_id: string;
    is_active: boolean;
    livemode: boolean;
    issuing_app_id: string;
    error_description: string;
  }
>;

type CardCreationEventSuccessful = WebhookMessage<
  'card_creation_event.successful',
  {
    cardholder_id: string;
    is_active: boolean;
    livemode: boolean;
    issuing_app_id: string;
    error_description: string;
  }
>;

type CardCreationEventFailed = WebhookMessage<
  'card_creation_event.failed',
  {
    cardholder_id: string;
    is_active: boolean;
    livemode: boolean;
    issuing_app_id: string;
    error_description: string;
  }
>;

type CardCreditEventSuccessful = WebhookMessage<
  'card_credit_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    currency: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type CardCreditEventFailed = WebhookMessage<
  'card_credit_event.failed',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    currency: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type CardUnloadEventSuccessful = WebhookMessage<
  'card_unload_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    description: string;
    currency: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type CardUnloadEventFailed = WebhookMessage<
  'card_unload_event.failed',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    description: string;
    currency: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type CardDebitEventSuccessful = WebhookMessage<
  'card_debit_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    description: string;
    currency: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
    merchant_category_code: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type CardDebitEventDeclined = WebhookMessage<
  'card_debit_event.declined',
  {
    amount: string;
    card_id: string;
    cardholder_id: string;
    currency: string;
    decline_reason: string;
    description: string;
    issuing_app_id: string;
    livemode: boolean;
    transaction_date: string;
    transaction_reference: string;
    transaction_timestamp: string;
  }
>;

type CardReversalEventSuccessful = WebhookMessage<
  'card_reversal_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    currency: string;
    transaction_reference: string;
    transaction_date: string;
    transaction_timestamp: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
  }
>;

type CardDeleteEventSuccessful = WebhookMessage<
  'card_delete_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
  }
>;

type CardDeleteEventNotification = WebhookMessage<
  'card_delete_event.notification',
  {
    card_id: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    potential_delete_date: string;
    livemode: boolean;
  }
>;

type NairaCardCreditEventSuccessful = WebhookMessage<
  'naira_card_credit_event.successful',
  {
    card_id: string;
    transaction_reference: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type NairaCardCreditEventFailed = WebhookMessage<
  'naira_card_credit_event.failed',
  {
    card_id: string;
    transaction_reference: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type NairaCardUnloadEventSuccessful = WebhookMessage<
  'naira_card_unload_event.successful',
  {
    card_id: string;
    transaction_reference: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type NairaCardUnloadEventFailed = WebhookMessage<
  'naira_card_unload_event.failed',
  {
    card_id: string;
    transaction_reference: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
    amount: string;
    transaction_type: string;
    transaction_date: string;
    transaction_timestamp: string;
  }
>;

type NairaCardDebitEventSuccessful = WebhookMessage<
  'naira_card_debit_event.successful',
  {
    cardholder_id: string;
    amount: string;
    currency: string;
    is_successful: boolean;
    transaction_type: string;
    transaction_reference: string;
    issuing_app_id: string;
    livemode: boolean;
    description: string;
    transaction_timestamp: number;
    is_card: boolean;
    transaction_date: string;
    enriched_transaction: {
      transaction_category: string;
      transaction_group: string;
      merchant_name: string;
      merchant_logo: string;
      merchant_website: string;
      merchant_city: string;
      is_recurring: boolean;
      merchant_code: string;
    };
  }
>;

type NairaCardDebitEventDeclined = WebhookMessage<
  'naira_card_debit_event.declined',
  {
    cardholder_id: string;
    amount: string;
    currency: string;
    is_successful: boolean;
    transaction_type: string;
    transaction_reference: string;
    issuing_app_id: string;
    livemode: boolean;
    description: string;
    transaction_timestamp: number;
    is_card: boolean;
    transaction_date: string;
    enriched_transaction: {
      transaction_category: string;
      transaction_group: string;
      merchant_name: string;
      merchant_logo: string;
      merchant_website: string;
      merchant_city: string;
      is_recurring: boolean;
      merchant_code: string;
    };
  }
>;

type CardMaintenanceFeeDebitEventSuccessful = WebhookMessage<
  'card_maintenance_fee_debit_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    amount: string;
    currency: string;
    transaction_date: string;
    transaction_timestamp: string;
    livemode: boolean;
    issuing_app_id: string;
    card_transaction_type: string;
  }
>;

type CardBlockedDueToInsufficientFundsActivated = WebhookMessage<
  'card_blocked_due_to_insufficient_funds.activated',
  {
    card_id: string;
    cardholder_id: string;
    date: string;
    timestamp: string;
    livemode: boolean;
    issuing_app_id: string;
    block_reason: string;
  }
>;

type CardFreezedDueTo_30DaysInactivityEventSuccessful = WebhookMessage<
  'card_freezed_due_to_30_days_inactivity_event.successful',
  {
    card_id: string;
    cardholder_id: string;
    livemode: boolean;
    issuing_app_id: string;
    block_reason: string;
  }
>;

type CardFlaggedDueToSuspiscionOfFraudActivated = WebhookMessage<
  'card_flagged_due_to_suspiscion_of_fraud.activated',
  {
    card_id: string;
    cardholder_id: string;
    livemode: boolean;
    issuing_app_id: string;
    reason: string;
  }
>;

type NairaAccountCreditEventSuccessful = WebhookMessage<
  'naira_account_credit_event.successful',
  {
    transaction_reference: string;
    cardholder_id: string;
    currency: string;
    issuing_app_id: string;
    livemode: boolean;
    amount: string;
    description: string;
    transaction_type: string;
  }
>;

type NairaAccountTransferEventSuccessful = WebhookMessage<
  'naira_account_transfer_event.successful',
  {
    cardholder_id: string;
    amount: string;
    currency: string;
    is_successful: boolean;
    transaction_type: string;
    recipient_account_number: string;
    recipient_bank_code: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
  }
>;

type NairaAccountTransferEventFailed = WebhookMessage<
  'naira_account_transfer_event.failed',
  {
    cardholder_id: string;
    amount: string;
    currency: string;
    is_successful: boolean;
    transaction_type: string;
    recipient_account_number: string;
    recipient_bank_code: string;
    transaction_reference: string;
    livemode: boolean;
    issuing_app_id: string;
  }
>;

type RewardsEventClaimed = WebhookMessage<
  'rewards_event.claimed',
  {
    coupon_code: string;
    created_on: string;
    description: string;
    downvotes: number;
    is_available: boolean;
    merchant: string;
    reward_id: string;
    reward_type: string;
    success_record: number;
    upvotes: number;
    valid_till: number;
    valid_till_date: string;
    cardholder_id: string;
  }
>;

type BridgecardWebhookEvents =
  | CardholderVerificationSuccessful
  | CardholderVerificationFailed
  | CardCreationEventSuccessful
  | CardCreationEventFailed
  | CardCreditEventSuccessful
  | CardCreditEventFailed
  | CardUnloadEventSuccessful
  | CardUnloadEventFailed
  | CardDebitEventSuccessful
  | CardDebitEventDeclined
  | CardReversalEventSuccessful
  | CardDeleteEventSuccessful
  | CardDeleteEventNotification
  | NairaCardCreditEventSuccessful
  | NairaCardCreditEventFailed
  | NairaCardUnloadEventSuccessful
  | NairaCardUnloadEventFailed
  | NairaCardDebitEventSuccessful
  | NairaCardDebitEventDeclined
  | CardMaintenanceFeeDebitEventSuccessful
  | CardBlockedDueToInsufficientFundsActivated
  | CardFreezedDueTo_30DaysInactivityEventSuccessful
  | CardFlaggedDueToSuspiscionOfFraudActivated
  | NairaAccountCreditEventSuccessful
  | NairaAccountTransferEventSuccessful
  | NairaAccountTransferEventFailed
  | RewardsEventClaimed;
