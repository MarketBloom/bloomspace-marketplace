import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["SF Pro Display", "Inter", "sans-serif"],
        mono: ["SF Pro Display", "Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#EFEEEA", // Isabelline as background
        foreground: "#FCBA24", // Selective Yellow as text color
        primary: {
          DEFAULT: "#050407", // Black as primary
          foreground: "#EFEEEA", // Isabelline text on primary
          100: "#010101",
          200: "#020103",
          300: "#030204",
          400: "#040305",
          500: "#050407",
          600: "#322846",
          700: "#604d85",
          800: "#9280b6",
          900: "#c9c0db",
        },
        secondary: {
          DEFAULT: "#FCBA24", // Selective Yellow as secondary
          foreground: "#050407", // Black text on secondary
          100: "#382801",
          200: "#714f02",
          300: "#a97703",
          400: "#e19f03",
          500: "#fcba24",
          600: "#fcc84e",
          700: "#fdd67a",
          800: "#fee4a7",
          900: "#fef1d3",
        },
        muted: {
          DEFAULT: "#EFEEEA", // Isabelline as muted
          foreground: "#604d85", // A mid-tone for muted text
        },
        accent: {
          DEFAULT: "#050407", // Black as accent
          foreground: "#EFEEEA", // Isabelline text on accent
        },
        popover: {
          DEFAULT: "#EFEEEA", // Isabelline as popover background
          foreground: "#FCBA24", // Selective Yellow text in popovers
        },
        card: {
          DEFAULT: "#EFEEEA", // Isabelline as card background
          foreground: "#FCBA24", // Selective Yellow text in cards
        },
      },
      boxShadow: {
        'apple': '0 2px 4px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.06)',
        'apple-hover': '0 4px 8px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;