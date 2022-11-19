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
        "sgg-orange": "#cc715a",
        "sgg-yellow": "#c99F38",
        "sgg-green": "#264653",
        "sgg-blue": "#1890ff",
        "sgg-black": "#262626",
        "sgg-gray": "#8c8c8c",
        "sgg-brown": "#a77e5a",
      },
    },
  },
  plugins: [],
};
