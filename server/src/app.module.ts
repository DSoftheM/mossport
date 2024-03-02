import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { LoggerExceptionFilter } from './global/exception-filters/logger.exception-filter';
import { LoggerRepository } from './global/exception-filters/logger.service';
import { JournalsModule } from './journals/journals.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';
import { Employee } from './db/entities/employee.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    NewsModule,
    JournalsModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'my',
    //   entities: [Employee],
    //   logging: true,
    // }),
    // DbModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useFactory: () => new LoggerExceptionFilter(new LoggerRepository()),
    // },
  ],
})
export class AppModule {}
