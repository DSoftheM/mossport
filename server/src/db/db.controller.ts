import { Body, Controller, Post, RawBodyRequest } from '@nestjs/common';
import { DbService } from './db.service';

@Controller('db')
export class DbController {
  constructor(private DBService: DbService) {}

  @Post()
  root(@Body('query') query: string) {
    return this.DBService.executeQuery(query);
  }
}
