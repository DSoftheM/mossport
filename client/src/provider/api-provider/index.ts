import axios from "axios";
import { Journal } from "../../components/main-page/journals/types";
import { Role } from "../../components/auth/register-page";

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
        role: Role[];
    };

    type Register = Base & {
        password: string;
    };

    type View = Base & {
        userId: number;
        // Todo: Role enum
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
        async register(data: User.Register) {
            return (await axios.post<void>("auth/register", data)).data;
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
    },
};
