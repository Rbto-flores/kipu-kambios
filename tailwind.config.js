/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",  // Asegúrate de incluir tus rutas
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    './index.html', './src/**/*.{js,jsx,ts,tsx}', './*'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
