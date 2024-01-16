import * as S from "./schedule.styled";
import { Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useQuery } from "react-query";
import { apiProvider } from "../../../provider/api-provider";
import { useProfileQuery } from "../../../provider/query/use-profile-query";
import { translateSchool } from "../../auth/register-page";
import { CalendarTable, daysInMonth } from "./attendance-tracking";
import { useState } from "react";

type Props = {
    onClose: () => void;
};

export function SportsmanAttendance(props: Props) {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState<number>(currentMonth);
    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);

    const useSportsmanAttendanceByMonthQuery = useQuery({
        queryKey: "sportsmanAttendanceByMonth",
        queryFn: () => apiProvider.journals.getSportsmanAttendanceByMonth(month),
    });

    console.log("useSportsmanAttendanceByMonthQuery :>> ", useSportsmanAttendanceByMonthQuery.data);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Посещаемость
            </Typography>
            <CalendarTable month={month} onChange={setMonth} show={false}>
                {/* {Array.from(days).map(day => )} */}
            </CalendarTable>
        </S.Root>
    );
}
