/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#575757",
                dark: "#242424",
                light: "#B3B3B3",
                background: "#FFF9E7",
            },
            boxShadow: {
                DEFAULT: "3px 3px 0 #B3B3B3",
                dark: "3px 3px 0 #575757",
            },
        },
        fontFamily: {
            sans: ["Work Sans", "Helvetica", "sans-serif"],
        },
    },
    plugins: [],
};
