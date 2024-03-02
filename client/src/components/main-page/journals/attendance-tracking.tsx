import { PropsWithChildren, useState } from "react";
import * as S from "./attendance-tracking.styled";
import { AbsenceReason, AttendanceTracking, MonthAttendanceTracking, Sportsman } from "./types";
import { IconButton, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import { getMonthByIndex } from "./schedule";
import { produce } from "immer";
import React from "react";
import { CloseButton } from "../../close-button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type Props = {
    onClose: () => void;
    attendanceTracking: AttendanceTracking;
    sportsman: Sportsman[];
    onChange: (attendanceTracking: AttendanceTracking) => void;
};

function getMonthName(month: number) {
    const date = new Date(2023, month, 1);
    return date.toLocaleString("default", { month: "long" }).toUpperCase();
}

export function daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
}

type CalendarTableProps = {
    month: number;
    onChange: (month: number) => void;
    show: boolean;
};

export function CalendarTable(props: PropsWithChildren<CalendarTableProps>) {
    const { month, onChange: setMonth } = props;
    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);

    return (
        <S.Table $columns={props.show ? days + 2 : days}>
            {props.show && (
                <>
                    <p style={{ gridRow: "1 / 3" }}>№ п/п</p>
                    <p style={{ gridRow: "1 / 3" }}>Фамилия, имя</p>
                </>
            )}
            <p style={{ gridColumn: props.show ? "3 / -1" : "1 / -1" }}>
                <Tooltip title="Предыдущий месяц">
                    <IconButton disabled={month === 0} onClick={() => setMonth(month - 1)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                </Tooltip>
                <p style={{ display: "inline-flex", width: 105, justifyContent: "center" }}>{getMonthName(month)}</p>
                <Tooltip title="Следующий месяц">
                    <IconButton disabled={month === 11} onClick={() => setMonth(month + 1)}>
                        <ArrowBackIosNewIcon sx={{ rotate: "180deg" }} />
                    </IconButton>
                </Tooltip>
            </p>
            {Array.from({ length: days }).map((x, i) => (
                <p key={i}>{i + 1}</p>
            ))}
            {props.children}
        </S.Table>
    );
}

export function AttendanceTrackingEdit(props: Props) {
    const currentMonth = new Date().getMonth();
    const [month, setMonth] = useState<number>(currentMonth);
    const currentYear = new Date().getFullYear();
    const days = daysInMonth(month, currentYear);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Учет посещаемости
            </Typography>
            <CalendarTable month={month} onChange={setMonth} show>
                {props.sportsman.map((sportsman, i) => {
                    const attendance: MonthAttendanceTracking = props.attendanceTracking.tracking[getMonthByIndex(month)][i] ?? {
                        attendance: [],
                        sportsman,
                    };
                    return (
                        <React.Fragment key={i}>
                            <p>{i + 1}</p>
                            <p>{sportsman.name}</p>
                            {Array.from({ length: days }).map((x, j) => {
                                const value = getFirstLetter(attendance.attendance[j] ?? "");
                                return (
                                    <Select
                                        key={j}
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
                                        <MenuItem value={AbsenceReason.PlanPass}>Запланирован пропуск</MenuItem>
                                        <MenuItem value={AbsenceReason.Disease}>Болел</MenuItem>

                                        <MenuItem style={{ display: "none" }} value={AbsenceReason.Disease}>
                                            Б
                                        </MenuItem>
                                        <MenuItem value={AbsenceReason.Lack}>Отсутствовал</MenuItem>
                                        <MenuItem style={{ display: "none" }} value={AbsenceReason.Lack}>
                                            О
                                        </MenuItem>
                                        <MenuItem style={{ display: "none" }} value={AbsenceReason.PlanPass}>
                                            З
                                        </MenuItem>
                                    </Select>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </CalendarTable>
        </S.Root>
    );
}

function getFirstLetter(word: string | null) {
    if (!word) return "";
    return word;
}
