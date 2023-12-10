import axios from "axios";

const base = "http://localhost:3000/";
axios.defaults.baseURL = base;

export const apiProvider = {
    auth: {
        login(email: string, password: string) {
            return axios.post("auth/login", { email, password });
        },
        getProfile() {
            return axios.get("auth/profile");
        },
        register(data: { surname: string; name: string; patronymic: string; tel: string; email: string; password: string }) {
            return axios.post("auth/register", data);
        },
    },
};
