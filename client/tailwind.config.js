/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fkBlue: '#2874f0',
        fkYellow: '#ffe11b',
        fkGreen: '#388e3c',
        fkOrange: '#fb641b',
        fkLightOrange: '#ff9f00',
        fkBg: '#f1f3f6',
        fkTextPrimary: '#212121',
        fkTextSecondary: '#878787',
      }
    },
  },
  plugins: [],
}
