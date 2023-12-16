import { useState } from "react";
import { Shape } from "../shape";
import * as S from "./journal-item.styled";
import { Journal } from "./journals";
import { GeneralInformation, Sportsman } from "./general-information";

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
    const [sportsmen, setSportsmen] = useState<Sportsman[]>([
        {
            birthDate: new Date(),
            medicalExamination: { first: new Date(), second: new Date() },
            name: "имя фамилия",
            parentsFio: "ФИО родителей",
            sportsCategory: "1",
            tel: "98876985765876",
        },
    ]);

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
