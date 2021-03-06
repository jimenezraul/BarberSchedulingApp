/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.slate,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.amber,
      green: colors.green,
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
