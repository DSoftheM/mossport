import { useState } from "react";
import * as S from "./journals.styled";
import { JournalItem } from "./journal-item";
import { JournalCreate } from "./journal-item-edit";
import { Journal, SportsCategory } from "./types";

const mockJournals: Journal[] = [
    {
        name: "Название 1",
        department: "Департамент1",
        sportsTrainingStage: "АА",
        startDate: new Date(),
        generalInformation: {
            sportsmen: [
                {
                    birthDate: new Date(),
                    medicalExamination: { first: new Date(), second: new Date() },
                    name: "имя фамилия",
                    parentsFio: "ФИО родителей",
                    sportsCategory: SportsCategory.GR,
                    tel: "98876985765876",
                },
            ],
        },
    },
    {
        name: "Название 2",
        department: "Департамент2",
        sportsTrainingStage: "АB",
        startDate: new Date(),
        generalInformation: {
            sportsmen: [],
        },
    },
];

type Props = {
    onClose: () => void;
};

export function Journals(props: Props) {
    const [journals, setJournals] = useState<Journal[]>(mockJournals);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    if (selectedIndex !== null) {
        if (selectedIndex === journals.length) {
            return (
                <JournalCreate
                    onClose={() => setSelectedIndex(null)}
                    onCreate={(journal) => {
                        setJournals([...journals, journal]);
                        setSelectedIndex(null);
                    }}
                />
            );
        }
        return <JournalItem journal={journals[selectedIndex]} onClose={() => setSelectedIndex(null)} />;
    }

    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть журналы</button>
            <S.Title>Журналы</S.Title>
            {journals.map((journal, i) => {
                return (
                    <S.JournalPlate onClick={() => setSelectedIndex(i)}>
                        <p>Название: {journal.name}</p>
                    </S.JournalPlate>
                );
            })}
            <S.JournalPlate onClick={() => setSelectedIndex(journals.length)}>Создать журнал</S.JournalPlate>
        </S.Root>
    );
}
