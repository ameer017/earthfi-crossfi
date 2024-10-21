/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      clipPath: {
        'sloped': 'polygon(0 0, 100% 10%, 100% 100%, 0 90%)',
      },
    },
  },
  plugins: [],
};
