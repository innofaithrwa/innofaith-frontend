/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#0d0d0d",
        pinkBrand: "#f472b6",
        blueBrand: "#3b82f6",
      },
      boxShadow: {
        glow: "0 0 12px rgba(244, 114, 182, 0.7)",
      },
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
}
