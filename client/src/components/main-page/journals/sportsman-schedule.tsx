import { months } from "./months";
import * as S from "./schedule.styled";
import { Month, ScheduleTable } from "./types";
import { Box, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useQuery } from "react-query";
import { apiProvider } from "../../../provider/api-provider";

type Props = {
    onClose: () => void;
};

export function getMonthByIndex(index: number): Month {
    if (index === 0) return Month.January;
    if (index === 1) return Month.February;
    if (index === 2) return Month.March;
    if (index === 3) return Month.April;
    if (index === 4) return Month.May;
    if (index === 5) return Month.June;
    if (index === 6) return Month.July;
    if (index === 7) return Month.August;
    if (index === 8) return Month.September;
    if (index === 9) return Month.October;
    if (index === 10) return Month.November;
    return Month.December;
}

export function SportsmanSchedule(props: Props) {
    const getScheduleTableQuery = useQuery({
        queryKey: "getScheduleTable",
        queryFn: () => apiProvider.journals.getScheduleTable(),
    });

    if (!getScheduleTableQuery.data) return "Загрузка...";

    function renderTextAreas(lineIndex: number) {
        if (!getScheduleTableQuery.data) return "Загрузка...";

        return Array.from({ length: 7 }).map((_, i) => {
            return (
                <div
                    key={i}
                    style={{
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        transitionDuration: "0.2s",
                        // background: isHover ? "aliceblue" : "",
                    }}
                >
                    {getScheduleTableQuery.data[getMonthByIndex(lineIndex)][i].map((range, rangeIndex) => {
                        return (
                            <Box display={"flex"}>
                                <Typography>{range.start}</Typography> - <Typography>{range.end}</Typography>
                            </Box>
                        );
                    })}
                </div>
            );
        });
    }

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Расписание
            </Typography>
            <S.Table>
                <b>Дни/месяцы</b>
                <p>ПН</p>
                <p>ВТ</p>
                <p>СР</p>
                <p>ЧТ</p>
                <p>ПТ</p>
                <p>СБ</p>
                <p>ВС</p>
                {months.map((month, i) => (
                    <>
                        <p>{month}</p>
                        {renderTextAreas(i)}
                    </>
                ))}
            </S.Table>
        </S.Root>
    );
}
