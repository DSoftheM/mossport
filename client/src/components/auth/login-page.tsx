import { useState } from "react";
import * as S from "./register-page.styled";
import { apiProvider } from "../../provider/api-provider";
import { useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";
import { Alert, Box, Button, Link, Paper, Stack, TextField, Typography } from "@mui/material";

export function LoginPage(): JSX.Element {
    const [email, setEmail] = useState("t1");
    const [password, setPassword] = useState("123");
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
            return navigate(Nav.main());
        },
    });

    return (
        <S.Root style={{ justifyContent: "center" }}>
            <Paper variant="outlined">
                <Box p={8}>
                    <S.Side>
                        <Typography variant="h4">Вход</Typography>
                        <Stack gap={2} mt={4}>
                            <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            <TextField
                                label="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </Stack>
                        <Box mt={3} mb={1} alignSelf="stretch">
                            <Button disabled={!email || !password} onClick={() => query.refetch({})} variant="outlined" fullWidth>
                                Войти
                            </Button>
                        </Box>
                        <Link component="button" onClick={() => navigate(Nav.register())}>
                            Регистрация
                        </Link>
                        {query.isError && <Alert severity="error">Неправильное имя или пароль</Alert>}
                    </S.Side>
                </Box>
            </Paper>
        </S.Root>
    );
}
