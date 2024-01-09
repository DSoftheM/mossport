export type Journal = {
    name: string;
    scheduleTable: ScheduleTable;
    department: string;
    sportsTrainingStage: string;
    startDate: Date;
    generalInformation: {
        sportsmen: Sportsman[];
    };
    results: {
        sportsmanResults: Result[];
    };
    plans: {
        sportsmanPlan: Plan[];
    };
    attendance: AttendanceTracking;
    // Todo: endDate
    // endDate?: Date;
};

export type Plan = {
    id: string;
    content: string;
    hoursCount: number;
    hoursDistribution: Record<Month, number>;
};

export type CreationPlan = {
    id: string;
    content: string;
    hoursCount: number | undefined;
    hoursDistribution: Record<Month, number | undefined>;
};

export type Result = {
    sportsman: Sportsman;
    plan: string;
    accomplishment: string;
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

type TimeRange = {
    start: string;
    end: string;
};

export type ScheduleTable = {
    january: TimeRange[][];
    february: TimeRange[][];
    march: TimeRange[][];
    april: TimeRange[][];
    may: TimeRange[][];
    june: TimeRange[][];
    july: TimeRange[][];
    august: TimeRange[][];
    september: TimeRange[][];
    october: TimeRange[][];
    november: TimeRange[][];
    december: TimeRange[][];
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
