import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "var(--primary)",
        primary50: "var(--primary50)",
        black: "var(--black)",
        black75: "var(--black75)",
        black50: "var(--black50)",
        black25: "var(--black25)",
        white: "var(--white)",
        white98: "var(--white98)",
        white97: "var(--white97)",
      },
    },
  },
  plugins: [],
};

export default config;
