/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.js", "./index.html", "./html/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#fafafa",
        secondary: "#f2f2f2",
        accent: "#cccccc",
        accent2: "#333",
        cta: "#8F6B51",
        ctaPositive: "#198754",
        ctaNegative: "#DC3545",
      },
    },
  },
  plugins: [],
};
