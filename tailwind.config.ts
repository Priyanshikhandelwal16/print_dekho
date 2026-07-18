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
        primary: "#F7F5F2",
        ivory: "#F7F5F2",
        secondary: "#1B1B1B",
        charcoal: "#1B1B1B",
        accent: "#F97316",
        gold: "#C8A96A",
        cream: "#EFE8DE",
        stone: "#F3F3F3",
        muted: "#6B7280",
        surface: "#FAF9F7",
        border: "#E8E2DA",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        button: "16px",
        card: "22px",
        image: "26px",
      },
      maxWidth: {
        container: "1380px",
      },
    },
  },
  plugins: [],
};

export default config;
