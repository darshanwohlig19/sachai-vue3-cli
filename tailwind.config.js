/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      screens: {
        xs: "350px",
        "xs-max": { max: "350px" },
        sm: "576px",
        "sm-max": { max: "750px" },
        md: "768px",
        "md-max": { max: "768px" },
        lg: "992px",
        "lg-max": { max: "1024px" },
        xl: "1200px",
        "xl-max": { max: "1300px" },
        "1xl": "1024px",
        "1xl-max": { max: "1024px" },
        "2xl": "1320px",
        "2xl-max": { max: "1320px" },
        "3xl": "1600px",
        "3xl-max": { max: "1600px" },
        "4xl": "1850px",
        "4xl-max": { max: "1850px" },
        "between-sm-md": { min: "640px", max: "767px" },
      },
    },
  },
  plugins: [],
};
