import * as bcrypt from 'bcrypt';
import AES256 from 'aes-everywhere';
import { promisify } from 'node:util';
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  scrypt,
} from 'node:crypto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly key: string;
  private readonly algorithm = 'aes-256-cbc';

  constructor(private readonly cfg: ConfigService<Config>) {
    this.key = this.cfg.getOrThrow('CRYPTO_KEY');
  }

  get password() {
    return {
      async hash(password: string) {
        if (!password) {
          throw new InternalServerErrorException('Password is required');
        }
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(password, salt);
      },
      async verify(password: string, hash: string) {
        if (!password) {
          throw new InternalServerErrorException('Password is required');
        }
        return await bcrypt.compare(password, hash);
      },
    };
  }

  get aes256() {
    return {
      encrypt: (data: string, password?: string): string => {
        if (!data) {
          throw new InternalServerErrorException('Data is required');
        }
        return AES256.encrypt(data, password ?? this.key);
      },
      decrypt: (data: string, password?: string): string => {
        if (!data) {
          throw new InternalServerErrorException('Data is required');
        }
        return AES256.decrypt(data, password ?? this.key);
      },
    };
  }

  hashString(data: string) {
    const hash = createHash('sha256');
    return hash.update(data).digest('hex');
  }

  async encrypt(data: string, password?: string) {
    try {
      const iv = randomBytes(16);
      const key = (await promisify(scrypt)(
        `${this.key}${password ?? ''}`,
        'salt',
        32,
      )) as Buffer;
      const cipher = createCipheriv(this.algorithm, key, iv);
      const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
      return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    } catch (error) {
      throw new InternalServerErrorException('Encryption failed');
    }
  }

  async decrypt(data: string, password?: string) {
    try {
      const [iv, encrypted] = data.split(':');
      const key = (await promisify(scrypt)(
        `${this.key}${password ?? ''}`,
        'salt',
        32,
      )) as Buffer;
      const decipher = createDecipheriv(
        this.algorithm,
        key,
        Buffer.from(iv, 'hex'),
      );
      const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypted, 'hex')),
        decipher.final(),
      ]);
      return decrypted.toString();
    } catch (error) {
      throw new InternalServerErrorException('Decryption failed');
    }
  }
}
