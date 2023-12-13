import * as S from "./training-schedule.styled";
import { Calendar } from "@ui/calendar";

type Props = {};

export function TrainingSchedule(props: Props) {
    return (
        <S.Root>
            <S.Title>Расписание тренировок</S.Title>
            <Calendar />
        </S.Root>
    );
}
