import { Injectable } from '@nestjs/common';
import { Journal, JournalWithoutId } from './types';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';
import { getJournalsJsonPath } from 'data/journals';
import { Month } from 'src/month';

@Injectable()
export class JournalsRepository {
  async getAllJournals(): Promise<Journal[]> {
    return JSON.parse(await fs.readFile(getJournalsJsonPath(), { encoding: 'utf-8' })).journals as Journal[];
  }

  async create(journal: JournalWithoutId): Promise<void> {
    const allJournals = await this.getAllJournals();
    const withId: Journal = { ...journal, id: crypto.randomUUID() };
    allJournals.push(withId);
    await fs.writeFile(getJournalsJsonPath(), JSON.stringify({ journals: allJournals }));
  }

  async edit(journal: Journal): Promise<void> {
    const allJournals = await this.getAllJournals();
    const index = allJournals.findIndex((j) => j.id === journal.id);
    if (index !== -1) {
      allJournals.splice(index, 1, journal);
      await fs.writeFile(getJournalsJsonPath(), JSON.stringify({ journals: allJournals }));
    }
  }

  async getScheduleTable(sportsmanId: string): Promise<any> {
    const allJournals = await this.getAllJournals();
    // @ts-ignore
    return allJournals.find(
      (x) =>
        x.generalInformation.sportsmen.some((s) => {
          return s.id == sportsmanId;
        }),
      // @ts-ignore
    )?.scheduleTable;
  }

  async getSportsmanAttendanceByMonth(sportsmanId: string, month: number): Promise<any> {
    const allJournals = await this.getAllJournals();
    const monthWord = getMonthByIndex(month);
    return allJournals.find((x) => {
      return Boolean(
        x.attendance.tracking[monthWord]?.find((x) => {
          return x.sportsman.id == sportsmanId;
        }),
      );
    })?.attendance;
  }
}

export function getMonthByIndex(index: number): Month {
  if (index === 0) return Month.January;
  if (index === 1) return Month.February;
  if (index === 2) return Month.March;
  if (index === 3) return Month.April;
  if (index === 4) return Month.May;
  if (index === 5) return Month.June;
  if (index === 6) return Month.July;
  if (index === 7) return Month.August;
  if (index === 8) return Month.September;
  if (index === 9) return Month.October;
  if (index === 10) return Month.November;
  return Month.December;
}
