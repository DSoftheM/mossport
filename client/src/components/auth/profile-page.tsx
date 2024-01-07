import { Link, useNavigate } from "react-router-dom";
import { useChangePasswordMutation, useProfileQuery } from "../../provider/query/use-profile-query";
import { Nav } from "@nav";
import { Alert, Avatar, Box, Button, Grid, Paper, TextField, Typography, keyframes } from "@mui/material";
import { useState } from "react";
import { MainHeader } from "../main-page/main-page";
import bgPath from "../main-page/bg.png";
import { motion } from "framer-motion";

export function ProfilePage() {
    const profileQuery = useProfileQuery();
    const changePasswordMutation = useChangePasswordMutation();

    const [newPassword, setNewPassword] = useState("");

    if (!profileQuery.data) return null;

    return (
        <div style={{ background: `url(${bgPath}) center / cover no-repeat`, height: "100vh" }}>
            <motion.div
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    inset: 0,
                    backgroundColor: "white",
                    zIndex: 2,
                    opacity: 1,
                }}
                animate={{
                    opacity: 0,
                }}
            ></motion.div>
            <Box
                sx={{
                    padding: "10px 80px 0",
                }}
            >
                <Box mb={5}>
                    <MainHeader />
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gridTemplateRows="auto 1fr" gap={2}>
                    <Box gridRow="span 2">
                        <Paper sx={{ height: "100%", padding: 3, borderRadius: "20px" }} elevation={2}>
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
                        <Paper elevation={2} sx={{ padding: 3, borderRadius: "20px" }}>
                            <Box display="flex" flexDirection="column" width={"fit-content"} margin={"0 auto"}>
                                <Typography variant="h4" mb={3} textAlign={"center"}>
                                    Безопасность
                                </Typography>
                                <Box display={"flex"} gap={1}>
                                    <TextField
                                        label="Новый пароль"
                                        variant="outlined"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <Button
                                        variant="contained"
                                        color="success"
                                        disabled={!newPassword}
                                        onClick={() => {
                                            changePasswordMutation.mutate(newPassword);
                                            setNewPassword("");
                                        }}
                                    >
                                        Сохранить
                                    </Button>

                                    <TextField id="outlined-basic" label="Изменить почту" variant="outlined" />
                                </Box>
                                {changePasswordMutation.isSuccess && (
                                    <Alert sx={{ marginTop: 2 }} severity="success">
                                        Пароль был изменен
                                    </Alert>
                                )}
                            </Box>
                        </Paper>
                    </Box>
                    <Box>
                        <Paper sx={{ padding: 3, height: "100%", borderRadius: "20px" }} elevation={2}>
                            xs=3
                        </Paper>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}
