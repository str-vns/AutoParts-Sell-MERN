/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}",
  './pages/**/*.{html,js,jsx}',
  './Components/**/*.{html,js,jsx}',],
  theme: {
  },
  plugins: [require("daisyui")],
}
