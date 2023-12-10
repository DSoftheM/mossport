import { PropsWithChildren } from "react";
import { IndexRouteProps, Navigate, Outlet, Route, RouteProps } from "react-router-dom";

export function PrivateRoute() {
    const auth = document.cookie;

    return auth ? <Outlet /> : <Navigate to="/login" />;
}
