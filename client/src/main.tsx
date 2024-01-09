import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ThemeProvider, createTheme } from "@mui/material";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

axios.defaults.headers.common.Authorization = document.cookie.split("=")[1];

const theme = createTheme({
    typography: {
        fontFamily: ["Unbounded"].join(","),
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </LocalizationProvider>
        </BrowserRouter>
    </QueryClientProvider>
);
