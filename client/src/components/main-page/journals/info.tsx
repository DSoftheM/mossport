import * as S from "./schedule.styled";
import { Box, Typography } from "@mui/material";
import { CloseButton } from "../../close-button";
import { useProfileQuery } from "../../../provider/query/use-profile-query";
import { SchoolsInfo, getDefaultSchoolInfo } from "./info-data";
import { SportSchool } from "../../auth/register-page";

type Props = {
    onClose: () => void;
};

function getSchoolInfo(sportSchool: SportSchool | undefined) {
    if (!sportSchool) return getDefaultSchoolInfo();
    const info = SchoolsInfo[sportSchool];
    if (!info) return getDefaultSchoolInfo();
    return info;
}

export function Info(props: Props) {
    const profileQuery = useProfileQuery();
    if (!profileQuery.data) return null;

    const schoolInfo = getSchoolInfo(profileQuery.data.sportSchool);

    return (
        <S.Root>
            <CloseButton onClose={props.onClose} />
            <Typography variant="h3" sx={{ textAlign: "center" }} mb={2}>
                Информация об учреждении
            </Typography>
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Образовательное учреждение</Typography>
                <Typography>{schoolInfo.name}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Филиал</Typography>
                <Typography>{schoolInfo.branch}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Адрес филиала</Typography>
                <Typography>{schoolInfo.branchAddress}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Время работы</Typography>
                <Typography>{schoolInfo.workingHours}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Телефон</Typography>
                <Typography>{schoolInfo.phone}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Сайт школы</Typography>
                <Typography>{schoolInfo.cite}</Typography>
            </Box>
            <hr style={{ margin: "20px 0" }} />
            <Box display={"flex"}>
                <Typography flexBasis={"300px"}>Электронная почта школы</Typography>
                <Typography>{schoolInfo.email}</Typography>
            </Box>
        </S.Root>
    );
}
