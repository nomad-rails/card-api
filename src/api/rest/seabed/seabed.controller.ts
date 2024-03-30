import { Request } from 'express';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SeabedService } from './seabed.service';
import { AuthGuard } from '@lib/rest/auth.guard';
import { PreAuthorizedDebitDto } from '@lib/common/dtos/seabed/pre-authorized-debit.dto';

@ApiTags('Seabed Labs')
@UseGuards(AuthGuard)
@ApiSecurity('jwt')
@Controller('seabed')
export class SeabedController {
  constructor(private readonly seabedService: SeabedService) {}

  @Post('init-pre-authorized-debit')
  initPreAuthorizedDebit(@Req() req: Request) {
    return this.seabedService.initPreAuthorizedDebit(req.user);
  }

  @Post('debit')
  debit(@Req() req: Request, @Body() dto: PreAuthorizedDebitDto) {
    return this.seabedService.debit(req.user, dto);
  }
}
