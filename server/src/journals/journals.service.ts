import { Injectable } from '@nestjs/common';
import { JournalsRepository, getMonthByIndex } from './journals.repository';
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

  private async getJournalBySportsmanId(id: string) {
    const allJournals = await this.getAllJournals();
    const journal = allJournals.find((j) => {
      const sportsmenIds = j.generalInformation.sportsmen.map((s) => s.id);
      return sportsmenIds.includes(id);
    });
    return journal ?? null;
  }

  async planPass(sportsmanId: string, date: Date) {
    const journal = await this.getJournalBySportsmanId(sportsmanId);
    if (!journal) return;
    const month = getMonthByIndex(date.getMonth());
    const updatedAttendance = journal.attendance.tracking[month].find(
      (x) => x.sportsman.id === sportsmanId,
    )?.attendance;
    if (updatedAttendance) {
      updatedAttendance.splice(date.getDate() - 1, 1, 'PlanPass');
      const index = journal.attendance.tracking[month].findIndex((x) => x.sportsman.id === sportsmanId);
      journal.attendance.tracking[month][index].attendance = updatedAttendance;
      this.editJournal(journal);
    }
  }
}

const user = {
  names: ['Alex', 'John'],
};

user.names[1];
