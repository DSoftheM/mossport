import { Box, Button, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { months } from "./months";
import * as S from "./plan.styled";
import { useImmer } from "use-immer";
import { CreationPlan, Month, type Plan } from "./types";
import { produce } from "immer";

type Props = {
    onClose: () => void;
    plans: Plan[];
    onChange: (plans: Plan[]) => void;
};

function arePlansValid(plans: CreationPlan[]): plans is Plan[] {
    return plans.every((plan) => plan.content && plan.hoursCount && Object.values(plan.hoursDistribution).every(Boolean));
}

export function Plan(props: Props) {
    const [state, updateState] = useImmer<CreationPlan[]>(props.plans);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                План спортивной подготовки
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
                            min={1}
                            type="number"
                            value={plan.hoursCount}
                            onChange={(e) => {
                                updateState((draft) => {
                                    draft[i].hoursCount = +e.target.value;
                                });
                            }}
                        />
                        {(Object.keys(plan.hoursDistribution) as Month[]).map((month) => {
                            return (
                                <input
                                    min={1}
                                    key={month}
                                    type="number"
                                    value={plan.hoursDistribution[month]}
                                    onChange={(e) =>
                                        updateState((draft) => {
                                            draft[i].hoursDistribution[month] = +e.target.value;
                                        })
                                    }
                                />
                            );
                        })}
                    </>
                ))}
            </S.Table>
            <Box mt={1} display={"flex"} gap={1}>
                <Button
                    variant="contained"
                    color="success"
                    disabled={!arePlansValid(state)}
                    onClick={() => {
                        if (!arePlansValid(state)) return;
                        props.onChange(state);
                    }}
                >
                    Сохранить
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        const newPlan: CreationPlan = {
                            content: "",
                            hoursCount: undefined,
                            hoursDistribution: {
                                [Month.January]: undefined,
                                [Month.February]: undefined,
                                [Month.March]: undefined,
                                [Month.April]: undefined,
                                [Month.May]: undefined,
                                [Month.June]: undefined,
                                [Month.July]: undefined,
                                [Month.August]: undefined,
                                [Month.September]: undefined,
                                [Month.October]: undefined,
                                [Month.November]: undefined,
                                [Month.December]: undefined,
                            },
                            id: Date.now().toString(),
                        };
                        updateState((draft) => {
                            draft.push(newPlan);
                        });
                    }}
                >
                    Добавить
                </Button>
            </Box>
        </S.Root>
    );
}
