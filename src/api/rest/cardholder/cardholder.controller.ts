import { Request } from 'express';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CardholderService } from './cardholder.service';
import { AuthGuard } from '@lib/rest/auth.guard';
import { RegisterCardholderDto } from '@lib/common/dtos/cardholder/register-cardholder.dto';

@ApiTags('Cardholder')
@UseGuards(AuthGuard)
@ApiSecurity('jwt')
@Controller('cardholder')
export class CardholderController {
  constructor(private readonly cardholderService: CardholderService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: RegisterCardholderDto) {
    return this.cardholderService.create(req.user, dto);
  }

  @Get()
  findOne(@Req() req: Request) {
    return this.cardholderService.findOne(req.user);
  }
}
