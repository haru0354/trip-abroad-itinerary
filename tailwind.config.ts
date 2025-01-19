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
        "footer-image": "url('/0-10.jpg')",
      },
      colors: {
        blog: {
          black: "rgb(75 85 99)",
          borderBlack: "rgb(107 114 128)",
          borderGray: "rgb(209 213 219)",
          hoverBlue: "rgb(219 231 245)",
          heading: "#60a5fa",
          dashboardHeading: "rgb(75 85 99)",
        },
        itinerary: {
          black: "rgb(75 85 99)",
          borderBlack: "rgb(107 114 128)",
          borderGray: "rgb(209 213 219)",
          heading: "rgb(96 165 250)",
          hoverBlue: "rgb(219 231 245)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
