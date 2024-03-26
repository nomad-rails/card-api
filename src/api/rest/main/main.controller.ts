import { Controller, Get } from '@nestjs/common';
import { MainService } from './main.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class MainController {
  constructor(private readonly mainService: MainService) {}

  @Get()
  ping(): string {
    return this.mainService.ping();
  }
}
