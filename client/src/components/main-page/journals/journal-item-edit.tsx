import { useState } from "react";
import * as S from "./journal-item.styled";
import { Journal } from "./journals";

type Props = {
    onClose: () => void;
    onCreate: (journal: Journal) => void;
};

// Todo: переименовать JournalItem
export function JournalCreate(props: Props) {
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [sportsTrainingStage, setSportsTrainingStage] = useState("");

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
                onClick={() =>
                    props.onCreate({
                        department,
                        name,
                        sportsTrainingStage,
                        startDate: new Date(),
                        generalInformation: { sportsmen: [] },
                    })
                }
                disabled={!name || !department || !setSportsTrainingStage}
            >
                Создать
            </button>
        </S.Root>
    );
}
