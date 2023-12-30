import { BadRequestException, Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User, isUser } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

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
    if (req.user && isUser(req.user)) {
      return this.authService.login(req.user);
    }
    throw new BadRequestException('Неправильное имя или пароль');
  }

  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post('change-password')
  changePassword(@Req() req: Request, @Body('newPassword') newPassword: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = req.user.userId;
    return this.authService.changePassword(userId, newPassword);
  }

  @Post('register')
  @SetPublic()
  register(@Body() user: User) {
    this.authService.registerUser(user);
  }

  @SetPublic()
  @Get()
  test() {
    return Math.random();
  }
}
