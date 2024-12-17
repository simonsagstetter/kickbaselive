import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
// import MillionLint from "@million/lint";

export default defineConfig({
    plugins: [
        // MillionLint.vite(),
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            injectRegister: "auto",
            manifest: {
                name: "Kickbase Live",
                display: "standalone",
                short_name: "Live",
                description: "Alternative web client for viewing live matchday stats of the current season",
                background_color: "#0e0f12",
                theme_color: "#0e0f12",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "pwa-maskable-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                    {
                        src: "pwa-maskable-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
                screenshots: [
                    {
                        src: "narrow.png",
                        type: "image/png",
                        sizes: "744x1618",
                        form_factor: "narrow",
                    },
                    {
                        src: "wide.jpg",
                        type: "image/jpg",
                        sizes: "3456x1812",
                        form_factor: "wide",
                    },
                ],
            },
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
            },
        }),
    ],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
