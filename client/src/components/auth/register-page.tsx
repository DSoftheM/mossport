import * as S from "./register-page.styled";
import logoPath from "./logo.png";
import { useState } from "react";
import { useQuery } from "react-query";
import { apiProvider } from "../../provider/api-provider";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";
import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

export enum Role {
    Coach = "coach",
    Sportsman = "sportsman",
}

export enum SportSchool {
    N1 = "N1",
    N2 = "N2",
    N3 = "N3",
    N4 = "N4",
    N5 = "N5",
    N6 = "N6",
    N7 = "N7",
    N8 = "N8",
    N9 = "N9",
    N10 = "N10",
    N11 = "N11",
    N12 = "N12",
    N13 = "N13",
    N14 = "N14",
    N15 = "N15",
    N16 = "N16",
    N17 = "N17",
    N18 = "N18",
    N19 = "N19",
    N20 = "N20",
    N21 = "N21",
    N22 = "N22",
    N23 = "N23",
    N24 = "N24",
    N25 = "N25",
    N26 = "N26",
    N27 = "N27",
    N28 = "N28",
    N29 = "N29",
    N30 = "N30",
    N31 = "N31",
    N32 = "N32",
    N33 = "N33",
    N34 = "N34",
    N35 = "N35",
    N36 = "N36",
}

enum TranslateSportSchool {
    N1 = "ГБУ ДО МКСШОР «СЕВЕР»",
    N2 = "ГБУ ДО МКСШОР «ЗАПАД»",
    N3 = "ГБУ ДО МКСШОР «ЮГ»",
    N4 = "ГБУ ДО МКСШОР «ВОСТОК»",
    N5 = "ГБУ ДО МКСШОР «ЦЕНТР»",
    N6 = "ГБУ ДО МКСШ «ЗЕЛЕНОГРАД»",
    N7 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ФИГУРНОГО КАТАНИЯ НА КОНЬКАХ»",
    N8 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ЛЫЖНЫХ ГОНОК И БИАТЛОНА»",
    N9 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ХОККЕЯ» ",
    N10 = "ГБУ ДО «МОСКОВСКАЯ ГОРНОЛЫЖНАЯ АКАДЕМИЯ»",
    N11 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ЗИМНИХ ВИДОВ СПОРТА»",
    N12 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ПЛАВАНИЯ»",
    N13 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ПАРУСНОГО И ГРЕБНЫХ ВИДОВ СПОРТА»",
    N14 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ ВЕЛОСИПЕДНОГО СПОРТА»",
    N15 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ СОВРЕМЕННОГО ПЯТИБОРЬЯ»",
    N16 = "ГБОУ ЦСИО «САМБО-70»",
    N17 = "ГБУ ДО «МГФСО»",
    N18 = "ГБУ ДО «МОСКОВСКАЯ БАСКЕТБОЛЬНАЯ АКАДЕМИЯ»",
    N19 = "ГБУ ДО «МОСКОВСКАЯ ФУТБОЛЬНАЯ АКАДЕМИЯ»",
    N20 = "ГБУ ДО «МОСКОВСКАЯ ТЕННИСНАЯ АКАДЕМИЯ»",
    N21 = "ГБУ ДО «МОСКОВСКАЯ АКАДЕМИЯ РЕГБИ»",
    N22 = "ГБУ ДО «МОСКОВСКАЯ ГАНДБОЛЬНАЯ АКАДЕМИЯ»",
    N23 = "ГБУ ДО «МОСКОВСКАЯ ВОЛЕЙБОЛЬНАЯ АКАДЕМИЯ»",
    N24 = "ГБУ ДО «ФСО ЮНОСТЬ МОСКВЫ»",
    N25 = "ГБУ ДО «САШ»",
    N26 = "ГБПОУ «МССУОР №1»",
    N27 = "ГБПОУ «МССУОР №2»",
    N28 = "ГБПОУ «МССУОР №3»",
    N29 = "ГБПОУ «МССУ №4 ИМ. А.Я.ГОМЕЛЬСКОГО»",
    N30 = "ГБУ ДО СШОР «МОСКВИЧ»",
    N31 = "ГБПОУ КФКС «СПАРТА»",
    N32 = "ГАОУ ВО «МГУСИТ»",
    N33 = "ГБПОУ ЦСИО «МЭШ»",
    N34 = "ГБНОУ СПОРТИВНЫЙ ИНТЕРНАТ «ЧЕРТАНОВО»",
    N35 = "ГАУ ДО СШ «МЦБИ»",
    N36 = "ГБОУ ЦОИС «МОСКВА-98»",
}

