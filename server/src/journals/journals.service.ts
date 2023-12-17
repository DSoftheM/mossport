import { Injectable } from '@nestjs/common';
import { JournalsRepository } from './journals.repository';
import { Journal } from './types';

@Injectable()
export class JournalsService {
  constructor(private journalsRepository: JournalsRepository) {}

  getAllJournals() {
    return this.journalsRepository.getAllJournals();
  }

  createJournal(journal: Journal) {
    return this.journalsRepository.create(journal);
  }
}
