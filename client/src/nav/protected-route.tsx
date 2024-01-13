import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { apiProvider } from "../provider/api-provider";
import { Nav } from "@nav";
import axios from "axios";

export function PrivateRoute() {
    const auth = document.cookie.split("=")[1];

    const navigate = useNavigate();

    function navigateToLogin() {
        navigate(Nav.login());
    }

    useEffect(() => {
        if (!auth) {
            return navigateToLogin();
        }
        console.log("set auth", auth);
        axios.defaults.headers.common.Authorization = auth;
        apiProvider.auth.getProfile().catch(navigateToLogin);
    }, []);

    return auth ? <Outlet /> : <Navigate to="/login" />;
}
