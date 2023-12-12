import axios from "axios";

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
};
