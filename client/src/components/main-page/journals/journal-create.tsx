import { useState } from "react";
import * as S from "./journal-view.styled";
import { AbsenceReason, Journal, Month, MonthAttendanceTracking } from "./types";
import { useCreateJournalMutation } from "../../../provider/query/use-journals-query";

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
            <button onClick={props.onClose}>Закрыть создание журнала</button>
            <p>Название</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <p>Отделение</p>
            <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} />
            <p>Этап спортивной подготовки</p>
            <input type="text" value={sportsTrainingStage} onChange={(e) => setSportsTrainingStage(e.target.value)} />
            <button
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
                            january: [],
                            february: [],
                            march: [],
                            april: [],
                            may: [],
                            june: [],
                            july: [],
                            august: [],
                            september: [],
                            october: [],
                            november: [],
                            december: [],
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
                disabled={!name || !department || !setSportsTrainingStage}
            >
                Создать
            </button>
        </S.Root>
    );
}
