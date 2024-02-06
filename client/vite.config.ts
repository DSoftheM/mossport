import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@nav": path.resolve(__dirname, "./src/nav"),
            "@ui": path.resolve(__dirname, "./src/ui"),
            "@shared": path.resolve(__dirname, "../shared/"),
        },
    },
});
