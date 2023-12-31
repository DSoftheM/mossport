import * as S from "./main-page.styled";
import logoPath from "./logo.png";
import { ReactNode, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { Nav } from "@nav";
import { Shape } from "./shape";
import { useProfileQuery } from "../../provider/query/use-profile-query";
import { useNewsQuery } from "../../provider/query/use-news-query";
import { NewsView } from "./news";
import { TrainingSchedule } from "./training-schedule";
import { Journals } from "./journals/journals";
import { useAnimate } from "framer-motion";

enum Key {
    News = "News",
    Journals = "Journals",
}

// Расписание тренировок
// У тренера каждый прямоугольник - отдельный блок

function extractFirstLetters(name: string, surname: string) {
    return (name.slice(0, 1) + surname.slice(0, 1)).toUpperCase();
}

const titles = ["Добро пожаловать", `Сегодня ${new Date().toLocaleDateString("ru")}`, "Еще одна фраза"];

export function MainPage() {
    const [selectedId, setSelectedId] = useState<Key | null>(null);
    const navigate = useNavigate();

    const profileQuery = useProfileQuery();
    const newsQuery = useNewsQuery();

    function getTitleByIndex(index: number) {
        return titles[index];
    }

    const [selectedTitleIndex, setSelectedTitleIndex] = useState<number>(0);
    // useEffect(() => {
    //     setInterval(() => {
    //         setSelectedTitleIndex((prevIndex) => {
    //             const newIndex = prevIndex + 1;
    //             if (newIndex === titles.length) {
    //                 return 0;
    //             }
    //             return newIndex;
    //         });
    //     }, 1000);
    // }, []);

    function renderBody() {
        if (!selectedId) {
            return (
                <S.Body>
                    <Shape
                        title="Новости"
                        shape="rectangle"
                        onClick={() => {
                            setSelectedId(Key.News);
                            newsQuery.refetch();
                        }}
                    />
                    <Shape
                        title="Журналы"
                        shape="rectangle"
                        onClick={() => {
                            setSelectedId(Key.Journals);
                            newsQuery.refetch();
                        }}
                    />
                </S.Body>
            );
        }

        if (selectedId === Key.News) {
            return <NewsView news={newsQuery.data ?? []} onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.Journals) {
            return <Journals onClose={() => setSelectedId(null)} />;
        }
    }

    return (
        <S.Root>
            <S.Container>
                <MainHeader />
                {renderBody()}
            </S.Container>
        </S.Root>
    );
}

export function MainHeader() {
    const navigate = useNavigate();

    const profileQuery = useProfileQuery();
    const [scope, animate] = useAnimate();
    const isProfile = useMatch(Nav.profile());

    return (
        <S.HeaderContainer>
            <S.Header>
                <S.Title>Добро пожаловать</S.Title>
                <S.Logo src={logoPath} />
                <S.Avatar
                    ref={scope}
                    animate={{ scale: 1 }}
                    onClick={async () => {
                        if (isProfile) return;
                        await animate(
                            scope.current,
                            {
                                scale: 100,
                                backgroundColor: "white",
                                color: "white",
                                position: "relative",
                                zIndex: 1,
                            },
                            {
                                duration: 1,
                            }
                        );
                        navigate(Nav.profile());
                    }}
                >
                    {profileQuery.data ? extractFirstLetters(profileQuery.data.name, profileQuery.data.surname) : ".."}
                </S.Avatar>
            </S.Header>
        </S.HeaderContainer>
    );
}
