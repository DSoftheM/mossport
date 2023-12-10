import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/local.strategy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
