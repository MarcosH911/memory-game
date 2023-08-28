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
      keyframes: {
        "up-down": {
          "0%": { transform: "translateY(0.5rem)" },
          "50%": { transform: "translateY(-0.5rem)" },
          "100%": { transform: "translateY(0.5rem)" },
        },
      },
      animation: {
        "up-down": "up-down 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: ({}) => any }) {
      addUtilities({
        ".backface-hidden": {
          "backface-visibility": "hidden",
        },
        ".animate-paused": {
          "animation-play-state": "paused",
        },
      });
    }),
  ],
};
export default config;
