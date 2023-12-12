import * as S from "./main-page.styled";
import logoPath from "./logo.png";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "@nav";
import { Shape } from "./shape";
import { useProfileQuery } from "../../provider/query/use-profile-query";

enum Key {
    Rectangle = "Rectangle",
}

// Расписание тренировок
// Новости
// У тренера каждый прямоугольник - отдельный блок

function extractFirstLetters(name: string, surname: string) {
    return (name.slice(0, 1) + surname.slice(0, 1)).toUpperCase();
}

export function MainPage() {
    const [selectedId, setSelectedId] = useState<Key | null>(null);
    const navigate = useNavigate();

    const profileQuery = useProfileQuery();

    return (
        <S.Root>
            <S.Container>
                <S.HeaderContainer>
                    <S.Header>
                        <S.Title>Добро пожаловать</S.Title>
                        <S.Logo src={logoPath} />
                        <S.Avatar onClick={() => navigate(Nav.profile())}>
                            {profileQuery.data ? extractFirstLetters(profileQuery.data.name, profileQuery.data.surname) : ".."}
                        </S.Avatar>
                    </S.Header>
                </S.HeaderContainer>
                <S.Body>
                    <Shape
                        opened={selectedId === Key.Rectangle}
                        shape="rectangle"
                        onClick={() => setSelectedId(Key.Rectangle)}
                        onClose={() => setSelectedId(null)}
                        title="Расписание тренировок"
                        renderExpandedContent={() => (
                            <div style={{ padding: 20 }}>
                                <h2 style={{ textAlign: "center" }}>Text</h2>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex incidunt dolore tempore ipsam
                                    repudiandae necessitatibus harum nobis doloribus earum perspiciatis optio qui, fuga commodi
                                    maxime alias voluptatem! Cupiditate, quo atque!
                                </p>
                            </div>
                        )}
                    />
                </S.Body>
            </S.Container>
        </S.Root>
    );
}
