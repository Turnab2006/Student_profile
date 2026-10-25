/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
      },
      colors: {
        primary: "#4CAF82",
        "primary-light": "#e8f5ee",
        "student-primary": "#2384FD",
        "student-light": "#E7EFFE",
      },
    },
  },
  plugins: [],
};

