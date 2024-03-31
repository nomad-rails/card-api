import { Request } from 'express';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from '@lib/rest/auth.guard';
import { UserEntity } from '@lib/common/entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiSecurity('jwt')
  @ApiOkResponse({ type: UserEntity })
  whoami(@Req() req: Request) {
    return new UserEntity(req.user);
  }
}
