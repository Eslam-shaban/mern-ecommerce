import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // Ensures Tailwind scans JSX files
    ],
    theme: {
        extend: {
            fontFamily: {
                inter: ["Inter", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },
            keyframes: {
                'left-right': {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '50%': { transform: 'translateX(8px)' }, // adjust the distance as needed
                },
            },
            animation: {
                'left-right': 'left-right 0.8s ease-in-out infinite',
            },
        },
    },
    plugins: [daisyui], // Correct way to add DaisyUI
    daisyui: {
        themes: ["light", "dark"], // Add or modify themes here
    },
};
