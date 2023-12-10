import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './local.strategy';
import { AuthService } from './auth.service';
import * as path from 'path';
import { JwtAuthGuard } from './jwt.strategy';
import { User } from 'src/users/users.service';

function SetPublic() {
  return SetMetadata('isPublic', true);
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @SetPublic()
  login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @SetPublic()
  register(@Body() user: User) {
    this.authService.registerUser(user);
  }
}
