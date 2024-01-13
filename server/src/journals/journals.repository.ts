import { Injectable } from '@nestjs/common';
import { Journal, JournalWithoutId } from './types';
import * as fs from 'fs/promises';
import * as crypto from 'crypto';
import { getJournalsJsonPath } from 'data/journals';

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
    return allJournals.find((x) => x.generalInformation.sportsmen.some((s) => s.id == sportsmanId)).scheduleTable;
  }
}
