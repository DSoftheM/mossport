import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerRepository } from './logger.service';

export class LoggerExceptionFilter implements ExceptionFilter {
  constructor(private loggerRepository: LoggerRepository) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getResponse<Request>();
    const res = context.getResponse<Response>();

    this.loggerRepository.writeLog(exception);
    this.loggerRepository.log(exception);

    res.status(exception.getStatus()).json(exception.getResponse());
  }
}
