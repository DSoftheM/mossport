import { Injectable } from '@nestjs/common';
import { Journal } from './types';
import * as fs from 'fs/promises';
import { getJournalsJsonPath } from 'data/journals';

@Injectable()
export class JournalsRepository {
  async getAllJournals(): Promise<Journal[]> {
    return JSON.parse(await fs.readFile(getJournalsJsonPath(), { encoding: 'utf-8' })).journals as Journal[];
  }

  async create(journal: Journal): Promise<void> {
    const allJournals = await this.getAllJournals();
    allJournals.push(journal);
    await fs.writeFile(getJournalsJsonPath(), JSON.stringify({ journals: allJournals }));
  }
}
