import { months } from "./months";
import * as S from "./schedule.styled";

type Props = {
    onClose: () => void;
};

export function Schedule(props: Props) {
    function renderTextAreas() {
        return Array.from({ length: 7 }).map(() => <textarea></textarea>);
    }
    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть расписание</button>
            <S.Table>
                <b>Дни/месяцы</b>
                <p>ПН</p>
                <p>ВТ</p>
                <p>СР</p>
                <p>ЧТ</p>
                <p>ПТ</p>
                <p>СБ</p>
                <p>ВС</p>
                {months.map((month) => (
                    <>
                        <p>{month}</p>
                        {renderTextAreas()}
                    </>
                ))}
            </S.Table>
            <button>Сохранить</button>
        </S.Root>
    );
}
