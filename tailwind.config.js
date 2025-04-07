/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        space: ['"Space Grotesk"', "sans-serif"], // 🎵 Spotify-style font
      },
      colors: {
        indigo: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        // 🎨 Spotify-style colors
        "pink-spotify": "#fcdde8",
        "green-spotify": "#b8ec68",
        "blue-spotify": "#6de0f6",
        "yellow-spotify": "#fef074",
        "black-spotify": "#111111",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      },
    },
  },
  plugins: [],
}
