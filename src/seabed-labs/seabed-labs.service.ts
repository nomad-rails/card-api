import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';
import {
  InstructionFactoryImpl,
  PreAuthorizedDebitReadClientImpl,
  TransactionFactoryImpl,
} from '@seabed-labs/pre-authorized-debit';

@Injectable()
export class SeabedLabsService {
  constructor(private readonly cfg: ConfigService<Config>) {}

  get isProd() {
    return this.cfg.get('NODE_ENV') === 'production';
  }

  get net() {
    return this.isProd ? 'mainnet' : 'devnet';
  }

  get connection() {
    let cluster: Cluster = 'devnet';
    if (this.isProd) cluster = 'mainnet-beta';
    return new Connection(clusterApiUrl(cluster));
  }

  get readClient() {
    return PreAuthorizedDebitReadClientImpl[this.net](this.connection);
  }

  get ixFactory() {
    return InstructionFactoryImpl[this.net](this.connection);
  }

  get txFactory() {
    return TransactionFactoryImpl[this.net](this.connection);
  }
}
