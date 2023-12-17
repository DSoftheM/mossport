import { useState } from "react";
import { Shape } from "../shape";
import * as S from "./journal-item.styled";
import { Journal } from "./journals";
import { GeneralInformation, SportsCategory, Sportsman } from "./general-information";

type Props = {
    journal: Journal;
    onClose: () => void;
};

enum JournalStage {
    GeneralInformation = "GeneralInformation",
}

// Todo: переименовать JournalItem
export function JournalItem(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState<JournalStage | null>(null);
    const [sportsmen, setSportsmen] = useState<Sportsman[]>(props.journal.generalInformation.sportsmen);

    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть журнал</button>
            <S.Title>{props.journal.name}</S.Title>
            <p>Отделение: {props.journal.department}</p>
            <p>Этап спортивной подготовки: {props.journal.sportsTrainingStage}</p>
            <p>Начат: {props.journal.startDate.toLocaleDateString("ru")}</p>
            <S.Shapes>
                <Shape
                    shape="rectangle"
                    onClick={() => setSelectedIndex(JournalStage.GeneralInformation)}
                    onClose={() => setSelectedIndex(null)}
                    opened={selectedIndex === JournalStage.GeneralInformation}
                    title="Общие сведения"
                    renderExpandedContent={() => (
                        <GeneralInformation sportsmen={sportsmen} onCreate={(x) => setSportsmen([...sportsmen, x])} />
                    )}
                />
            </S.Shapes>
        </S.Root>
    );
}
