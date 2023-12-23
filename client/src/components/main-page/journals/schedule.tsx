import { useState } from "react";
import { months } from "./months";
import * as S from "./schedule.styled";
import { ScheduleTable } from "./types";
import { useImmer } from "use-immer";

type Props = {
    onClose: () => void;
    scheduleTable: ScheduleTable;
    onChange: (scheduleTable: ScheduleTable) => void;
};

function getMonthByIndex(index: number) {
    if (index === 0) return "january";
    if (index === 1) return "february";
    if (index === 2) return "march";
    if (index === 3) return "april";
    if (index === 4) return "may";
    if (index === 5) return "june";
    if (index === 6) return "july";
    if (index === 7) return "august";
    if (index === 8) return "september";
    if (index === 9) return "october";
    if (index === 10) return "november";
    return "december";
}

export function Schedule(props: Props) {
    const [table, updateTable] = useImmer<ScheduleTable>(props.scheduleTable);

    function renderTextAreas(lineIndex: number) {
        return Array.from({ length: 7 }).map((_, i) => {
            return (
                <textarea
                    key={i}
                    value={table[getMonthByIndex(lineIndex)][i]}
                    onChange={(e) => {
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
            <button onClick={props.onClose}>Закрыть расписание</button>
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
            <button onClick={() => props.onChange(table)}>Сохранить</button>
        </S.Root>
    );
}
