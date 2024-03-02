import { useRef, useState } from "react";
import { months } from "./months";
import * as S from "./schedule.styled";
import { ScheduleTable } from "./types";
import { useImmer } from "use-immer";
import { Box, Button, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Month } from "../../../month";

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

    const [hoverIndex, setHoverIndex] = useState<{ col: number; row: number } | null>(null);

    function renderTextAreas(lineIndex: number) {
        return Array.from({ length: 7 }).map((_, i) => {
            const isHover = hoverIndex?.col === lineIndex && hoverIndex.row === i;
            return (
                <div
                    key={i}
                    style={{
                        overflow: "auto",
                        display: "flex",
                        flexDirection: "column",
                        transitionDuration: "0.2s",
                        background: isHover ? "aliceblue" : "",
                    }}
                    onMouseEnter={() => setHoverIndex({ col: lineIndex, row: i })}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    {table[getMonthByIndex(lineIndex)][i].map((range, rangeIndex) => {
                        return (
                            <Box display={"flex"}>
                                <input
                                    type="time"
                                    onChange={(e) => {
                                        isChanged.current = true;
                                        const time = e.target.value;
                                        updateTable((draft) => {
                                            if (!draft[getMonthByIndex(lineIndex)][i]) {
                                                draft[getMonthByIndex(lineIndex)][i][rangeIndex] = { end: "", start: "" };
                                            }
                                            draft[getMonthByIndex(lineIndex)][i][rangeIndex].start = time;
                                        });
                                    }}
                                    // value={table[getMonthByIndex(lineIndex)][i]?.start ?? ""}
                                    value={range.start ?? ""}
                                />
                                <input
                                    onChange={(e) => {
                                        isChanged.current = true;
                                        const time = e.target.value;
                                        updateTable((draft) => {
                                            if (!draft[getMonthByIndex(lineIndex)][i]) {
                                                draft[getMonthByIndex(lineIndex)][i][rangeIndex] = { end: "", start: "" };
                                            }
                                            draft[getMonthByIndex(lineIndex)][i][rangeIndex].end = time;
                                        });
                                    }}
                                    type="time"
                                    // value={table[getMonthByIndex(lineIndex)][i]?.end ?? ""}
                                    value={range.end ?? ""}
                                />

                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        updateTable((draft) => {
                                            draft[getMonthByIndex(lineIndex)][i].splice(rangeIndex, 1);
                                        });
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        );
                    })}
                    {isHover && (
                        <IconButton
                            onClick={() => {
                                updateTable((draft) => {
                                    draft[getMonthByIndex(lineIndex)][i].push({ end: "", start: "" });
                                });
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    )}
                </div>
            );
        });
    }

    const isValid = Object.values(table).every((rangesByMonth) => {
        return rangesByMonth.every((rangeByMonth) => rangeByMonth.every((range) => Boolean(range.end) && Boolean(range.start)));
    });

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
            <Tooltip title={!isValid ? "Не все временные промежутки заполнены" : ""} placement="right">
                <div style={{ display: "inline-flex" }}>
                    <Button
                        sx={{ marginTop: 2 }}
                        disabled={!isChanged.current || !isValid}
                        variant="contained"
                        color="success"
                        onClick={() => props.onChange(table)}
                    >
                        Сохранить
                    </Button>
                </div>
            </Tooltip>
        </S.Root>
    );
}
