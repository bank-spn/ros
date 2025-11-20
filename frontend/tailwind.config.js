/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-light': '#f8f8f8',
        'background-white': '#ffffff',
        'primary': '#4f46e5', // Indigo
        'secondary': '#6b7280', // Gray
        'muted': '#f3f4f6', // Light Gray
      },
    },
  },
  plugins: [],
}
