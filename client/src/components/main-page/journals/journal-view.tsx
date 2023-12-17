import { useState } from "react";
import { Shape } from "../shape";
import * as S from "./journal-view.styled";
import { GeneralInformation } from "./general-information";
import { Journal, Sportsman } from "./types";
import { produce } from "immer";

type Props = {
    journal: Journal;
    onClose: () => void;
    onChange: (journal: Journal) => void;
};

enum JournalStage {
    GeneralInformation = "GeneralInformation",
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
                        <Shape
                            shape="rectangle"
                            onClick={() => setSelectedStage(JournalStage.GeneralInformation)}
                            title="Общие сведения"
                        />
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
                    onClose={() => setSelectedStage(null)}
                />
            );
        }
    }

    return <S.Root>{renderBody()}</S.Root>;
}
