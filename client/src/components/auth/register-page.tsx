import * as S from "./register-page.styled";
import logoPath from "./logo.png";
import { useState } from "react";
import { useQuery } from "react-query";
import { apiProvider } from "../../provider/api-provider";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";
import { Dropdown } from "@ui/dropdown/dropdown";

export enum Role {
    Coach = "coach",
    Sportsman = "sportsman",
}

const roles = [
    { id: "1", text: "Я спортсмен", value: Role.Sportsman },
    { id: "2", text: "Я тренер", value: Role.Coach },
];

export function RegisterPage() {
    const [role, setRole] = useState<Role | null>(null);
    const [surname, setSurname] = useState("");
    const [name, setName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const valid =
        surname && name && patronymic && tel && email && password && confirmPassword && password === confirmPassword && role;

    const registerQuery = useQuery<void>({
        queryKey: "register",
        queryFn: () => apiProvider.auth.register({ email, name, password, patronymic, surname, tel, role: [role!] }),
        enabled: false,
        onSuccess: () => {
            navigate(Nav.login());
        },
    });

    return (
        <S.Root>
            <S.Side>
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
                    <Dropdown items={roles} onChange={setRole} selectedId={roles.find((x) => x.value === role)?.id} />
                    <S.Column>
                        <S.InputTitle>Пароль</S.InputTitle>
                        <S.Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                        <S.InputTitle>Повторите пароль</S.InputTitle>
                        <S.Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" />
                    </S.Column>
                </S.Security>
                <S.Button disabled={!valid} onClick={() => registerQuery.refetch()}>
                    Зарегистрироваться
                </S.Button>
                <S.Link onClick={() => navigate(Nav.login())}>Уже есть аккаунт ?</S.Link>
            </S.Side>
            <S.ImgSide>
                <img src={logoPath} />
            </S.ImgSide>
        </S.Root>
    );
}
