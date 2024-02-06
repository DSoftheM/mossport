import { Month } from '@shared/types';

export type Journal = {
  id: string;
  name: string;
  department: string;
  sportsTrainingStage: string;
  startDate: Date;
  generalInformation: {
    sportsmen: Sportsman[];
  };
  attendance: {
    tracking: Record<Month, { attendance: any[]; sportsman: Sportsman }[]>;
  };
  // Todo: endDate
  // endDate?: Date;
};

export type JournalWithoutId = Omit<Journal, 'id'>;

export enum SportsCategory {
  Un1 = 'Un1',
  Un2 = 'Un2',
  Un3 = 'Un3',
  _3 = '_3',
  _2 = '_2',
  _1 = '_1',
  KMS = 'KMS',
  MS = 'MS',
  MSMK = 'MSMK',
  ZMS = 'ZMS',
  GR = 'GR',
}

export type Sportsman = {
  name: string;
  birthDate: Date;
  sportsCategory: SportsCategory;
  medicalExamination: {
    first: Date;
    second: Date;
  };
  parentsFio: string;
  tel: string;
  id: string;
};
