import { Button, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { months } from "./months";
import * as S from "./plan.styled";
import { useImmer } from "use-immer";
import { Plan } from "./types";

type Props = {
    onClose: () => void;
    plans: Plan[];
    onChange: (plans: Plan[]) => void;
};

export function Plan(props: Props) {
    const [state, updateState] = useImmer<Plan[]>(props.plans);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Общие сведения
            </Typography>
            <S.Table>
                <p>Содержание занятий</p>
                <p>Кол-во часов</p>
                {months.map((month) => (
                    <p>{month}</p>
                ))}
                {state.map((plan, i) => (
                    <>
                        <input
                            type="text"
                            value={plan.content}
                            onChange={(e) => {
                                updateState((draft) => {
                                    draft[i].content = e.target.value;
                                });
                            }}
                        />
                        <input
                            type="number"
                            value={plan.hoursCount}
                            onChange={(e) => {
                                updateState((draft) => {
                                    draft[i].hoursCount = +e.target.value;
                                });
                            }}
                        />
                        <input
                            type="number"
                            value={plan.hoursDistribution.april}
                            onChange={(e) =>
                                updateState((draft) => {
                                    draft[i].hoursDistribution.april = +e.target.value;
                                })
                            }
                        />
                        <input
                            type="number"
                            value={plan.hoursDistribution.august}
                            onChange={(e) =>
                                updateState((draft) => {
                                    draft[i].hoursDistribution.april = +e.target.value;
                                })
                            }
                        />
                    </>
                ))}
            </S.Table>
            <Button variant="contained">Добавить</Button>
        </S.Root>
    );
}
