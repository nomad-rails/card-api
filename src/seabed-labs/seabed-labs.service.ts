import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import {
  InstructionFactoryImpl,
  PreAuthorizedDebitReadClientImpl,
  TransactionFactoryImpl,
} from '@seabed-labs/pre-authorized-debit';

@Injectable()
export class SeabedLabsService {
  constructor(private readonly cfg: ConfigService<Config>) {}

  get connection() {
    return new Connection(this.cfg.getOrThrow('RPC_URL'), {
      commitment: 'confirmed',
    });
  }

  get programId() {
    return new PublicKey(this.cfg.getOrThrow('SEABED_PROGRAM_ID'));
  }

  get debit() {
    return {
      authority: Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(this.cfg.getOrThrow('DEBIT_AUTHORITY'))),
      ),
      destination: new PublicKey(this.cfg.getOrThrow('DEBIT_DESTINATION')),
    };
  }

  get readClient() {
    return PreAuthorizedDebitReadClientImpl.custom(
      this.connection,
      this.programId,
    );
  }

  get ixFactory() {
    return InstructionFactoryImpl.custom(this.connection, this.programId);
  }

  get txFactory() {
    return TransactionFactoryImpl.custom(this.connection, this.programId);
  }
}
