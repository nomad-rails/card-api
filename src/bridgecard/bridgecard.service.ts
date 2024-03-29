import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { RegisterCardholderDto } from '@lib/common/dtos/cardholder/register-cardholder.dto';

@Injectable()
export class BridgecardService {
  private readonly nodeEnv: string = this.cfg.get('NODE_ENV');

  constructor(private readonly cfg: ConfigService<Config>) {}

  get http(): AxiosInstance {
    const DOMAIN = `https://issuecards.api.bridgecard-issuing-app.com`;
    const BRIDGECARD_BASE_URL = {
      development: `${DOMAIN}/v1/issuing/sandbox`,
      production: `${DOMAIN}/v1/issuing`,
    };
    const baseURL: string = BRIDGECARD_BASE_URL[this.nodeEnv];
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${this.cfg.get('BRIDGECARD_AT')}`,
      },
    });
  }

  get http2(): AxiosInstance {
    const DOMAIN = `https://issuecards-api-bridgecard-issuing-app-com-app-ee6bd7a3c80e.relay.evervault.com`;
    const BRIDGECARD_BASE_URL = {
      development: `${DOMAIN}/v1/issuing/sandbox`,
      production: `${DOMAIN}/v1/issuing`,
    };
    const baseURL: string = BRIDGECARD_BASE_URL[this.nodeEnv];
    return axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        token: `Bearer ${this.cfg.get('BRIDGECARD_AT')}`,
      },
    });
  }

  async registerCardHolder(dto: RegisterCardholderDto) {
    return this.http.post<RegisterCardHolderResponse>(
      '/cardholder/register_cardholder',
      dto,
    );
  }

  async getCardHolder(cardHolderId: string) {
    return this.http.get<GetCardHolderResponse>(
      `/cardholder/get_cardholder?cardholder_id=${cardHolderId}`,
    );
  }

  async deleteCardHolder(cardHolderId: string) {
    return this.http.delete<DeleteCardHolderResponse>(
      `/cardholder/delete_cardholder${cardHolderId}`,
    );
  }

  async createCard(dto: CreateCardDto) {
    return this.http.post<CreateCardResponse>('/cards/create_card', dto);
  }

  async getCardDetails(cardId: string, encrypted = true) {
    const http = encrypted ? this.http : this.http2;
    return http.get<GetCardDetailsResponse>(
      `/cards/get_card_details?card_id=${cardId}`,
    );
  }

  async getCardBalance(cardHolderId: string) {
    return this.http.get<GetCardBalanceResponse>(
      `/cards/get_card_balance?cardholder_id=${cardHolderId}`,
    );
  }

  async getTransactionOtp(cardId: string, amount: number) {
    return this.http2.post<GetTransactionOTPResponse>(
      `/naira_cards/get_otp_message?card_id=${cardId}&amount=${amount}`,
    );
  }

  async fundNairaCard(dto: NairaFundingDto) {
    return this.http.post<FundNairaCardResponse>(
      '/naira_cards/fund_naira_card',
      dto,
    );
  }

  async unloadNairaCard(dto: NairaFundingDto) {
    return this.http.post<UnloadNairaCardResponse>(
      '/naira_cards/unload_naira_card',
      dto,
    );
  }

  async freezeCard(cardId: string) {
    return this.http.patch<FreezeCardResponse>(
      `/naira_cards/freeze_card?card_id=${cardId}`,
    );
  }

  async unfreezeCard(cardId: string) {
    return this.http.patch<UnfreezeCardResponse>(
      `/naira_cards/unfreeze_card?card_id=${cardId}`,
    );
  }

  async getCardTransactions(
    cardId: string,
    page: number,
    start_date?: string,
    end_date?: string,
  ) {
    const searchParams = new URLSearchParams();
    searchParams.append('card_id', cardId);
    searchParams.append('page', page.toString());
    if (start_date) searchParams.append('start_date', start_date);
    if (end_date) searchParams.append('end_date', end_date);
    return this.http.get<GetCardTransactionsResponse>(
      `/cards/get_naira_card_transactions?${searchParams.toString()}`,
    );
  }
}
