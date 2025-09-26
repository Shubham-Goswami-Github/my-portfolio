/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 🌙 Dark mode using "class" strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all JS/JSX/TS/TSX files in src
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0d1b2a",     // Example primary color
        secondary: "#e16928ff",   // Example secondary color
        accent: "#12a0ecff",      // Accent color
      },
    },
  },
  plugins: [],
};
