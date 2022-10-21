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
        "sgg-orange": "#CC715A",
        "sgg-yellow": "#C99F38",
        "sgg-green": "#264653",
        "sgg-blue": "#1890ff",
        "sgg-black": "#363636",
      },
    },
  },
  plugins: [],
};
