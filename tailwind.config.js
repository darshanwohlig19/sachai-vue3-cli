/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        sourcePro: ["'Source Serif Pro Semibold'", "serif"],
        sourceSerifPro: ["Source Serif Pro"],
        "source-serif": ["Source Serif Pro", "serif"],
      },
      boxShadow: {
        "custom-red": "0 0 50px 0 #FF00530D",
      },
      fontSize: {
        "16px": "16px",
        "12px": "12px",
      },
      borderRadius: {
        customChat: "12.3px 0px 12.3px 12.3px",
        customAnswerChat: "0px 10px 10px 10px",
      },
      colors: {
        "light-gray": "#676767",
        "custom-gray": "#f7f7f4",
        "Old-Burgundy": "#3E3232",
        Secondary: "#1E0627",
        "neon-pink": "#FF0053",
        pink: {
          10: "#FF0053",
        },
        gray: {
          5: "#878787",
          10: "#5B5B5B",
          20: "#8E8E8E",
          30: "#AAAAAA",
          50: "#F5F6FA",
          80: "#8d96a0",
          100: "#EEF0F6",
          150: "#9299a0",
          200: "#DADEEC",
          250: "#808080	",
          300: "#C9D0E3",
          350: "#a4b1d5",
          400: "#B0BBD5",
          500: "#B5BED9",
          600: "#A3AED0",
          700: "#707eae",
          800: "#2D396B",
          900: "#1B2559",
        },
      },

      screens: {
        xs: "350px",
        "xs-max": { max: "350px" },
        sm: "576px",
        "sm-max": { max: "576px" },
        "sm-425": { max: "425px" },
        md: "769px",
        "md-max": { max: "768px" },
        "between-Laptop": { min: "860px", max: "1024px" },
        "between-644-1024": { min: "644px", max: "1024px" },
        lg: "992px",
        "lg-max": { max: "992px" },
        "between-lg-max-md-max": { min: "768px", max: "992px" },
        "between-md-max-sm-max": { min: "576px", max: "768px" },
        "between-xs-max-sm-max": { min: "310px", max: "577px" },

        xl: "1200px",
        "xl-max": { max: "1200px" },
        "1xl": "1024px",
        "1xl-max": { max: "1024px" },
        "2xl": "1320px",
        "2xl-max": { max: "1320px" },
        "3xl": "1600px",
        "3xl-max": { max: "1600px" },
        "4xl": "1850px",
        "4xl-max": { max: "1850px" },
      },
    },
  },
  plugins: [],
};
