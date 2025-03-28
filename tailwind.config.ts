/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/tailwind.css",
    "./src/assets/styles/index.css",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        // padding: "1rem",
        screens: {
          sm: "610px",
          md: "738px",
          lg: "990px",
          xl: "1250px",
          "2xl": "1500px",
        },
      },
      colors: {
        "border-red": "red",

        border: {
          DEFAULT: "hsl(var(--border))",
          light: "hsl(var(--border-light))",
          dark: "hsl(var(--border-dark))",
        },
        input: {
          DEFAULT: "hsl(var(--input))",
          light: "hsl(var(--input-light))",
          dark: "hsl(var(--input-dark))",
        },
        ring: {
          DEFAULT: "hsl(var(--ring))",
          light: "hsl(var(--ring-light))",
          dark: "hsl(var(--ring-dark))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          light: "hsl(var(--background-light))",
          dark: "hsl(var(--background-dark))",
        },
        heading: {
          DEFAULT: "hsl(var(--heading), <alpha-value>)",
          light: "hsl(var(--heading-light), <alpha-value>)",
          dark: "hsl(var(--heading-dark), <alpha-value>)",
        },
        text: {
          DEFAULT: "hsl(var(--text), <alpha-value> )",
          light: "hsl(var(--text-light), <alpha-value> )",
          dark: "hsl(var(--text-dark), <alpha-value> )",
        },
        accent: {
          DEFAULT: "hsl(var(--accent), <alpha-value> )",
          light: "hsl(var(--accent-light), <alpha-value> )",
          dark: "hsl(var(--accent-dark), <alpha-value> )",
        },
        primary: {
          DEFAULT: "hsl(var(--primary), <alpha-value> )",
          light: "hsl(var(--primary-light), <alpha-value> )",
          dark: "hsl(var(--primary-dark), <alpha-value> )",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary), <alpha-value> )",
          light: "hsl(var(--secondary-light), <alpha-value> )",
          dark: "hsl(var(--secondary-dark), <alpha-value> )",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive), <alpha-value> )",
          light: "hsl(var(--destructive-light), <alpha-value> )",
          dark: "hsl(var(--destructive-dark), <alpha-value> )",
        },
        muted: {
          DEFAULT: "hsl(var(--muted), <alpha-value> )",
          light: "hsl(var(--muted-light), <alpha-value> )",
          dark: "hsl(var(--muted-dark), <alpha-value> )",
        },
        "model-overlay": {
          DEFAULT: "hsl(var(--model-overlay), <alpha-value> )",
          light: "hsl(var(--model-overlay-light), <alpha-value> )",
          dark: "hsl(var(--model-overlay-dark), <alpha-value> )",
        },
        card: {
          DEFAULT: "hsl(var(--card), <alpha-value> )",
          light: "hsl(var(--card-light), <alpha-value> )",
          dark: "hsl(var(--card-dark), <alpha-value> )",
        },
        tooltip: {
          DEFAULT: "hsl(var(--tooltip), <alpha-value> )",
          light: "hsl(var(--tooltip-light), <alpha-value> )",
          dark: "hsl(var(--tooltip-dark), <alpha-value> )",
        },
      },
      screens: {
        site: "1500px",
      },
      spacing: {
        "space-available": "-webkit-fill-available",
      },
      // fontFamily: {
      //   inter: ["inter"],
      //   epilogue: ["Epilogue"],
      // },
      fontFamily: {
        inter: ["inter"],
        epilogue: ["epilogue"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        SkillsShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
