import { HttpException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggerRepository {
  // Todo: установить лимит по количеству лог файлов
  async writeLog(exception: HttpException) {
    const logFileName = new Date().toISOString();
    const logFilePath = `./src/global/exception-filters/logs/${logFileName}.json`.replaceAll(':', '-');
    fs.writeFile(logFilePath, JSON.stringify(exception));
  }

  async log(exception: HttpException) {
    console.log(`\u001b[1;41m  ${exception.name} \u001b[1;41m  ${exception.message}   `);
  }
}
