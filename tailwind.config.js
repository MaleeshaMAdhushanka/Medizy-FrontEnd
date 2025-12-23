/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#03045E",
        "primary-blue": "#0305B9",
        "accent-cyan": "#40F2FF",
        "neutral-gray": "#999999",
        white: "#FFFFFF",
        black: "#000000",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
