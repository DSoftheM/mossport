import { useState } from "react";
import * as S from "./journal-view.styled";
import { MonthAttendanceTracking } from "./types";
import { useCreateJournalMutation } from "../../../provider/query/use-journals-query";
import { CloseButton } from "../../close-button";
import { Button, Stack, TextField } from "@mui/material";
import { Month } from "@shared/types";

type Props = {
    onClose: () => void;
};

// Todo: переименовать JournalItem
export function JournalCreate(props: Props) {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [sportsTrainingStage, setSportsTrainingStage] = useState("");

    const createJournalCommand = useCreateJournalMutation();

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Stack gap={3}>
                <TextField label="Название" value={name} onChange={(e) => setName(e.target.value)} />
                <TextField label="Отделение" value={department} onChange={(e) => setDepartment(e.target.value)} />
                <TextField
                    label="Этап спортивной подготовки"
                    value={sportsTrainingStage}
                    onChange={(e) => setSportsTrainingStage(e.target.value)}
                />
                <Button
                    sx={{ alignSelf: "start" }}
                    color="success"
                    variant="contained"
                    onClick={() => {
                        createJournalCommand.mutate({
                            department,
                            name,
                            sportsTrainingStage,
                            startDate: new Date(),
                            generalInformation: { sportsmen: [] },
                            attendance: {
                                tracking: Object.values(Month).reduce((total, month) => {
                                    total[month] = [];
                                    return total;
                                }, {} as Record<Month, MonthAttendanceTracking[]>),
                            },
                            scheduleTable: {
                                january: [[], [], [], [], [], [], []],
                                february: [[], [], [], [], [], [], []],
                                march: [[], [], [], [], [], [], []],
                                april: [[], [], [], [], [], [], []],
                                may: [[], [], [], [], [], [], []],
                                june: [[], [], [], [], [], [], []],
                                july: [[], [], [], [], [], [], []],
                                august: [[], [], [], [], [], [], []],
                                september: [[], [], [], [], [], [], []],
                                october: [[], [], [], [], [], [], []],
                                november: [[], [], [], [], [], [], []],
                                december: [[], [], [], [], [], [], []],
                            },
                            results: {
                                sportsmanResults: [],
                            },
                            plans: {
                                sportsmanPlan: [],
                            },
                        });
                        props.onClose();
                    }}
                    disabled={!name || !department || !sportsTrainingStage}
                >
                    Создать
                </Button>
            </Stack>
        </S.Root>
    );
}