export function translateSchool(school: SportSchool) {
    return TranslateSportSchool[school];
}

const roles = [
    { id: "1", text: "Я спортсмен", value: Role.Sportsman },
    { id: "2", text: "Я тренер", value: Role.Coach },
];

export function RegisterPage() {
    const [role, setRole] = useState<Role | "">("");
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [coachId, setCoachId] = useState("");
    const [coachSportSchool, setCoachSportSchool] = useState<SportSchool | "">("");
    const navigate = useNavigate();

    const valid =
        surname && name && patronymic && tel && email && password && confirmPassword && password === confirmPassword && role;

    const registerQuery = useQuery<void>({
        queryKey: "register",
        queryFn: () =>
            apiProvider.auth.register({
                email,
                name,
                password,
                patronymic,
                surname,
                tel,
                roles: [role as Role],
                coachId,
                sportSchool: coachSportSchool as SportSchool,
            }),
        enabled: false,
        onSuccess: () => {
            navigate(Nav.login());
        },
    });

    const allCoachesQuery = useQuery({
        queryKey: "allCoaches",
        queryFn: () => apiProvider.registration.allCoaches(),
    });

    return (
        <S.Root>
            <S.Side>
                <FormControl>
                    <S.Title>Регистрация</S.Title>
                    <S.Body>
                        <S.Side>
                            <S.Title>Личные данные</S.Title>
                            <S.Column>
                                <S.InputTitle>Фамилия</S.InputTitle>
                                <S.Input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" />
                                <S.InputTitle>Имя</S.InputTitle>
                                <S.Input value={name} onChange={(e) => setName(e.target.value)} type="text" />
                                <S.InputTitle>Отчество</S.InputTitle>
                                <S.Input value={patronymic} onChange={(e) => setPatronymic(e.target.value)} type="text" />
                            </S.Column>
                        </S.Side>
                        <S.Side>
                            <S.Title>Контактные данные</S.Title>
                            <S.Column>
                                <S.InputTitle>Телефон</S.InputTitle>
                                <S.Input value={tel} onChange={(e) => setTel(e.target.value)} type="tel" />
                                <S.InputTitle>Почта</S.InputTitle>
                                <S.Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                            </S.Column>
                        </S.Side>
                    </S.Body>
                    <S.Security>
                        <S.Title>Безопасность</S.Title>
                        <Stack gap={2}>
                            <Select
                                sx={{ width: 200 }}
                                variant="filled"
                                value={role}
                                onChange={(e) => setRole(e.target.value as Role)}
                            >
                                {roles.map((role) => (
                                    <MenuItem key={role.id} value={role.value}>
                                        {role.text}
                                    </MenuItem>
                                ))}
                            </Select>
                            {role === Role.Sportsman && (
                                <Select
                                    sx={{ width: 200 }}
                                    variant="filled"
                                    value={coachId}
                                    onChange={(e) => setCoachId(e.target.value)}
                                >
                                    {allCoachesQuery.data?.map((coach) => (
                                        <MenuItem key={coach.userId} value={coach.userId}>
                                            {coach.name} {coach.surname} {coach.patronymic}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            {role === Role.Coach && (
                                <Select
                                    sx={{ width: 200 }}
                                    variant="filled"
                                    value={coachSportSchool}
                                    onChange={(e) => setCoachSportSchool(e.target.value as SportSchool)}
                                >
                                    {Object.values(SportSchool).map((school) => (
                                        <MenuItem key={school} value={school}>
                                            {translateSchool(school)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                            <TextField
                                label="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                            <TextField
                                label="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                            />
                        </Stack>
                        <Box mt={3}>
                            <Button variant="outlined" disabled={!valid} onClick={() => registerQuery.refetch()}>
                                Зарегистрироваться
                            </Button>
                        </Box>
                        <S.Link onClick={() => navigate(Nav.login())}>Уже есть аккаунт ?</S.Link>
                    </S.Security>
                </FormControl>
            </S.Side>
            <S.ImgSide>
                <img src={logoPath} />
            </S.ImgSide>
        </S.Root>
    );
}
