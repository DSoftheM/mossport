import { Link, useNavigate } from "react-router-dom";
import { useProfileQuery } from "../../provider/query/use-profile-query";
import { Nav } from "@nav";
import { Avatar, Box, Button, Grid, Paper, TextField, Typography, keyframes } from "@mui/material";

const fade = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

export function ProfilePage() {
    const profileQuery = useProfileQuery();

    if (!profileQuery.data) return null;

    return (
        <Box padding={10} sx={{ animation: `${fade} 1s ease 0s 1` }}>
            <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={2}>
                <Box gridRow="span 2">
                    <Paper sx={{ height: "100%", padding: 3 }} elevation={2}>
                        <Box display="flex" flexDirection="column" alignItems={"center"}>
                            <Avatar
                                sx={{ width: 300, height: 300 }}
                                src="https://sun9-45.userapi.com/impg/FzoC5aeURBsweEUmJ4-rR7QLVEWEFyp4D4CvLw/9sQSuS__5_c.jpg?size=600x400&quality=96&sign=a9d3f1bde0c5b240653561790746382b&c_uniq_tag=yoZ0_jxbnXmtxtGk-7tWR6aMn_pDhZ768s-qQYe1CYo&type=album"
                            />
                            <Typography variant="h3" component="h3" mb={3}>
                                Мой профиль
                            </Typography>
                            <Box>
                                <Typography>
                                    ФИО: {profileQuery.data.surname} {profileQuery.data.name} {profileQuery.data.patronymic}
                                </Typography>
                                <Typography>Телефон: {profileQuery.data.tel}</Typography>
                                <Typography>Почта: {profileQuery.data.email}</Typography>
                                <Typography>Роль: {JSON.stringify(profileQuery.data.roles)}</Typography>
                                <Link to={Nav.main()}>Перейти на главную</Link>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={2} sx={{ padding: 3 }}>
                        <Box display="flex" flexDirection="column" alignItems={"center"}>
                            <Typography variant="h4" mb={3}>
                                Безопасность
                            </Typography>
                            <Box display={"flex"} gap={1}>
                                <TextField label="Новый пароль" variant="outlined" type="password" />
                                <Button variant="contained" color="success">
                                    Сохранить
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
                <Box>
                    <Paper elevation={2}>xs=3</Paper>
                </Box>
            </Box>
        </Box>
        // <div>
        //     <p>Роль = {JSON.stringify(profileQuery.data.roles)}</p>
        //
        // </div>
    );
}
