import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggerRepository {
  // Todo: установить лимит по количеству лог файлов
  async writeLog(exception: HttpException) {
    const logFileName = new Date().toISOString();
    const logFilePath = `./src/global/exception-filters/logs/${logFileName}.json`.replaceAll(':', '-');
    console.log('exception :>> ', exception);
    // fs.writeFile(logFilePath, JSON.stringify(exception));
  }

  async log(exception: HttpException) {
    console.log(exception);
  }
}
