export type Journal = {
    name: string;
    scheduleTable: ScheduleTable;
    department: string;
    sportsTrainingStage: string;
    startDate: Date;
    generalInformation: {
        sportsmen: Sportsman[];
    };
    attendance: AttendanceTracking;
    // Todo: endDate
    // endDate?: Date;
};

export type AttendanceTracking = {
    tracking: Record<Month, MonthAttendanceTracking[]>;
};

export type MonthAttendanceTracking = {
    sportsman: Sportsman;
    attendance: AbsenceReason[];
};

export enum AbsenceReason {
    Disease = "disease",
    Lack = "lack",
}

export enum Month {
    January = "january",
    February = "february",
    March = "march",
    April = "april",
    May = "may",
    June = "june",
    July = "july",
    August = "august",
    September = "september",
    October = "october",
    November = "november",
    December = "december",
}

export type ScheduleTable = {
    january: string[];
    february: string[];
    march: string[];
    april: string[];
    may: string[];
    june: string[];
    july: string[];
    august: string[];
    september: string[];
    october: string[];
    november: string[];
    december: string[];
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
