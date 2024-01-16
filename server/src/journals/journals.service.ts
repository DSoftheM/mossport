import { Injectable } from '@nestjs/common';
import { JournalsRepository } from './journals.repository';
import { Journal, JournalWithoutId } from './types';

@Injectable()
export class JournalsService {
  constructor(private journalsRepository: JournalsRepository) {}

  getAllJournals() {
    return this.journalsRepository.getAllJournals();
  }

  createJournal(journal: JournalWithoutId) {
    return this.journalsRepository.create(journal);
  }

  editJournal(journal: Journal) {
    return this.journalsRepository.edit(journal);
  }

  getScheduleTable(sportsmanId: string) {
    return this.journalsRepository.getScheduleTable(sportsmanId);
  }

  getSportsmanAttendanceByMonth(sportsmanId: string, month: number) {
    return this.journalsRepository.getSportsmanAttendanceByMonth(sportsmanId, month);
  }
}
