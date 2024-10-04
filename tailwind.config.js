/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "swiggy-orange": "#ff5200",
        "swiggy-orange-dark": "#d34400",
      },
    },
  },
  plugins: [],
};
