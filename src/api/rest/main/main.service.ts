import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  ping(): string {
    return 'pong';
  }
}
