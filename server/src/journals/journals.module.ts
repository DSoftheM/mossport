import { Module } from '@nestjs/common';
import { JournalsController } from './journals.controller';
import { JournalsService } from './journals.service';
import { JournalsRepository } from './journals.repository';

@Module({
  controllers: [JournalsController],
  providers: [JournalsService, JournalsRepository],
})
export class JournalsModule {}
