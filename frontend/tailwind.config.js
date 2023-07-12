/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: "#E2E9D9",
        secondary: "#EB5174",
        tertiary: "#AAAAAA",
        gray: {
          400: "#171717",
          300: "#1E1E1E",
          200: "#222222",
          100: "#6C6C6C",
          50: "#848484",
        },
      },
    },
  },
  keyframes: {
    slowfade: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    slideup: {
      from: { opacity: 0, transform: "translateY(25%)" },
      to: { opacity: 1, transform: "none" },
    },
    slidedown: {
      from: { opacity: 0, transform: "translateY(-25%)" },
      to: { opacity: 1, transform: "none" },
    },
    slideleft: {
      from: { opacity: 0, transform: "translateX(-20px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    slideright: {
      from: { opacity: 0, transform: "translateX(20px)" },
      to: { opacity: 1, transform: "translateX(0)" },
    },
    wave: {
      "0%": { transform: "scale(0)" },
      "50%": { transform: "scale(1)" },
      "100%": { transform: "scale(0)" },
    },
  },

  screens: {
    xs: "480px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [],
};
