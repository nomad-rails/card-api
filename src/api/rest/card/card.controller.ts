import { Request } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CardService } from './card.service';
import { AuthGuard } from '@lib/rest/auth.guard';
import { CreateCardDto } from '@lib/common/dtos/card/create-card.dto';
import { NairaFundingDto } from '@lib/common/dtos/card/naira-funding.dto';

@ApiTags('Card')
@UseGuards(AuthGuard)
@ApiSecurity('jwt')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Req() req: Request, @Body() dto: CreateCardDto) {
    return this.cardService.create(req.user, dto);
  }

  @Get()
  @ApiQuery({
    name: 'key',
    description: 'Unencrypted card details',
    example: 'true',
    required: false,
  })
  details(@Req() req: Request, @Query('key') key: string) {
    return this.cardService.details(req.user, key === 'true');
  }

  @Get('/balance')
  balance(@Req() req: Request) {
    return this.cardService.balance(req.user);
  }

  @Get('/txs')
  @ApiQuery({
    name: 'page',
    description: `Transactions from this endpoint are paginated and each page contains at least 20 transactions (compulsory)`,
    example: '10',
    required: true,
  })
  @ApiQuery({
    name: 'start_date',
    description: `Allows you to limit the transaction to a particular start date (optional but you must always send it with an end_date query param)`,
    example: '2023-03-01 12:10:00',
    required: false,
  })
  @ApiQuery({
    name: 'end_date',
    description: `Allows you to limit the transaction to a particular end date (optional but you must always send it with a start_date query param)`,
    example: '2023-03-01 12:10:00',
    required: false,
  })
  txs(
    @Req() req: Request,
    @Query('page') page: string,
    @Query('start_date') start_date: string,
    @Query('end_date') end_date: string,
  ) {
    return this.cardService.txs(req.user, +page, start_date, end_date);
  }

  @Get('/tx-otp')
  @ApiQuery({
    name: 'amount',
    description: 'Amount to fund',
    example: '100',
    required: true,
  })
  txOtp(@Req() req: Request, @Query('amount') amount: string) {
    return this.cardService.txOtp(req.user, +amount);
  }

  @Post('/fund')
  fund(@Req() req: Request, @Body() dto: NairaFundingDto) {
    return this.cardService.fund(req.user, dto);
  }

  @Post('/unload')
  unload(@Req() req: Request, @Body() dto: NairaFundingDto) {
    return this.cardService.unload(req.user, dto);
  }

  @Patch('/freeze')
  freeze(@Req() req: Request) {
    return this.cardService.freeze(req.user);
  }

  @Patch('/unfreeze')
  unfreeze(@Req() req: Request) {
    return this.cardService.unfreeze(req.user);
  }
}
