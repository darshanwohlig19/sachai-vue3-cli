/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      screens: {

        "between-sm-md": { min: "640px", max: "767px" }, // Custom range

        "xl-max": { max: "1300px" }, // Custom breakpoint for max 1300px
        "lg-max": { max: "1024px" }, // Custom breakpoint for max 1024px
        "md-max": { max: "768px" }, // Custom breakpoint for max 768px
        "sm-max": { max: "750px" }, // Custom breakpoint for max 600px

      },
    },
  },
  plugins: [],
};
