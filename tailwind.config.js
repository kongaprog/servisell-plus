/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",           // <--- Busca App.tsx e index.tsx (que están sueltos)
    "./components/**/*.{js,ts,jsx,tsx}", // <--- Busca en la carpeta components
    "./services/**/*.{js,ts,jsx,tsx}"    // <--- Busca en la carpeta services
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B1120',
          gold: '#00F0FF',
          light: '#1E293B',
        }
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}