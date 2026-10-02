import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./emails/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1360px" }
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B5ED7",
          50: "#EFF5FE",
          100: "#DCE9FD",
          200: "#B9D3FB",
          300: "#8CB6F8",
          400: "#5A93F3",
          500: "#0B5ED7",
          600: "#0A54C2",
          700: "#0845A0",
          800: "#073A85",
          900: "#062E69"
        },
        gold: {
          DEFAULT: "#F4B400",
          50: "#FFF9E6",
          100: "#FFF2CC",
          200: "#FFE599",
          300: "#FFD866",
          400: "#F9C733",
          500: "#F4B400",
          600: "#C69000",
          700: "#946B00",
          800: "#624700",
          900: "#312300"
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#64748B",
          subtle: "#94A3B8"
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F8FAFC",
          muted: "#F1F5F9",
          border: "#E2E8F0"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.06)",
        card: "0 4px 20px -4px rgb(15 23 42 / 0.08), 0 2px 6px -2px rgb(15 23 42 / 0.04)",
        lift: "0 20px 40px -12px rgb(15 23 42 / 0.15), 0 8px 16px -8px rgb(15 23 42 / 0.08)",
        glow: "0 0 0 1px rgb(11 94 215 / 0.08), 0 8px 24px -6px rgb(11 94 215 / 0.25)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
       2 "accordion-down": {
          from:s { height: "0" },
          infinite to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer "
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
