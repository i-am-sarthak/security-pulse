/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0a192f",
        accent: "#64ffda",
        gray: {
          light: "#e6f1ff",
          dark: "#112240",
        },
      },
    },
  },
  plugins: [],
};
