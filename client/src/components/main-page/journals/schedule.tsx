import { useRef, useState } from "react";
import { months } from "./months";
import * as S from "./schedule.styled";
import { Month, ScheduleTable } from "./types";
import { useImmer } from "use-immer";
import { Button, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";

type Props = {
    onClose: () => void;
    scheduleTable: ScheduleTable;
    onChange: (scheduleTable: ScheduleTable) => void;
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

export function Schedule(props: Props) {
    const [table, updateTable] = useImmer<ScheduleTable>(props.scheduleTable);
    const isChanged = useRef(false);

    function renderTextAreas(lineIndex: number) {
        return Array.from({ length: 7 }).map((_, i) => {
            return (
                <textarea
                    key={i}
                    value={table[getMonthByIndex(lineIndex)][i]}
                    onChange={(e) => {
                        isChanged.current = true;
                        const text = e.target.value;
                        updateTable((draft) => {
                            draft[getMonthByIndex(lineIndex)][i] = text;
                        });
                    }}
                ></textarea>
            );
        });
    }

    return (
        <S.Root>
            {/* <button onClick={props.onClose}>Закрыть расписание</button> */}
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
            <Button
                sx={{ marginTop: 2 }}
                disabled={!isChanged.current}
                variant="contained"
                color="success"
                onClick={() => props.onChange(table)}
            >
                Сохранить
            </Button>
        </S.Root>
    );
}
