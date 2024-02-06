import { ArgumentMetadata, Body, Controller, PipeTransform, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { ParseDatePipe } from 'src/global/pipes/parse-data-pipe';
import { JournalsService } from 'src/journals/journals.service';

@Controller('/sportsmen')
export class SportsmenController {
  constructor(private journalsService: JournalsService) {}

  @Post('/plan-pass')
  planPass(@Body('date', ParseDatePipe) date: Date, @Req() req: Request) {
    const id = (req.user as any)?.userId?.toString();
    if (!id) throw new Error('err2');
    return this.journalsService.planPass(id, date);
  }
}
