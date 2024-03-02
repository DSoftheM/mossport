import { useState } from "react";
import * as S from "./general-information.styled";
import { Dropdown } from "@ui/dropdown/dropdown";
import { getDate, getSportsCategory } from "./general-information.lib";
import { Sportsman, SportsCategory } from "./types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, IconButton, Input, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { CloseButton } from "../../close-button";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useQuery } from "react-query";
import { apiProvider } from "../../../provider/api-provider";

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
    if (!sportsman.id) return false;
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
    const [id, setId] = useState("");
    const [birthDate, setBirthDate] = useState<Dayjs | null>(null);
    const [parentsFio, setParentsFio] = useState("");
    const [tel, setTel] = useState("");
    const [firstMedicalExamination, setFirstMedicalExamination] = useState<Dayjs | null>(null);
    const [secondMedicalExamination, setSecondMedicalExamination] = useState<Dayjs | null>(null);
    const [sportsCategory, setSportsCategory] = useState<SportsCategory | "">("");

    const allSportsmenQuery = useQuery({
        queryKey: "allSportsmen",
        queryFn: () => apiProvider.journals.allSportsmen(),
    });

    function resetFields() {
        setId("");
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
            id,
        };
    }

    function renderInputs() {
        return (
            <>
                {/* <input type="text" placeholder="Имя и фамилия" value={name} onChange={(e) => setName(e.target.value)} /> */}
                <Typography>{name}</Typography>
                <DatePicker label="Дата рождения" value={birthDate} onChange={(date) => setBirthDate(date)} />
                <Select
                    value={sportsCategory}
                    label="Спортивный разряд"
                    onChange={(ev) => setSportsCategory(ev.target.value as SportsCategory)}
                >
                    <MenuItem value={SportsCategory._1}>1 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory._2}>2 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory._3}>3 спортивный разряд</MenuItem>
                    <MenuItem value={SportsCategory.KMS}>КМС</MenuItem>
                    <MenuItem value={SportsCategory.MS}>МС</MenuItem>
                    <MenuItem value={SportsCategory.MSMK}>МСМК</MenuItem>
                    <MenuItem value={SportsCategory.Un1}>1 юн.</MenuItem>
                    <MenuItem value={SportsCategory.Un2}>2 юн.</MenuItem>
                    <MenuItem value={SportsCategory.Un3}>3 юн.</MenuItem>
                    <MenuItem value={SportsCategory.ZMS}>ЗМС</MenuItem>
                </Select>
                <DatePicker
                    label="Дата первого медосмотра"
                    value={firstMedicalExamination}
                    onChange={(date) => setFirstMedicalExamination(date)}
                />
                <DatePicker
                    sx={{ height: "74px" }}
                    label="Дата второго медосмотра"
                    value={secondMedicalExamination}
                    onChange={(date) => setSecondMedicalExamination(date)}
                />
                <Input
                    type="text"
                    placeholder="ФИО родителей"
                    value={parentsFio}
                    onChange={(e) => setParentsFio(e.target.value)}
                />
                <Input type="tel" placeholder="Номер телефона" value={tel} onChange={(e) => setTel(e.target.value)} />
            </>
        );
    }

    function renderActions() {
        const sportsman = getSportsman();
        if (isCreation) {
            return (
                <Box mt={2} display={"flex"} gap={1}>
                    <Button
                        variant="contained"
                        color="success"
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
                    <Button variant="contained" color="primary" onClick={() => setIsCreation(false)}>
                        Отменить
                    </Button>
                </Box>
            );
        }

        return (
            <Button sx={{ mt: 2 }} variant="contained" disabled={editIndex !== null} onClick={() => setIsCreation(true)}>
                Добавить спортсмена
            </Button>
        );
    }

    const restSportsmen = allSportsmenQuery.data?.filter((s) => !props.sportsmen.map((x) => x.id).includes(s.userId.toString()));

    return (
        <div style={{ padding: "20px 40px", position: "relative" }}>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Общие сведения
            </Typography>
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
                                    <div style={{ position: "absolute", right: "100%", top: 0, display: "flex", gap: 8 }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            disabled={!isSportsmanValid(getSportsman())}
                                            onClick={() => {
                                                setEditIndex(null);
                                                const updatedSportsman = getSportsman();
                                                if (!isSportsmanValid(updatedSportsman)) return;
                                                props.onEdit(updatedSportsman, i);
                                            }}
                                        >
                                            <CheckIcon />
                                        </Button>
                                        <Button
                                            color="error"
                                            variant="contained"
                                            onClick={() => {
                                                resetFields();
                                                setEditIndex(null);
                                            }}
                                        >
                                            <CloseIcon />
                                        </Button>
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
                                <IconButton
                                    style={{ position: "absolute", right: "100%", top: "50%", transform: "translateY(-50%)" }}
                                    disabled={editIndex !== null || isCreation}
                                    onClick={() => {
                                        const { birthDate, medicalExamination, name, parentsFio, sportsCategory, tel, id } =
                                            sportsman;
                                        setEditIndex(i);
                                        setTel(tel);
                                        setId(id);
                                        setName(name);
                                        setParentsFio(parentsFio);
                                        setBirthDate(dateToDayjs(birthDate));
                                        setSportsCategory(sportsCategory);
                                        setFirstMedicalExamination(dateToDayjs(medicalExamination.first));
                                        setSecondMedicalExamination(dateToDayjs(medicalExamination.second));
                                    }}
                                >
                                    <CreateIcon />
                                </IconButton>
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
            {isCreation && allSportsmenQuery.data && restSportsmen?.length && (
                <>
                    <Select
                        onChange={(e) => {
                            const sportsmanId = e.target.value;
                            const sportsman = allSportsmenQuery.data.find((x) => x.userId === sportsmanId);
                            const str =
                                (sportsman?.name ?? "") + " " + (sportsman?.surname ?? "") + " " + (sportsman?.patronymic ?? "");
                            setName(str);
                            setId(sportsman?.userId.toString() ?? "");
                        }}
                    >
                        {restSportsmen.map((sportsman) => (
                            <MenuItem key={sportsman.userId} value={sportsman.userId}>
                                {sportsman.name} {sportsman.patronymic} {sportsman.surname}
                            </MenuItem>
                        ))}
                    </Select>
                </>
            )}

            {renderActions()}
        </div>
    );
}
