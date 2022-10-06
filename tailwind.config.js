/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
    },
    screens: {
      mobile: {
        min: "0px",
        max: "599px",
      },
      tablet: "600px",
      desktop: "900px",
      sm: "1000px",
      md: "1100px",
      lg: "1200px",
      xl: "1400px",
    },
    fontFamily: {
      raleway: "Raleway, Arial, sans-serif",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
