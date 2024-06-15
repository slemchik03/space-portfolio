import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "bg-pulse-slow": {
          "50%": {
            opacity: "0.9",
          },
          "0%, 100%": {
            opacity: "1",
          },
        },
        "spin-slow": {
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "animated-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      },
      animation: {
        "bg-pulse-slow": "bg-pulse-slow 0.9s linear infinite",
        "spin-slow": "spin 10s linear infinite",
        "animated-gradient": "animated-gradient 6s ease infinite alternate",
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};
export default config;
