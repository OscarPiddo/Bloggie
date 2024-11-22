/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#ff5722',
      },
      spacing: {
        'sidebar': '16rem', // Width of your fixed sidebar
        'navbar': '4rem', // Navbar height
      },
    },
  },
  plugins: [],
};
