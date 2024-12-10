/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.js", "./index.html", "./html/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#fafafa", // Soft white
        secondary: "#f2f2f2", // Light gray
        accent: "#cccccc",
        accent2: "#333", // Muted gray
        cta: "#0D6EFD", // Blue
        ctaPositive: "#198754", // Green
        ctaNegative: "#DC3545", // Red
      },
    },
  },
  plugins: [],
};
