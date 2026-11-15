import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hotel: {
          950: "#090D10",
          900: "#10161C",
          850: "#161E26",
          800: "#1F2B36",
          700: "#304050",
          600: "#4B5F73",
          500: "#6B7F96",
          400: "#94A5B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
          paper: "#FAF8F5",
          stone: "#F3EFEA",
        },
        gold: {
          100: "#F9F6F0",
          200: "#F2EBDE",
          300: "#E4D5BE",
          400: "#D3BE99",
          500: "#BEA16D", // Refined champagne bronze
          600: "#A38650",
          700: "#836938",
          800: "#644F29",
          900: "#44351B",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      letterSpacing: {
        widest: ".25em",
        extrawide: ".35em",
      },
    },
  },
  plugins: [],
};
export default config;
