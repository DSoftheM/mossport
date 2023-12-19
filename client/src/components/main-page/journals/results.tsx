import * as S from "./results.styled";
import { Sportsman } from "./types";

type Props = {
    onClose: () => void;
    sportsmen: Sportsman[];
};

export function Results(props: Props) {
    return (
        <S.Root>
            <button onClick={props.onClose}>Закрыть результаты</button>
            <S.Table>
                <p style={{ gridRow: "1 / 3" }}>
                    № <br /> п/п
                </p>
                <p style={{ gridRow: "1 / 3" }}>Фамилия, имя</p>
                <p style={{ gridColumn: "3 / 5" }}>
                    ВЫПОЛНЕНИЕ ПЛАНОВЫХ ЗАДАНИЙ
                    <br />
                    по спортивному результату, разряду
                </p>
                <p>План</p>
                <p>Выполнение</p>
                {props.sportsmen.map((x, i) => (
                    <>
                        <p>{i + 1}</p>
                        <p>{x.name}</p>
                        <textarea></textarea>
                        <textarea></textarea>
                    </>
                ))}
            </S.Table>
            <button>Сохранить</button>
        </S.Root>
    );
}
