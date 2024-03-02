import * as S from "./schedule.styled";
import { Box, Button, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiProvider } from "../../../provider/api-provider";
import { CalendarTable, daysInMonth } from "./attendance-tracking";
import { useState } from "react";
import { getMonthByIndex } from "./schedule";
import { DatePicker } from "@mui/x-date-pickers";

type Props = {
    onClose: () => void;
};

export function SportsmanAttendance(props: Props) {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState<number>(currentMonth);
    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);
    const [openPlanPass, setOpenPlanPass] = useState(false);
    const [passDate, setPassDate] = useState<Date | null>(null);

    const sportsmanAttendanceByMonthQuery = useQuery({
        queryKey: ["sportsmanAttendanceByMonth", month],
        queryFn: () => apiProvider.journals.getSportsmanAttendanceByMonth(month),
    });

    const queryClient = useQueryClient();
    const planPassMutation = useMutation({
        mutationFn: (date: Date) => apiProvider.sportsmen.planPass(date),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sportsmanAttendanceByMonth"],
            });
        },
    });

    const monthWord = getMonthByIndex(month);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Посещаемость
            </Typography>
            <CalendarTable month={month} onChange={setMonth} show={false}>
                {sportsmanAttendanceByMonthQuery.data &&
                    sportsmanAttendanceByMonthQuery.data.tracking[monthWord].flatMap((x: any) =>
                        x.attendance.map((y: any) => {
                            if (!y) return <div></div>;
                            if (y === "disease") {
                                return <div>Б</div>;
                            }
                            if (y === "PlanPass") {
                                return <div>З</div>;
                            }
                            return <div>О</div>;
                        })
                    )}
            </CalendarTable>
            {!sportsmanAttendanceByMonthQuery.data && <Typography variant="h1">Нет посещаемости</Typography>}
            <Button sx={{ mt: 2 }} variant="contained" onClick={() => setOpenPlanPass(!openPlanPass)}>
                Запланировать пропуск
            </Button>
            {openPlanPass && (
                <Box display={"flex"} gap={3} mt={2}>
                    <DatePicker onChange={setPassDate} value={passDate} />
                    <Button
                        color="success"
                        variant="contained"
                        disabled={!passDate}
                        onClick={() => {
                            if (!passDate) return;
                            setOpenPlanPass(false);
                            planPassMutation.mutate(passDate);
                        }}
                    >
                        Сохранить
                    </Button>
                </Box>
            )}
        </S.Root>
    );
}
