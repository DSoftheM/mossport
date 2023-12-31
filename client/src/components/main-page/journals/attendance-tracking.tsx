import { useState } from "react";
import * as S from "./attendance-tracking.styled";
import { AbsenceReason, AttendanceTracking, Sportsman } from "./types";
import { Dropdown } from "@ui/dropdown/dropdown";
import { MenuItem, Select } from "@mui/material";

type Props = {
    onClose: () => void;
    attendanceTracking: AttendanceTracking;
    sportsmen: Sportsman[];
};

function getMonthName(month: number) {
    const date = new Date(2023, month, 1);
    return date.toLocaleString("default", { month: "long" });
}

function daysInMonth(month: number, year: number) {
    return new Date(year, month - 1, 0).getDate();
}

export function AttendanceTracking(props: Props) {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState<number>(currentMonth);

    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);

    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть учет посещаемости</button>
            <button disabled={month === 0} onClick={() => setMonth(month - 1)}>
                Предыдущий месяц
            </button>
            <button disabled={month === 11} onClick={() => setMonth(month + 1)}>
                Следующий месяц
            </button>
            <S.Table columns={days + 2}>
                <p style={{ gridRow: "1 / 3" }}>№ п/п</p>
                <p style={{ gridRow: "1 / 3" }}>Фамилия, имя</p>
                <p style={{ gridColumn: "3 / -1" }}>Дни месяца {getMonthName(month)}</p>
                {Array.from({ length: days }).map((x, i) => (
                    <p>{i + 1}</p>
                ))}
                {props.sportsmen.map((x, i) => (
                    <>
                        <p>{i + 1}</p>
                        <p>{x.name}</p>
                        {Array.from({ length: days }).map((x, i) => (
                            // <input type="checkbox" />
                            <Select onChange={console.log}>
                                <MenuItem value={AbsenceReason.Disease}>Болел</MenuItem>
                                <MenuItem value={AbsenceReason.Lack}>Отсутствовал</MenuItem>
                            </Select>
                        ))}
                    </>
                ))}
            </S.Table>
        </S.Root>
    );
}
