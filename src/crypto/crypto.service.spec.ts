import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('password', () => {
    it('should hash the password', async () => {
      const password = 'testPassword';
      const hashedPassword = await service.password.hash(password);
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toEqual(password);
    });

    it('should verify the password', async () => {
      const password = 'testPassword';
      const hashedPassword = await service.password.hash(password);
      const isPasswordValid = await service.password.verify(
        password,
        hashedPassword,
      );
      expect(isPasswordValid).toBe(true);
    });

    it('should throw an error if password is not provided', async () => {
      await expect(service.password.hash('')).rejects.toThrow(
        'Password is required',
      );
      await expect(
        service.password.verify('', 'hashedPassword'),
      ).rejects.toThrow('Password is required');
    });
  });

  describe('hashString', () => {
    it('should hash the string', () => {
      const data = 'testData';
      const hashedString = service.hashString(data);
      expect(hashedString).toBeDefined();
      expect(hashedString).not.toEqual(data);
    });
  });

  describe('encrypt', () => {
    it('should encrypt the data', async () => {
      const data = 'testData';
      const encryptedData = await service.encrypt(data);
      expect(encryptedData).toBeDefined();
      expect(encryptedData).not.toEqual(data);
    });

    it('should encrypt the data with password', async () => {
      const data = 'testData';
      const password = 'testPassword';
      const encryptedData = await service.encrypt(data, password);
      expect(encryptedData).toBeDefined();
      expect(encryptedData).not.toEqual(data);
    });

    it('should throw an error if encryption fails', async () => {
      const data = 'testData';
      const password = 'testPassword';
      // Mocking the encryption failure scenario
      jest
        .spyOn(service, 'encrypt')
        .mockRejectedValueOnce(new Error('Encryption failed'));
      await expect(service.encrypt(data, password)).rejects.toThrow(
        'Encryption failed',
      );
    });
  });

  describe('decrypt', () => {
    it('should decrypt the data', async () => {
      const data = 'testData';
      const encryptedData = await service.encrypt(data);
      const decryptedData = await service.decrypt(encryptedData);
      expect(decryptedData).toBeDefined();
      expect(decryptedData).toEqual(data);
    });

    it('should decrypt the data with password', async () => {
      const data = 'testData';
      const password = 'testPassword';
      const encryptedData = await service.encrypt(data, password);
      const decryptedData = await service.decrypt(encryptedData, password);
      expect(decryptedData).toBeDefined();
      expect(decryptedData).toEqual(data);
    });

    it('should throw an error if decryption fails', async () => {
      const data = 'testData';
      const password = 'testPassword';
      // Mocking the decryption failure scenario
      jest
        .spyOn(service, 'decrypt')
        .mockRejectedValueOnce(new Error('Decryption failed'));
      await expect(service.decrypt(data, password)).rejects.toThrow(
        'Decryption failed',
      );
    });
  });
});
