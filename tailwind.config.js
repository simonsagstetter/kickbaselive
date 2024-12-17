/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["volksans", "ui-sans-serif", "system-ui", "sans-serif"],
                serif: ["volksans", "ui-serif", "serif"],
                mono: ["volksans", "ui-monospace", "monospace"],
            },
            colors: {
                kbgreen: "rgb(36, 220, 132)",
                kborange: "rgb(255, 70, 0)",
                kbdark: "rgb(14,15,18)",
                kbgold: "rgb(250, 197, 48)",
                kbred: "rgb(233, 30, 14)",
            },
            borderWidth: {
                1: "1px",
            },
            spacing: {
                8.5: "2.10rem",
                18: "4.5rem",
                22: "5.5rem",
                45: "11.25rem",
                118: "29.5rem",
                120: "30rem",
                128: "32rem",
                148: "37rem",
                174: "43.5rem",
                184: "46rem",
                "1px": "1px",
                "2px": "2px",
            },
            animation: {
                "pulse-fast": "pulse .5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "ping-fast": "ping-fast .5s cubic-bezier(0, 0, 0.2, 1) infinite",
                "ping-slow": "ping-fast 1s cubic-bezier(0, 0, 0.2, 1) infinite",
                progress: "progress 1s infinite linear",
            },
            keyframes: {
                "ping-fast": {
                    "75%, 100%": {
                        transform: "scale(1.2)",
                        opacity: "0",
                    },
                },
                progress: {
                    "0%": {
                        transform: "translateX(0) scaleX(0)",
                    },
                    "40%": {
                        transform: "translateX(0) scaleX(0.5)",
                    },
                    "100%": {
                        transform: "translateX(100%) scaleX(0.9)",
                    },
                },
            },
            fontSize: {
                xxs: "0.65rem",
            },
            skew: {
                14: "14deg",
            },
            blur: {
                1: "1px",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
        },
    },
    variants: {
        extend: {
            visibility: ["group-active-link"], // Custom variant
        },
    },
    plugins: [
        function ({ addVariant, e }) {
            addVariant("group-active-link", ({ modifySelectors, separator }) => {
                modifySelectors(({ className }) => {
                    return `.group.active-link .${e(`group-active-link${separator}${className}`)}`;
                });
            });
        },
        // eslint-disable-next-line no-undef
        require("tailwindcss-animate"),
    ],
};
