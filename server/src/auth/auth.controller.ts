import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local.strategy';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  register(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    this.authService.registerUser(username, password);
  }
}
