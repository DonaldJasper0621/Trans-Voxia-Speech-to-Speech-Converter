/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/LayoutCards.jsx",
  ],
  theme: {
    extend: {
      fontFamily:{
        Montserrat: "Montserrat"
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
