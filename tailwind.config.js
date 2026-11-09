/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Fonds — noir profond & bleu nuit
        base: "#070A14",
        night: "#0B1022",
        surface: "#111730",
        "surface-2": "#171E3D",
        line: "rgba(255,255,255,0.08)",
        "line-strong": "rgba(255,255,255,0.14)",
        // Bleu électrique (primaire)
        electric: {
          DEFAULT: "#3D7BFF",
          soft: "#5B8DFF",
          deep: "#2458E6",
          100: "#DBE6FF",
          200: "#B6CCFF",
          300: "#88AAFF",
          400: "#5B8DFF",
          500: "#3D7BFF",
          600: "#2458E6",
          700: "#1A42B8",
        },
        // Violet (secondaire / accent)
        violet: {
          DEFAULT: "#9B5CFF",
          soft: "#B388FF",
          deep: "#7C3AED",
          100: "#EADDFF",
          200: "#D6BBFF",
          300: "#BE93FF",
          400: "#A872FF",
          500: "#9B5CFF",
          600: "#7C3AED",
          700: "#6425C8",
        },
        // États (mesurés, non criards)
        success: "#34D399",
        warn: "#FBBF24",
        danger: "#FB7185",
        // Texte
        ink: "#F4F7FF",
        "ink-muted": "#9AA6C2",
        "ink-faint": "#636E8C",
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Échelle typographique (ratio ~1.25)
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.04em" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.4rem" }],
        base: ["1rem", { lineHeight: "1.65rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.375rem", { lineHeight: "1.85rem", letterSpacing: "-0.01em" }],
        "2xl": ["1.75rem", { lineHeight: "2.15rem", letterSpacing: "-0.015em" }],
        "3xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "4xl": ["3rem", { lineHeight: "3.15rem", letterSpacing: "-0.025em" }],
        "5xl": ["3.75rem", { lineHeight: "3.9rem", letterSpacing: "-0.03em" }],
        "6xl": ["4.75rem", { lineHeight: "4.9rem", letterSpacing: "-0.035em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(4,8,20,0.8)",
        glow: "0 0 0 1px rgba(91,141,255,0.25), 0 18px 60px -12px rgba(61,123,255,0.45)",
        "glow-violet": "0 0 0 1px rgba(155,92,255,0.25), 0 18px 60px -12px rgba(155,92,255,0.45)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(120deg, #3D7BFF 0%, #6E6BFF 48%, #9B5CFF 100%)",
        "brand-gradient-soft":
          "linear-gradient(120deg, rgba(61,123,255,0.16) 0%, rgba(155,92,255,0.16) 100%)",
        "radial-spot":
          "radial-gradient(60% 60% at 50% 0%, rgba(61,123,255,0.22) 0%, rgba(7,10,20,0) 70%)",
        grid: "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "44px 44px",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-pan": {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.22,1,0.36,1) infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
      },
    },
  },
  plugins: [],
};
