import * as S from "./register-page.styled";
import logoPath from "./logo.png";

export function RegisterPage(): JSX.Element {
    return (
        <S.Root>
            <S.Side>
                <S.Title>Регистрация</S.Title>
                <S.Body>
                    <S.Side>
                        <S.Title>Личные данные</S.Title>
                        <S.Column>
                            <S.InputTitle>Фамилия</S.InputTitle>
                            <S.Input type="text" />
                            <S.InputTitle>Имя</S.InputTitle>
                            <S.Input type="text" />
                            <S.InputTitle>Отчество</S.InputTitle>
                            <S.Input type="text" />
                        </S.Column>
                    </S.Side>
                    <S.Side>
                        <S.Title>Контактные данные</S.Title>
                        <S.Column>
                            <S.InputTitle>Телефон</S.InputTitle>
                            <S.Input type="text" />
                            <S.InputTitle>Почта</S.InputTitle>
                            <S.Input />
                        </S.Column>
                    </S.Side>
                </S.Body>
                <S.Security>
                    <S.Title>Безопасность</S.Title>
                    <S.Column>
                        <S.InputTitle>Пароль</S.InputTitle>
                        <S.Input type="password" />
                        <S.InputTitle>Повторите пароль</S.InputTitle>
                        <S.Input type="password" />
                    </S.Column>
                </S.Security>
                <S.Button>Зарегистрироваться</S.Button>
            </S.Side>
            <S.Side>
                <img src={logoPath} />
            </S.Side>
        </S.Root>
    );
}
