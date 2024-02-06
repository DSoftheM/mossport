import axios from "axios";
import { Journal, ScheduleTable } from "../../components/main-page/journals/types";
import { Role, SportSchool } from "../../components/auth/register-page";

const base = "http://localhost:3000/";
axios.defaults.baseURL = base;

declare namespace User {
    // Todo: private
    type Base = {
        surname: string;
        name: string;
        patronymic: string;
        tel: string;
        email: string;
        roles: Role[];
        coachId: string;
        sportSchool?: SportSchool;
    };

    type Register = Base & {
        password: string;
    };

    type View = Base & {
        userId: number;
        roles: string;
        achievements: {
            cups: number;
            medals: number;
            camps: number;
            competitions: number;
        };
    };

    type Sportsman = Base & {
        userId: number;
        roles: string;
    };
}

export type News = {
    title: string;
    text: string;
    imageUrl: string;
};

export const apiProvider = {
    auth: {
        async login(email: string, password: string) {
            return (await axios.post<{ access_token: string }>("auth/login", { email, password })).data;
        },
        async getProfile() {
            return (await axios.get<User.View>("auth/profile")).data;
        },
        async getCoachById(id: string) {
            return (await axios.get<User.View>("auth/getCoachById", { params: { id } })).data;
        },

        async register(data: User.Register) {
            return (await axios.post<void>("auth/register", data)).data;
        },
        async changePassword(newPassword: string) {
            return (await axios.post<void>("auth/change-password", { newPassword })).data;
        },
    },
    news: {
        // Todo: skip, count
        async getNews() {
            return (await axios.get<News[]>("news")).data;
        },
    },
    journals: {
        async getAll() {
            return (await axios.get<Journal[]>("journals")).data;
        },
        async create(journal: Journal) {
            return (await axios.post<void>("journals/create", journal)).data;
        },
        async edit(journal: Journal) {
            return (await axios.post<void>("journals/edit", journal)).data;
        },
        async allSportsmen() {
            return (await axios.get<User.View[]>("auth/allSportsmen")).data;
        },
        async getScheduleTable() {
            return (await axios.get<ScheduleTable>("journals/getScheduleTable")).data;
        },
        async getSportsmanAttendanceByMonth(month: number) {
            return (await axios.get<any>("journals/getSportsmanAttendanceByMonth", { params: { month } })).data;
        },
    },
    registration: {
        async allCoaches() {
            return (await axios.get<User.View[]>("auth/allCoaches")).data;
        },
    },
    sportsmen: {
        async planPass(date: Date) {
            return (await axios.post<any>("sportsmen/plan-pass", { date })).data;
        },
    },
};
