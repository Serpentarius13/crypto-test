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
        "white-gray": "#E3EBEF",
        "white-grayish": " #EAF1F7",
        "blueish-gray": "#80A2B6",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [],
};
