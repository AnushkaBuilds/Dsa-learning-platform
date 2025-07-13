/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-in-180': 'spin 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};