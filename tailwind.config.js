/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.js", "./index.html", "./html/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#EEEEEE",
        secondary: "#EDD7AE",
        accent: "#B18461",
        cta: "#B84901",
        ctaPositive: "#3b82f6",
      },
    },
  },
  plugins: [],
};
