export type Journal = {
    name: string;
    department: string;
    sportsTrainingStage: string;
    startDate: Date;
    generalInformation: {
        sportsmen: Sportsman[];
    };
    // Todo: endDate
    // endDate?: Date;
};

export enum SportsCategory {
    Un1 = "Un1",
    Un2 = "Un2",
    Un3 = "Un3",
    _3 = "_3",
    _2 = "_2",
    _1 = "_1",
    KMS = "KMS",
    MS = "MS",
    MSMK = "MSMK",
    ZMS = "ZMS",
    GR = "GR",
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
};
