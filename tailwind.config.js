/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"], // Global font
        mono: ["Fira Code", "monospace"], // For code blocks
      },
      colors: {
        primary: "#0f172a",   // Dark navy
        secondary: "#38bdf8", // Sky blue
        accent: "#facc15",    // Yellow
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "hero-pattern": "url('/src/assets/hero-bg.svg')", // custom image background
      },
    },
  },
  plugins: [],
};
