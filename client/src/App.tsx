import { Navigate, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./components/auth/register-page";
import { createGlobalStyle } from "styled-components";
import { LoginPage } from "./components/auth/login-page";
import { ProfilePage } from "./components/auth/profile-page";
import { PrivateRoute } from "./nav/protected-route";
import { MainPage } from "./components/main-page/main-page";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        /* border: 1px solid orange; */
    }

    #root {
        min-height: 100vh;
        font-family: "Unbounded";
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

function App() {
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
