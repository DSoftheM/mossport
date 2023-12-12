import { useState } from "react";
import * as S from "./register-page.styled";
import { apiProvider } from "../../provider/api-provider";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";

export function LoginPage(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const query = useQuery({
        queryKey: "auth",
        queryFn: () => apiProvider.auth.login(email, password),
        enabled: false,

        onSuccess: (data) => {
            axios.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${data.access_token}`;
                return config;
            });
            document.cookie = `access_token=Bearer ${data.access_token}`;
            return navigate(Nav.profile());
        },
    });

    return (
        <S.Root style={{ justifyContent: "center" }}>
            <S.Body>
                <S.Side>
                    <S.Title>Вход</S.Title>
                    <S.Column>
                        <S.InputTitle>Email</S.InputTitle>
                        <S.Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        <S.InputTitle>Пароль</S.InputTitle>
                        <S.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    </S.Column>
                    <S.Button disabled={!email || !password} onClick={() => query.refetch({})}>
                        Войти
                    </S.Button>
                    <S.Link onClick={() => navigate(Nav.register())}>Регистрация</S.Link>
                    {query.isError && <S.Error>Неправильное имя или пароль</S.Error>}
                </S.Side>
            </S.Body>
        </S.Root>
    );
}
