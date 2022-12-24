module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  themes: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#EF9995",

          "secondary": "#A4CBB4",

          "accent": "#EBDC99",

          "neutral": "#5eead4",

          "base-100": "#f5f5f4",

          "info": "#2463EB",

          "success": "#16A249",

          "warning": "#DB7706",

          "error": "#DC2828",
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/forms'), require("daisyui")],
}
