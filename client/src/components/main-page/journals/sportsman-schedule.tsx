import styled from "styled-components";
import { CloseButton } from "../../close-button";
import { Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";

type Props = {
    onClose: () => void;
};

const Root = styled.div`
    padding: 20px;
    position: relative;
`;

export function SportsmanSchedule(props: Props) {
    return (
        <Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Расписание
            </Typography>
            <DateCalendar />
        </Root>
    );
}
