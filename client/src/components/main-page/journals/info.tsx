import * as S from "./schedule.styled";
import { Box, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";

type Props = {
    onClose: () => void;
};

export function Info(props: Props) {
    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Информация об учреждении
            </Typography>
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Образовательное учреждение</Typography>
                <Typography>Государственное бюджетное общеобразовательное учреждение города Москвы "Школа № 1542"</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Филиал</Typography>
                <Typography>ШК №5</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Адрес филиала</Typography>
                <Typography>
                    Западный административный округ, муниципальный округ Солнцево, город Москва, улица Авиаторов, дом 8, корпус 2
                </Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Время работы</Typography>
                <Typography>08:00-19:00</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Телефон</Typography>
                <Typography>(495) 934-87-32</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Сайт школы</Typography>
                <Typography>gym1542.mskobr.ru</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Электронная почта школы</Typography>
                <Typography>1542@edu.mos.ru</Typography>
            </Box>
        </S.Root>
    );
}
