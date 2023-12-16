import { useState } from "react";
import * as S from "./general-information.styled";

type Props = {
    sportsmen: Sportsman[];
    onCreate: (sportsman: Sportsman) => void;
};

type SportsCategory = "1" | "2";

export type Sportsman = {
    name: string;
    birthDate: Date;
    sportsCategory: SportsCategory;
    medicalExamination: {
        first: Date;
        second: Date;
    };
    parentsFio: string;
    tel: string;
};

export function GeneralInformation(props: Props) {
    const [isCreation, setIsCreation] = useState(false);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [parentsFio, setParentsFio] = useState("");
    const [tel, setTel] = useState("");

    return (
        <div style={{ padding: 20 }}>
            <S.Table>
                <p>№</p>
                <p>Фамилия, имя</p>
                <p>Дата рождения</p>
                <p>Спортивный разряд на начало года</p>
                <S.Date>
                    <p>Дата медосмотра</p>
                    <p style={{ width: "50%", display: "inline-flex" }}>1</p>
                    <p style={{ width: "50%", display: "inline-flex" }}>2</p>
                </S.Date>
                <p>ФИО родителей</p>
                <p>Мобильный телефон</p>
                {props.sportsmen.map((sportsman, i) => (
                    <>
                        <p>{i + 1}</p>
                        <p>{sportsman.name}</p>
                        <p>{sportsman.birthDate.toLocaleDateString("ru")}</p>
                        <p>{sportsman.sportsCategory}</p>
                        <p>{sportsman.medicalExamination.first.toLocaleDateString("ru")}</p>
                        <p>{sportsman.medicalExamination.second.toLocaleDateString("ru")}</p>
                        <p>{sportsman.parentsFio}</p>
                        <p>{sportsman.tel}</p>
                    </>
                ))}
                {isCreation && (
                    <>
                        <p>{props.sportsmen.length}</p>
                        <input type="text" placeholder="Имя и фамилия" value={name} onChange={(e) => setName(e.target.value)} />
                        <input
                            type="date"
                            value={birthDate?.toLocaleDateString("ru")}
                            onChange={(e) => console.log(e.target.value)}
                        />
                        <p>Выбор Спортивный разряд на начало года</p>
                        <p>Выбор даты медосмотра</p>
                        <p>Выбор даты медосмотра</p>
                        <input
                            type="text"
                            placeholder="ФИО родителей"
                            value={parentsFio}
                            onChange={(e) => setParentsFio(e.target.value)}
                        />
                        <input type="tel" placeholder="Номер телефона" value={tel} onChange={(e) => setTel(e.target.value)} />
                    </>
                )}
            </S.Table>

            {isCreation ? (
                <button
                    onClick={() => {
                        props.onCreate({
                            birthDate: new Date(),
                            medicalExamination: { first: new Date(), second: new Date() },
                            name,
                            parentsFio,
                            sportsCategory: "1",
                            tel,
                        });
                        setIsCreation(false);
                    }}
                >
                    Сохранить
                </button>
            ) : (
                <button onClick={() => setIsCreation(true)}>Добавить спортсмена</button>
            )}
        </div>
    );
}
