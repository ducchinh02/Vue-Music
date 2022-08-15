/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#BBA5FF",
        blue: "#B9C8FF",
        black: "#393939",
        gray: "#E8EEF3",
        gray2: "#ACB8C2",
        text: "#656F77",
        yellow: "#FFC76F",
        red: "#ee6055",
        gray3: "#CDD9E3",
      },
    },
  },
  plugins: [],
};
