import * as S from "./schedule.styled";
import { Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useQuery } from "react-query";
import { apiProvider } from "../../../provider/api-provider";
import { useProfileQuery } from "../../../provider/query/use-profile-query";
import { translateSchool } from "../../auth/register-page";
import { CalendarTable, daysInMonth } from "./attendance-tracking";
import { useState } from "react";
import { getMonthByIndex } from "./schedule";

type Props = {
    onClose: () => void;
};

export function SportsmanAttendance(props: Props) {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState<number>(currentMonth);
    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);

    const useSportsmanAttendanceByMonthQuery = useQuery({
        queryKey: ["sportsmanAttendanceByMonth", month],
        queryFn: () => apiProvider.journals.getSportsmanAttendanceByMonth(month),
    });

    console.log("useSportsmanAttendanceByMonthQuery.data :>> ", useSportsmanAttendanceByMonthQuery.data);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Посещаемость
            </Typography>
            <CalendarTable month={month} onChange={setMonth} show={false}>
                {useSportsmanAttendanceByMonthQuery.data &&
                    useSportsmanAttendanceByMonthQuery.data.tracking[getMonthByIndex(currentMonth)].flatMap((x) =>
                        x.attendance.map((y) => {
                            if (!y) return <div></div>;
                            if (y === "disease") {
                                return <div>Б</div>;
                            }
                            return <div>О</div>;
                        })
                    )}
            </CalendarTable>
            {!useSportsmanAttendanceByMonthQuery.data && <Typography variant="h1">Нет посещаемости</Typography>}
        </S.Root>
    );
}
