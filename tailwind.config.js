/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Keys match Figma variable names (slashes -> hyphens), e.g.
        // color/on-surface -> bg-on-surface. Two exceptions: `accent`
        // (an interactive-state color with no Figma variable) and
        // `surface` (Figma's own name, "bureoBackground", was a leaked
        // internal component name, not a real token — renamed here).
        "on-surface": "var(--color-on-surface)",
        "inverse-surface": "var(--color-inverse-surface)",
        surface: "var(--color-surface)",
        accent: "var(--color-accent)",
        secondary: "var(--color-secondary)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "primary-container": "var(--color-primary-container)",
        "neutral-300": "var(--color-neutral-300)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1440px",
      },
    },
  },
  plugins: [],
};

module.exports = config;
