/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      borderRadius: {
        "very-small": "5px",
      },
      colors: {
        black: "#282828",
        blue: " #0095E0",
        "light-blue": "#11B3FE",
        red: "#E03F3F",
      },
    },
  },
  plugins: [],
};
