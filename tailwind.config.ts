import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-nunito)"] },
      transitionDuration: {
        "250": "250ms",
      },
      screens: {
        xs: "425px",
      },
      keyframes: {
        "up-down": {
          "0%": { transform: "translateY(0.5rem)" },
          "50%": { transform: "translateY(-0.5rem)" },
          "100%": { transform: "translateY(0.5rem)" },
        },
        "fade-out-start-playing-screen": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "fade-in-start-playing-screen": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "hide-animation": {
          from: { display: "none" },
          to: { display: "none" },
        },
        "show-animation": {
          from: { display: "flex" },
          to: { display: "flex" },
        },
        "win-game": {
          "0%": { "background-color": "inherit" },
          "50%": { "background-color": "#d9f99d" },
          "100%": { "background-color": "inherit" },
        },
        "loose-game": {
          "0%": { "background-color": "inherit" },
          "50%": { "background-color": "#fecaca" },
          "100%": { "background-color": "inherit" },
        },
        "show-modal": {
          from: {
            transform: "translate(-50%, -50%) scale(0.5)",
            opacity: "0",
          },
          to: {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "100",
          },
        },
        "show-modal-overlay": {
          from: { opacity: "0" },
          to: { opacity: "100" },
        },
        "fade-out": {
          from: { opacity: "100" },
          to: { opacity: "0" },
        },
        "show-avatar-modal": {
          "0%": {
            opacity: "0",
          },
          "67%": {
            transform: "translate(-50%, -50%) scale(0.5)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "100",
          },
        },
        "show-avatar-modal-overlay": {
          "0%": {
            opacity: "0",
          },
          "67%": {
            opacity: "0",
          },
          "100%": {
            opacity: "100",
          },
        },
      },
      animation: {
        "up-down": "up-down 3s ease-in-out infinite",
        "show-modal": "show-modal 300ms ease-in-out forwards",
        "show-modal-overlay": "show-modal-overlay 300ms ease-in-out forwards",
        "show-avatar-modal": "show-avatar-modal 900ms ease-in-out forwards",
        "show-avatar-modal-overlay":
          "show-avatar-modal-overlay 900ms ease-in-out forwards",
        "fade-out": "fade-out 300ms ease-in-out forwards",
      },
    },
  },

  plugins: [],
};
export default config;
