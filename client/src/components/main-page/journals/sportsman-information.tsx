import * as S from "./schedule.styled";
import { Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useQuery } from "react-query";
import { apiProvider } from "../../../provider/api-provider";
import { useProfileQuery } from "../../../provider/query/use-profile-query";
import { translateSchool } from "../../auth/register-page";

type Props = {
    onClose: () => void;
};

export function SportsmanInformation(props: Props) {
    const profileQuery = useProfileQuery();
    const coachId = profileQuery.data?.coachId;

    const getCoachByIdQuery = useQuery({
        queryKey: "getCoachById",
        queryFn: () => (coachId !== undefined ? apiProvider.auth.getCoachById(coachId) : undefined),
        enabled: coachId !== undefined,
    });
    const coach = getCoachByIdQuery.data;

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Информация
            </Typography>

            {coach && coach.sportSchool && (
                <>
                    <p>Спортшкола: {translateSchool(coach.sportSchool)}</p>
                    <p>
                        Тренер: {coach.name} {coach.surname} {coach.patronymic}
                    </p>
                </>
            )}
        </S.Root>
    );
}
