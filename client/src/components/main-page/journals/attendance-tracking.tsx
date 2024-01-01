import { useState } from "react";
import * as S from "./attendance-tracking.styled";
import { AbsenceReason, AttendanceTracking, MonthAttendanceTracking, Sportsman } from "./types";
import { MenuItem, Select } from "@mui/material";
import { getMonthByIndex } from "./schedule";
import { produce } from "immer";

type Props = {
    onClose: () => void;
    attendanceTracking: AttendanceTracking;
    sportsman: Sportsman[];
    onChange: (attendanceTracking: AttendanceTracking) => void;
};

function getMonthName(month: number) {
    const date = new Date(2023, month, 1);
    return date.toLocaleString("default", { month: "long" });
}

function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

export function AttendanceTrackingEdit(props: Props) {
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
                {props.sportsman.map((sportsman, i) => {
                    const attendance: MonthAttendanceTracking = props.attendanceTracking.tracking[getMonthByIndex(month)][i] ?? {
                        attendance: [],
                        sportsman,
                    };
                    return (
                        <>
                            <p>{i + 1}</p>
                            <p>{sportsman.name}</p>
                            {Array.from({ length: days }).map((x, j) => {
                                const value = getFirstLetter(attendance.attendance[j] ?? "");
                                return (
                                    <Select
                                        color="success"
                                        sx={{ backgroundColor: value ? "#99cdf7" : "initial" }}
                                        inputProps={{ IconComponent: () => null }}
                                        value={value}
                                        onChange={(e) => {
                                            const updatedAttendance = produce(attendance, (draft) => {
                                                draft.attendance[j] = e.target.value as AbsenceReason;
                                            });
                                            const updated = produce(props.attendanceTracking, (draft) => {
                                                draft.tracking[getMonthByIndex(month)][i] = updatedAttendance;
                                            });
                                            props.onChange(updated);
                                        }}
                                    >
                                        <MenuItem value="">Не выбрано</MenuItem>
                                        <MenuItem value={AbsenceReason.Disease}>Болел</MenuItem>
                                        <MenuItem style={{ display: "none" }} value={AbsenceReason.Disease}>
                                            Б
                                        </MenuItem>
                                        <MenuItem value={AbsenceReason.Lack}>Отсутствовал</MenuItem>
                                        <MenuItem style={{ display: "none" }} value={AbsenceReason.Lack}>
                                            О
                                        </MenuItem>
                                    </Select>
                                );
                            })}
                        </>
                    );
                })}
            </S.Table>
        </S.Root>
    );
}

function getFirstLetter(word: string | null) {
    if (!word) return "";
    return word;
}
