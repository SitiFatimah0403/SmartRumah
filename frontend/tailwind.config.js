/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#10B981",
        "background-light": "#f6f6f8",
        "background-dark": "#0A0F1A",
        "card-dark": "#161E2D",
        "surface-dark": "#161E2D",
        "navy-accent": "#1E293B",
        "navy-700": "#1E293B",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
