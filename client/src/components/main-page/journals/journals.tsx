import { useState } from "react";
import * as S from "./journals.styled";
import { JournalView } from "./journal-view";
import { JournalCreate } from "./journal-create";
import { useEditJournalMutation, useGetJournalsQuery } from "../../../provider/query/use-journals-query";
import { CloseButton } from "../../close-button";

type Props = {
    onClose: () => void;
};

export function Journals(props: Props) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const getJournalsQuery = useGetJournalsQuery();
    const editJournalMutation = useEditJournalMutation();

    if (!getJournalsQuery.data) return "Загрузка...";

    if (selectedIndex !== null) {
        if (selectedIndex === getJournalsQuery.data.length) {
            return <JournalCreate onClose={() => setSelectedIndex(null)} />;
        }
        return (
            <JournalView
                journal={getJournalsQuery.data[selectedIndex]}
                onClose={() => setSelectedIndex(null)}
                onChange={editJournalMutation.mutate}
            />
        );
    }

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <S.Title>Журналы</S.Title>
            {getJournalsQuery.data.map((journal, i) => {
                return (
                    <S.JournalPlate key={i} onClick={() => setSelectedIndex(i)}>
                        <p>Название: {journal.name}</p>
                    </S.JournalPlate>
                );
            })}
            <S.JournalPlate onClick={() => setSelectedIndex(getJournalsQuery.data.length)}>Создать журнал</S.JournalPlate>
        </S.Root>
    );
}
