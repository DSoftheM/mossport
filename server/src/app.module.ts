import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { LoggerExceptionFilter } from './global/exception-filters/logger.exception-filter';
import { LoggerRepository } from './global/exception-filters/logger.service';

@Module({
  imports: [UsersModule, AuthModule, NewsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useFactory: () => new LoggerExceptionFilter(new LoggerRepository()),
    },
  ],
})
export class AppModule {}
