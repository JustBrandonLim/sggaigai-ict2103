/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        roboto: ["'Roboto', sans-serif", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "sgg-background": "#f0f2f5",
        "sgg-orange": "#e76f51",
        "sgg-yellow": "#e9c46a",
        "sgg-green": "#264653",
        "sgg-blue": "#1890ff",
      },
    },
  },
  plugins: [],
};
