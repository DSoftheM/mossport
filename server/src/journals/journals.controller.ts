import { Body, Controller, Get, Post } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { Journal, JournalWithoutId } from './types';

@Controller('/journals')
export class JournalsController {
  constructor(private journalsService: JournalsService) {}

  @Get()
  getAllJournals() {
    return this.journalsService.getAllJournals();
  }

  @Post('/create')
  createJournal(@Body() journal: JournalWithoutId) {
    return this.journalsService.createJournal(journal);
  }

  @Post('/edit')
  editJournal(@Body() journal: Journal) {
    return this.journalsService.editJournal(journal);
  }
}
