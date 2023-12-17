import { useState } from "react";
import * as S from "./general-information.styled";
import { Dropdown } from "@ui/dropdown/dropdown";
import { getDate, getSportsCategory } from "./general-information.lib";
import { Sportsman, SportsCategory } from "./types";

type Props = {
    sportsmen: Sportsman[];
    onCreate: (sportsman: Sportsman) => void;
    onClose: () => void;
};

export function GeneralInformation(props: Props) {
    const [isCreation, setIsCreation] = useState(false);
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [parentsFio, setParentsFio] = useState("");
    const [tel, setTel] = useState("");
    const [sportsCategory, setSportsCategory] = useState<{ category: SportsCategory; id: string } | null>(null);

    return (
        <div style={{ padding: 20 }}>
            <button onClick={props.onClose}>Закрыть таблицу</button>
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
                        <p>{getSportsCategory(sportsman.sportsCategory)}</p>
                        <p>{sportsman.medicalExamination.first.toLocaleDateString("ru")}</p>
                        <p>{sportsman.medicalExamination.second.toLocaleDateString("ru")}</p>
                        <p>{sportsman.parentsFio}</p>
                        <p>{sportsman.tel}</p>
                    </>
                ))}
                {isCreation && (
                    <>
                        <p>{props.sportsmen.length + 1}</p>
                        <input type="text" placeholder="Имя и фамилия" value={name} onChange={(e) => setName(e.target.value)} />
                        <input
                            type="date"
                            value={birthDate ? getDate(birthDate) : undefined}
                            onChange={(e) => setBirthDate(new Date(e.target.value))}
                        />
                        <Dropdown
                            items={[
                                {
                                    id: "1",
                                    text: "1 спорт разряд",
                                    value: {
                                        category: SportsCategory._1,
                                        id: "1",
                                    },
                                },
                                {
                                    id: "2",
                                    text: "2 спорт разряд",
                                    value: {
                                        category: SportsCategory._2,
                                        id: "2",
                                    },
                                },
                                {
                                    id: "3",
                                    text: "3 спорт разряд",
                                    value: {
                                        category: SportsCategory._3,
                                        id: "3",
                                    },
                                },
                            ]}
                            selectedId={sportsCategory?.id}
                            onChange={(value) => setSportsCategory(value)}
                        />
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
                <div>
                    <button
                        disabled={!birthDate || !name || !parentsFio || !tel || !sportsCategory}
                        onClick={() => {
                            if (!birthDate || !sportsCategory) return;
                            props.onCreate({
                                birthDate: new Date(birthDate),
                                medicalExamination: { first: new Date(), second: new Date() },
                                name,
                                parentsFio,
                                sportsCategory: sportsCategory.category,
                                tel,
                            });
                            setIsCreation(false);
                            setName("");
                            setBirthDate(null);
                            setParentsFio("");
                            setTel("");
                            setSportsCategory(null);
                        }}
                    >
                        Сохранить
                    </button>
                    <button onClick={() => setIsCreation(false)}>Отменить</button>
                </div>
            ) : (
                <button onClick={() => setIsCreation(true)}>Добавить спортсмена</button>
            )}
        </div>
    );
}
