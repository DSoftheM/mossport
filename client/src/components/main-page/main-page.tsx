import * as S from "./main-page.styled";
// import logoPath from "./logo.png";
import logoPath from "./logo.svg";
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
import { Box, IconButton, Tooltip } from "@mui/material";
import { LogoutSharp } from "@mui/icons-material";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { SportsmanSchedule } from "./journals/sportsman-schedule";
import { SportsmanInformation } from "./journals/sportsman-information";
import { SportsmanAttendance } from "./journals/sportsman-attendance";
import { apiProvider } from "../../provider/api-provider";
import { ScheduleTable } from "./journals/types";
import { Info } from "./journals/info";

enum Key {
    News = "News",
    Journals = "Journals",
    Schedule = "Schedule",
    Information = "Information",
    SportsmanAttendance = "SportsmanAttendance",
    Info = "Info",
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
                        onClick={() => {
                            setSelectedId(Key.News);
                            newsQuery.refetch();
                        }}
                    />
                    <Shape
                        title="Информация об учреждении"
                        onClick={() => {
                            setSelectedId(Key.Info);
                            newsQuery.refetch();
                        }}
                    />
                    {profileQuery.data?.roles.includes("coach") && (
                        <Shape
                            title="Журналы"
                            onClick={() => {
                                setSelectedId(Key.Journals);
                                newsQuery.refetch();
                            }}
                        />
                    )}
                    {profileQuery.data?.roles.includes("sportsman") && (
                        <>
                            <Shape
                                title="Расписание"
                                onClick={() => {
                                    setSelectedId(Key.Schedule);
                                }}
                            />
                            <Shape
                                title="Информация"
                                onClick={() => {
                                    setSelectedId(Key.Information);
                                }}
                            />
                            <Shape
                                title="Посещаемость"
                                onClick={() => {
                                    setSelectedId(Key.SportsmanAttendance);
                                }}
                            />
                        </>
                    )}
                </S.Body>
            );
        }

        if (selectedId === Key.News) {
            return <NewsView news={newsQuery.data ?? []} onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.Journals) {
            return <Journals onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.Schedule) {
            return <SportsmanSchedule onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.Information) {
            return <SportsmanInformation onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.SportsmanAttendance) {
            return <SportsmanAttendance onClose={() => setSelectedId(null)} />;
        }

        if (selectedId === Key.Info) {
            return <Info onClose={() => setSelectedId(null)} />;
        }
    }

    return (
        <S.Root>
            <S.Container>
                <MainHeader />
                <div style={{ backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 20 }}>{renderBody()}</div>
            </S.Container>
        </S.Root>
    );
}

// Найти ближайшую тренировку
function findNearestWorkoutDate(data: ScheduleTable | undefined): Date | null {
    if (!data) return null;
    let nearestDate: string | null = null;
    if (data.january.find((ranges) => ranges.length !== 0)) {
        nearestDate = data.january.find((ranges) => ranges.length !== 0)?.[0].start ?? null;
        const index = data.january.findIndex((ranges) => ranges.length !== 0);
        const date = new Date();
        const [hours, minutes] = (nearestDate ?? "").split(":");
        console.log("hours :>> ", hours);
        console.log("minutes :>> ", minutes);
        date.setHours(+hours);
        date.setMinutes(+minutes);
        date.setMonth(0);
        date.setDate(index);
        return date;
    }
    return nearestDate ? new Date(nearestDate) : null;
}

export function MainHeader() {
    const navigate = useNavigate();

    const profileQuery = useProfileQuery();
    const [scope, animate] = useAnimate();
    const isProfile = useMatch(Nav.profile());
    const queryClient = useQueryClient();

    const getScheduleTableQuery = useQuery({
        queryKey: "getScheduleTable",
        queryFn: () => apiProvider.journals.getScheduleTable(),
        enabled: false,
    });

    const [changeTitle, setChangeTitle] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setChangeTitle(true);
        }, 5000);
    }, []);

    return (
        <S.HeaderContainer>
            <S.Header>
                {!changeTitle ? (
                    <S.Title>Добро пожаловать</S.Title>
                ) : (
                    <S.Title2>
                        {"Ближайшая тренировка " +
                            findNearestWorkoutDate(getScheduleTableQuery.data)?.toLocaleString("ru").slice(0, -3)}
                    </S.Title2>
                )}
                <S.Logo src={logoPath} />
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Tooltip title="Выйти">
                        <IconButton>
                            <LogoutSharp
                                onClick={() => {
                                    axios.defaults.headers.common.Authorization = undefined;
                                    document.cookie = "access_token=";
                                    navigate(Nav.login());
                                    queryClient.invalidateQueries({ queryKey: "profile" });
                                }}
                                sx={{ cursor: "pointer" }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Профиль">
                        <S.Avatar
                            ref={scope}
                            animate={{ scale: 1 }}
                            onClick={async () => {
                                if (isProfile) return;
                                await animate(
                                    scope.current,
                                    {
                                        scale: 85,
                                        backgroundColor: "white",
                                        color: "white",
                                        position: "relative",
                                        zIndex: 1,
                                    },
                                    { duration: 0.4 }
                                );
                                navigate(Nav.profile());
                            }}
                        >
                            {profileQuery.data ? extractFirstLetters(profileQuery.data.name, profileQuery.data.surname) : ".."}
                        </S.Avatar>
                    </Tooltip>
                </Box>
            </S.Header>
        </S.HeaderContainer>
    );
}
