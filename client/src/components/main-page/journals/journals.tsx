import { useState } from "react";
import * as S from "./journals.styled";
import { JournalItem } from "./journal-item";
import { JournalCreate } from "./journal-item-edit";

export type Journal = {
    name: string;
    department: string;
    sportsTrainingStage: string;
    startDate: Date;
    // Todo: endDate
    // endDate?: Date;
};

const mockJournals: Journal[] = [
    { name: "Название 1", department: "Департамент1", sportsTrainingStage: "АА", startDate: new Date() },
    { name: "Название 2", department: "Департамент2", sportsTrainingStage: "АB", startDate: new Date() },
];

function createJournal(): Journal {
    return { name: "", department: "", sportsTrainingStage: "", startDate: new Date() };
}

export function Journals() {
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
