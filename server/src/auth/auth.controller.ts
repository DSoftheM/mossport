import { BadRequestException, Body, Controller, Get, Post, Query, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { User, UsersService, isUser } from 'src/users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

function SetPublic() {
  return SetMetadata('isPublic', true);
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

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
    console.log('123 :>> ', 123);
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

  @SetPublic()
  @Get('allCoaches')
  getAllCouches() {
    return this.usersService.getAllCouches();
  }

  @SetPublic()
  @Get('allSportsmen')
  allSportsmen() {
    return this.usersService.getAllSportsmen();
  }

  @Get('getCoachById')
  getCoachInformation(@Query('id') id: string) {
    return this.usersService.getCoachById(id);
  }

  @Get('getSportsmanAttendanceByMonth')
  getSportsmanAttendanceByMonth(@Query('month') month: string) {
    return this.usersService.getCoachById(month);
  }
}
