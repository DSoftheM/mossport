import { months } from "./months";
import * as S from "./plan.styled";

type Props = {
    onClose: () => void;
};

export function Plan(props: Props) {
    function renderInputs() {
        return (
            <>
                <input type="text" />
                {Array.from({ length: 13 }).map(() => (
                    <input type="number" />
                ))}
            </>
        );
    }
    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть план</button>
            <S.Table>
                <p>Содержание занятий</p>
                <p>Кол-во часов</p>
                {months.map((month) => (
                    <p>{month}</p>
                ))}
                {Array.from({ length: 19 }).map(() => renderInputs())}
            </S.Table>
        </S.Root>
    );
}
