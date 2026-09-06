import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-card": "var(--surface-card)",
        "surface-muted": "var(--surface-muted)",
        "border-tech": "var(--border-tech)",
        "border-subtle": "var(--border-subtle)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-dim": "var(--text-dim)",
        slate: {
          heavy: "var(--slate-heavy)",
          body: "var(--slate-body)",
          muted: "var(--slate-muted)",
          dim: "var(--slate-dim)",
        },
        volt: {
          mint: "#00E599",
          cyan: "#00D2B4",
          lightning: "#F59E0B",
          electric: "#0088FF",
          dark: "#042F24",
          subtle: "var(--volt-subtle)",
          glow: "rgba(0, 229, 153, 0.25)",
        },
      },
      borderRadius: {
        tech: "6px",
        "tech-md": "8px",
        "tech-lg": "12px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        "volt-subtle": "var(--shadow-subtle)",
        "volt-glow": "0 0 20px -2px rgba(0, 229, 153, 0.35)",
        "volt-glow-lg": "0 0 35px -5px rgba(0, 210, 180, 0.45)",
        "volt-gold": "0 0 25px -4px rgba(245, 158, 11, 0.4)",
        "volt-cyan": "0 0 25px -4px rgba(0, 210, 180, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
