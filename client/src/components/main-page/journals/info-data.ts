import { SportSchool } from "../../auth/register-page";

type SchoolInfo = {
    name: string;
    branch: string;
    branchAddress: string;
    workingHours: string;
    phone: string;
    cite: string;
    email: string;
};

export function getDefaultSchoolInfo(): SchoolInfo {
    return {
        branch: "Нет информации о филиале",
        branchAddress: "Нет информации об адресе филиала",
        cite: "Нет информации о сайте школы",
        email: "Нет информации об электронной почте школы",
        name: "Нет информации о названии учреждения",
        phone: "Нет информации о номере телефона школы",
        workingHours: "Нет информации о времени работы",
    };
}

type SchoolsInfo = Record<SportSchool, SchoolInfo>;

export const SchoolsInfo: Partial<SchoolsInfo> = {
    [SportSchool.N1]: {
        name: 'Государственное бюджетное общеобразовательное учреждение города Москвы "Школа № 1542"',
        branch: "ШК №5",
        branchAddress:
            "Западный административный округ, муниципальный округ Солнцево, город Москва, улица Авиаторов, дом 8, корпус 2",
        workingHours: "08:00-20:00",
        phone: "(495) 934-87-32",
        cite: "gym1542.mskobr.ru",
        email: "1542@edu.mos.ru",
    },
    [SportSchool.N2]: {
        name: '123 Государственное бюджетное общеобразовательное учреждение города Москвы "Школа № 1542"',
        branch: "ШК №5",
        branchAddress:
            "Западный административный округ, муниципальный округ Солнцево, город Москва, улица Авиаторов, дом 8, корпус 2",
        workingHours: "08:00-19:00",
        phone: "(495) 934-87-32",
        cite: "gym1542.mskobr.ru",
        email: "1542@edu.mos.ru",
    },
};
