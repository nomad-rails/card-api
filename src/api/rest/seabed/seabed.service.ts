import { Message, PublicKey, VersionedTransaction } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SeabedLabsService } from '@/seabed-labs/seabed-labs.service';
import { UserEntity } from '@lib/common/entities/user.entity';
import { PreAuthorizedDebitDto } from '@lib/common/dtos/seabed/pre-authorized-debit.dto';

@Injectable()
export class SeabedService {
  constructor(
    private readonly cfg: ConfigService<Config>,
    private readonly seabed: SeabedLabsService,
  ) {}

  private handleError(error: Error) {
    error.message = error.message.replace(
      this.cfg.getOrThrow('RPC_URL'),
      '**REDACTED**',
    );
    throw new HttpException(error.message, 500);
  }

  async initPreAuthorizedDebit(user: UserEntity) {
    try {
      const payer = new PublicKey(user.address);
      const debitAuthority = this.seabed.debit.authority;
      const usdcMint = new PublicKey(this.cfg.getOrThrow('USDC_MINT'));
      const tokenAccount = getAssociatedTokenAddressSync(usdcMint, payer);
      return await this.seabed.ixFactory.buildInitRecurringPreAuthorizationIx({
        payer,
        tokenAccount,
        debitAuthority: debitAuthority.publicKey,
        activation: new Date(),
        repeatFrequencySeconds: 86_400n,
        recurringAmountAuthorized: 100n,
        numCycles: 0n,
        resetEveryCycle: true,
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  async debit(user: UserEntity, dto: PreAuthorizedDebitDto) {
    try {
      const payer = new PublicKey(user.address);
      const debitAuthority = this.seabed.debit.authority;
      const usdcMint = new PublicKey(this.cfg.getOrThrow('USDC_MINT'));
      const tokenAccount = getAssociatedTokenAddressSync(usdcMint, payer);
      const destinationTokenAccount = getAssociatedTokenAddressSync(
        usdcMint,
        this.seabed.debit.destination,
      );

      const preAuthPDA = this.seabed.readClient.derivePreAuthorizationPDA(
        tokenAccount,
        debitAuthority.publicKey,
      );
      const { publicKey: preAuthorization } = preAuthPDA;

      const ix = await this.seabed.ixFactory.buildDebitIx({
        preAuthorization,
        amount: BigInt(dto.amount),
        destinationTokenAccount,
        checkSmartDelegateEnabled: false,
      });
      const latestBlockhash = await this.seabed.connection.getLatestBlockhash();
      const message = Message.compile({
        payerKey: debitAuthority.publicKey,
        instructions: [ix.instruction],
        recentBlockhash: latestBlockhash.blockhash,
      });
      const tx = new VersionedTransaction(message);

      tx.sign([debitAuthority]);
      const signature = await this.seabed.connection.sendTransaction(tx);
      await this.seabed.connection.confirmTransaction(signature, 'confirmed');
      return { signature };
    } catch (error) {
      this.handleError(error);
    }
  }
}
