import { useState } from "react";
import { Shape } from "../shape";
import * as S from "./journal-view.styled";
import { GeneralInformation } from "./general-information";
import { Journal, Sportsman } from "./types";
import { produce } from "immer";
import { Schedule } from "./schedule";
import { Plan } from "./plan";
import { AttendanceTrackingEdit } from "./attendance-tracking";
import { Results } from "./results";

type Props = {
    journal: Journal;
    onClose: () => void;
    onChange: (journal: Journal) => void;
};

enum JournalStage {
    GeneralInformation = "GeneralInformation",
    Schedule = "Schedule",
    Plan = "Plan",
    AttendanceTracking = "AttendanceTracking",
    Results = "Results",
}

export function JournalView(props: Props) {
    const [selectedStage, setSelectedStage] = useState<JournalStage | null>(null);

    function renderBody() {
        if (!selectedStage) {
            return (
                <>
                    <button onClick={props.onClose}>Закрыть журнал</button>
                    <S.Title>{props.journal.name}</S.Title>
                    <p>Отделение: {props.journal.department}</p>
                    <p>Этап спортивной подготовки: {props.journal.sportsTrainingStage}</p>
                    <p>Начат: {props.journal.startDate.toLocaleDateString("ru")}</p>
                    <S.Shapes>
                        <Shape shape="rectangle" onClick={() => setSelectedStage(JournalStage.Schedule)} title="Расписание" />
                        <Shape
                            shape="rectangle"
                            onClick={() => setSelectedStage(JournalStage.GeneralInformation)}
                            title="Общие сведения"
                        />
                        <Shape
                            shape="rectangle"
                            onClick={() => setSelectedStage(JournalStage.Plan)}
                            title="План спортивной подготовки"
                        />
                        <Shape
                            shape="rectangle"
                            onClick={() => setSelectedStage(JournalStage.AttendanceTracking)}
                            title="Учет посещаемости"
                        />
                        <Shape shape="rectangle" onClick={() => setSelectedStage(JournalStage.Results)} title="Итоги" />
                    </S.Shapes>
                </>
            );
        }
        if (selectedStage === JournalStage.GeneralInformation) {
            return (
                <GeneralInformation
                    sportsmen={props.journal.generalInformation.sportsmen}
                    onCreate={(x) => {
                        const updated = produce(props.journal, (draft) => {
                            draft.generalInformation.sportsmen.push(x);
                        });
                        props.onChange(updated);
                    }}
                    onEdit={(sportsman, index) => {
                        const updated = produce(props.journal, (draft) => {
                            draft.generalInformation.sportsmen[index] = sportsman;
                        });
                        props.onChange(updated);
                    }}
                    onClose={() => setSelectedStage(null)}
                />
            );
        }
        if (selectedStage === JournalStage.Schedule) {
            return (
                <Schedule
                    scheduleTable={props.journal.scheduleTable}
                    onChange={(table) => {
                        const updated = produce(props.journal, (draft) => {
                            draft.scheduleTable = table;
                        });
                        props.onChange(updated);
                    }}
                    onClose={() => setSelectedStage(null)}
                />
            );
        }
        if (selectedStage === JournalStage.Plan) {
            return <Plan onClose={() => setSelectedStage(null)} />;
        }
        if (selectedStage === JournalStage.Results) {
            return <Results sportsmen={props.journal.generalInformation.sportsmen} onClose={() => setSelectedStage(null)} />;
        }
        if (selectedStage === JournalStage.AttendanceTracking) {
            return (
                <AttendanceTrackingEdit
                    sportsman={props.journal.generalInformation.sportsmen}
                    attendanceTracking={props.journal.attendance}
                    onClose={() => setSelectedStage(null)}
                    onChange={(attendanceTracking) => {
                        const updated = produce(props.journal, (draft) => {
                            draft.attendance = attendanceTracking;
                        });
                        props.onChange(updated);
                    }}
                />
            );
        }
    }

    return <S.Root>{renderBody()}</S.Root>;
}
