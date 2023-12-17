import { Body, Controller, Get, Post } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { Journal } from './types';

@Controller('/journals')
export class JournalsController {
  constructor(private journalsService: JournalsService) {}

  @Get()
  getAllJournals() {
    return this.journalsService.getAllJournals();
  }

  @Post('/create')
  createJournal(@Body() journal: Journal) {
    return this.journalsService.createJournal(journal);
  }
}
