/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

    
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
    },
    extend: {
      screens: {
        "2xl": "1320px",
      },
      fontFamily: {
        sans: ['"Bricolage Grotesque"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#4770FF",
        dark: "#1A1F2C",
        "dark-2": "#0E1018",
        light: "#F0F2F5",
        muted: "#576076",
      },
      aspectRatio: {
        "6/4": "6 / 4",
      },
      animation: {
        "infinite-scroll": "scroll 10s linear infinite",
        "scrollY": "scrollY 10s linear infinite",
        'spin-slow': 'spin 10s linear infinite',
        'spin-very-slow': 'spin 90s linear infinite',
      },
      keyframes: { 
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 1.5rem))" },
        },
        scrollY: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - 1rem))" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      rotate: {
        'y-180': '180deg',
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        hidden: 'hidden',
      },
    },
  },
  plugins: [
    require("preline/plugin"),
    require("@tailwindcss/typography")
  ],
  
};
