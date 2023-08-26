/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'zinc-700': '#335533',
        'red-500': '#ef4444',

      },
      textColor: {
        'slate-300': '#CCCCCC',
      },
      borderColor: {
        'red-500': '#ef4444',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

