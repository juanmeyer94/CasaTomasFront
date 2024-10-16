/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {},
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Aquí puedes agregar el código para ocultar las flechas en los inputs tipo number
    function ({ addUtilities }) {
      addUtilities({
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button': {
          appearance: 'none',
          margin: 0,
        },
        'input[type="number"]': {
          '-moz-appearance': 'textfield', // Firefox
        },
      });
    },
  ],
};

