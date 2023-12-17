import { useState } from "react";
import { Shape } from "../shape";
import * as S from "./journal-item.styled";
import { GeneralInformation } from "./general-information";
import { Journal, Sportsman } from "./types";

type Props = {
    journal: Journal;
    onClose: () => void;
};

enum JournalStage {
    GeneralInformation = "GeneralInformation",
}

// Todo: переименовать JournalItem
export function JournalItem(props: Props) {
    const [selectedStage, setSelectedStage] = useState<JournalStage | null>(null);
    const [sportsmen, setSportsmen] = useState<Sportsman[]>(props.journal.generalInformation.sportsmen);

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
                    sportsmen={sportsmen}
                    onCreate={(x) => setSportsmen([...sportsmen, x])}
                    onClose={() => setSelectedStage(null)}
                />
            );
        }
    }

    return <S.Root>{renderBody()}</S.Root>;
}
