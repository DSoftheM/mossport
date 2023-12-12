import * as S from "./main-page.styled";
import logoPath from "./logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";

enum Key {
    Rectangle = "Rectangle",
}

// Расписание тренировок
// Новости
// У тренера каждый прямоугольник - отдельный блок

export function MainPage() {
    const [selectedId, setSelectedId] = useState<Key | null>(null);
    const navigate = useNavigate();

    return (
        <S.Root>
            <S.Container>
                <S.HeaderContainer>
                    <S.Header>
                        <S.Title>Добро пожаловать</S.Title>
                        <S.Logo src={logoPath} />
                        <S.Avatar onClick={() => navigate(Nav.profile())}>АИ</S.Avatar>
                    </S.Header>
                </S.HeaderContainer>
                <S.Body>
                    <S.Rectangle
                        style={{ backgroundColor: "lime" }}
                        onClick={() => setSelectedId(Key.Rectangle)}
                        selected={selectedId === Key.Rectangle}
                    >
                        <S.Close
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(null);
                            }}
                        >
                            Закрыть
                        </S.Close>
                        Расписание тренировок
                    </S.Rectangle>
                    {/* <S.Rectangle
                        style={{ backgroundColor: "firebrick" }}
                        onClick={() => setSelectedId(Key.Rectangle)}
                        selected={selectedId === Key.Rectangle}
                    >
                        <S.Close
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(null);
                            }}
                        >
                            Закрыть
                        </S.Close>
                        Расписание тренировок
                    </S.Rectangle>
                    <S.Rectangle
                        style={{ backgroundColor: "ghostwhite" }}
                        onClick={() => setSelectedId(Key.Rectangle)}
                        selected={selectedId === Key.Rectangle}
                    >
                        <S.Close
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(null);
                            }}
                        >
                            Закрыть
                        </S.Close>
                        Расписание тренировок
                    </S.Rectangle> */}
                </S.Body>
            </S.Container>
        </S.Root>
    );
}
