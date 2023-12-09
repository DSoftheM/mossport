import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./components/auth/register-page";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        border: 1px solid orange;
    }

    #root {
        height: 100vh;
        font-family: "Unbounded";
    }
`;

// React - фронтенд
// Nest - бекэнд
// Комментарий
function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </>
    );
}

export default App;
