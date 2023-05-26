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
      },
    },
  },
  plugins: [],
};
