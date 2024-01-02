import { useState } from "react";
import * as S from "./general-information.styled";
import { Dropdown } from "@ui/dropdown/dropdown";
import { getDate, getSportsCategory } from "./general-information.lib";
import { Sportsman, SportsCategory } from "./types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Button, MenuItem, Select } from "@mui/material";
import React from "react";

type Props = {
    sportsmen: Sportsman[];
    onCreate: (sportsman: Sportsman) => void;
    onEdit: (sportsman: Sportsman, index: number) => void;
    onClose: () => void;
};

function isSportsmanValid(sportsman: DeepNullish<Sportsman>): sportsman is Sportsman {
    if (!sportsman.name) return false;
    if (!sportsman.birthDate) return false;
    if (!sportsman.medicalExamination) return false;
    if (!sportsman.medicalExamination.first) return false;
    if (!sportsman.medicalExamination.second) return false;
    if (!sportsman.parentsFio) return false;
    if (!sportsman.tel) return false;
    return true;
}

type DeepNullish<T> = {
    [K in keyof T]?: T[K] extends object
        ? DeepNullish<T[K]> | null | undefined
        : T[K] extends string
        ? T[K] | null | undefined | ""
        : T[K] | null | undefined;
};

function dateToDayjs(date: Date): Dayjs {
    return dayjs(date);
}

export function GeneralInformation(props: Props) {
    const [isCreation, setIsCreation] = useState(false);

    const [editIndex, setEditIndex] = useState<number | null>(null);

    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [parentsFio, setParentsFio] = useState("");
    const [tel, setTel] = useState("");
    const [firstMedicalExamination, setFirstMedicalExamination] = useState<Dayjs | null>(null);
    const [secondMedicalExamination, setSecondMedicalExamination] = useState<Dayjs | null>(null);
    const [sportsCategory, setSportsCategory] = useState<SportsCategory | "">("");

    function resetFields() {
        setTel("");
        setName("");
        setParentsFio("");
        setBirthDate(null);
        setSportsCategory("");
        setFirstMedicalExamination(null);
        setSecondMedicalExamination(null);
    }

    function getSportsman(): DeepNullish<Sportsman> {
        return {
            birthDate,
            medicalExamination: { first: firstMedicalExamination, second: secondMedicalExamination },
            name,
            parentsFio,
            sportsCategory,
            tel,
        };
    }

    function renderInputs() {
        return (
            <>
                <input type="text" placeholder="Имя и фамилия" value={name} onChange={(e) => setName(e.target.value)} />
                <DatePicker label="Дата рождения" value={birthDate} onChange={(date) => setBirthDate(date)} />
                <Select
                    value={sportsCategory}
                    label="Спортивный разряд"
                    onChange={(ev) => setSportsCategory(ev.target.value as SportsCategory)}
                >
                    <MenuItem value={SportsCategory._1}>1 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory._2}>2 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory._3}>3 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory.GR}>GR</MenuItem>
                    <MenuItem value={SportsCategory.KMS}>KMS</MenuItem>
                    <MenuItem value={SportsCategory.MS}>MS</MenuItem>
                    <MenuItem value={SportsCategory.MSMK}>MSMK</MenuItem>
                    <MenuItem value={SportsCategory.Un1}>Un1</MenuItem>
                    <MenuItem value={SportsCategory.Un2}>Un2</MenuItem>
                    <MenuItem value={SportsCategory.Un3}>Un3</MenuItem>
                    <MenuItem value={SportsCategory.ZMS}>ZMS</MenuItem>
                </Select>
                <DatePicker
                    label="Дата первого медосмотра"
                    value={firstMedicalExamination}
                    onChange={(date) => setFirstMedicalExamination(date)}
                />
                <DatePicker
                    label="Дата второго медосмотра"
                    value={secondMedicalExamination}
                    onChange={(date) => setSecondMedicalExamination(date)}
                />
                <input
                    type="text"
                    placeholder="ФИО родителей"
                    value={parentsFio}
                    onChange={(e) => setParentsFio(e.target.value)}
                />
                <input type="tel" placeholder="Номер телефона" value={tel} onChange={(e) => setTel(e.target.value)} />
            </>
        );
    }

    function renderActions() {
        const sportsman = getSportsman();
        if (isCreation) {
            return (
                <div>
                    <Button
                        disabled={!isSportsmanValid(sportsman)}
                        onClick={() => {
                            if (!isSportsmanValid(sportsman)) return;
                            props.onCreate(sportsman);
                            resetFields();
                            setIsCreation(false);
                        }}
                    >
                        Сохранить
                    </Button>
                    <button onClick={() => setIsCreation(false)}>Отменить</button>
                </div>
            );
        }

        return (
            <button disabled={editIndex !== null} onClick={() => setIsCreation(true)}>
                Добавить спортсмена
            </button>
        );
    }

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
                {props.sportsmen.map((sportsman, i) => {
                    if (i === editIndex) {
                        return (
                            <React.Fragment key={i}>
                                <div style={{ position: "relative" }}>
                                    {i + 1}
                                    <div style={{ position: "absolute", left: "-130px", top: 0 }}>
                                        <Button
                                            disabled={!isSportsmanValid(getSportsman())}
                                            onClick={() => {
                                                setEditIndex(null);
                                                const updatedSportsman = getSportsman();
                                                if (!isSportsmanValid(updatedSportsman)) return;
                                                props.onEdit(updatedSportsman, i);
                                            }}
                                        >
                                            Сохранить
                                        </Button>
                                        <button
                                            onClick={() => {
                                                resetFields();
                                                setEditIndex(null);
                                            }}
                                        >
                                            Отмена
                                        </button>
                                    </div>
                                </div>
                                {renderInputs()}
                            </React.Fragment>
                        );
                    }
                    return (
                        <React.Fragment key={i}>
                            <p style={{ position: "relative" }}>
                                {i + 1}
                                <button
                                    style={{ position: "absolute", left: "-100px", top: 0 }}
                                    disabled={editIndex !== null || isCreation}
                                    onClick={() => {
                                        const { birthDate, medicalExamination, name, parentsFio, sportsCategory, tel } =
                                            sportsman;
                                        setEditIndex(i);
                                        setTel(tel);
                                        setName(name);
                                        setParentsFio(parentsFio);
                                        setBirthDate(dateToDayjs(birthDate));
                                        setSportsCategory(sportsCategory);
                                        setFirstMedicalExamination(dateToDayjs(medicalExamination.first));
                                        setSecondMedicalExamination(dateToDayjs(medicalExamination.second));
                                    }}
                                >
                                    Редактировать
                                </button>
                            </p>
                            <p>{sportsman.name}</p>
                            <p>{sportsman.birthDate.toLocaleDateString("ru")}</p>
                            <p>{getSportsCategory(sportsman.sportsCategory)}</p>
                            <p>{sportsman.medicalExamination.first.toLocaleDateString("ru")}</p>
                            <p>{sportsman.medicalExamination.second.toLocaleDateString("ru")}</p>
                            <p>{sportsman.parentsFio}</p>
                            <p>{sportsman.tel}</p>
                        </React.Fragment>
                    );
                })}
                {isCreation && (
                    <>
                        <p>{props.sportsmen.length + 1}</p>
                        {renderInputs()}
                    </>
                )}
            </S.Table>

            {renderActions()}
        </div>
    );
}
