import { Alert, Box, Button, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import * as S from "./results.styled";
import { Result, Sportsman } from "./types";
import { useRef } from "react";
import { useImmer } from "use-immer";

type Props = {
    onClose: () => void;
    onChange: (results: Result[]) => void;
    sportsmen: Sportsman[];
    results: Result[];
};

export function Results(props: Props) {
    const isChanged = useRef(false);
    const isSaved = useRef(false);
    const [state, updateState] = useImmer<Result[]>(props.results);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Итоги
            </Typography>
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
                {props.sportsmen.map((sportsman, i) => (
                    <>
                        <p>{i + 1}</p>
                        <p>{sportsman.name}</p>
                        <textarea
                            value={state[i]?.plan ?? ""}
                            onChange={(e) => {
                                isChanged.current = true;
                                const text = e.target.value;
                                updateState((draft) => {
                                    if (!draft[i]) {
                                        draft[i] = { accomplishment: "", plan: "", sportsman: props.sportsmen[i] };
                                    }
                                    draft[i].plan = text;
                                });
                            }}
                        ></textarea>
                        <textarea
                            onChange={(e) => {
                                isChanged.current = true;
                                const text = e.target.value;
                                updateState((draft) => {
                                    if (!draft[i]) {
                                        draft[i] = { accomplishment: "", plan: "", sportsman: props.sportsmen[i] };
                                    }
                                    draft[i].accomplishment = text;
                                });
                            }}
                            value={state[i]?.accomplishment ?? ""}
                        ></textarea>
                    </>
                ))}
            </S.Table>
            <Box display={"flex"} gap={1} mt={2}>
                <Button
                    variant="contained"
                    color="success"
                    disabled={!isChanged.current}
                    onClick={() => {
                        isSaved.current = true;
                        props.onChange(state);
                    }}
                >
                    Сохранить
                </Button>
                {isSaved.current && <Alert severity="success">Сохранено!</Alert>}
            </Box>
        </S.Root>
    );
}
