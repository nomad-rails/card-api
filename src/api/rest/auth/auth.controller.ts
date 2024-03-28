import { Request } from 'express';
import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { VerifySIWSDto } from '@lib/common/dtos/main/verify-siws.dto';
import { AuthGuard } from '@lib/rest/auth.guard';
import { UserEntity } from '@lib/common/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('siws')
  @ApiOkResponse({
    description: 'Returns a JWT token.',
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  })
  verifySIWS(@Body() dto: VerifySIWSDto) {
    return this.authService.verifySIWS(dto);
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiSecurity('jwt')
  @ApiOkResponse({ type: UserEntity })
  whoami(@Req() req: Request) {
    return new UserEntity(req.user);
  }
}
