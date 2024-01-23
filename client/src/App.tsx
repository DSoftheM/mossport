import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RegisterPage } from "./components/auth/register-page";
import { createGlobalStyle } from "styled-components";
import { LoginPage } from "./components/auth/login-page";
import { ProfilePage } from "./components/auth/profile-page";
import { PrivateRoute } from "./nav/protected-route";
import { MainPage } from "./components/main-page/main-page";
import { Nav } from "@nav";
import { useEffect } from "react";
import axios from "axios";
import { apiProvider } from "./provider/api-provider";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        /* border: 1px solid orange; */
    }

    #root {
        font-family: "Unbounded";
        overflow: hidden;
        min-height: 100vh;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    textarea {
        resize: none;
    }

`;

function App() {
    const auth = document.cookie.split("=")[1];

    const navigate = useNavigate();

    function navigateToLogin() {
        navigate(Nav.login());
    }

    function navigateToProfile() {
        navigate(Nav.main());
    }

    useEffect(() => {
        if (auth) {
            axios.defaults.headers.common.Authorization = auth;
            apiProvider.auth.getProfile().then(navigateToProfile).catch(navigateToLogin);
        }
    }, []);
    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/main" element={<MainPage />} />
                </Route>

                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        </>
    );
}

export default App;
