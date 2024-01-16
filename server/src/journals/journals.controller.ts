import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { JournalsService } from './journals.service';
import { Journal, JournalWithoutId } from './types';
import { Request } from 'express';

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

  @Get('/getScheduleTable')
  getScheduleTable(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.journalsService.getScheduleTable(req.user.userId);
  }

  @Get('/getSportsmanAttendanceByMonth')
  getSportsmanAttendanceByMonth(@Req() req: Request, @Query('month') month: string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.journalsService.getSportsmanAttendanceByMonth(req.user.userId, +month);
  }
}
