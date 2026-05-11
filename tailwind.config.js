/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-absolute": "#000000",
        surface: "#1b3a4b",
        "text-primary": "#ffffff",
        "text-muted": "#8a9ba8",
        "emerald-accent": "#006466",
        "deep-accent": "#4d194d",
      },
      fontFamily: {
        sans: ["'Open Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Roboto Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

