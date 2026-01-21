/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light theme
        surface: "#ffffff",
        "surface-muted": "#FFFAF0",

        // Accents
        "accent-light": "#ff1d68",
        accent: "#64ffda",
        warm: "#fb9062",

        // Text
        charcoal: "#1f2933",

        // Dark theme
        navy: "#0a192f",
        gray: {
          light: "#e6f1ff",
          dark: "#112240",
        },
      },
    },


  },
  plugins: [],
};
