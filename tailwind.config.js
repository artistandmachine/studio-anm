/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Keys match the token names in app/globals.css exactly, so
        // `bg-<token>` / `text-<token>` / etc. just alias var(--color-<token>).
        // See globals.css's THEME block for the actual values (light + dark).
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
        "surface-variant": "var(--color-surface-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "primary-container": "var(--color-primary-container)",
        "on-primary-container": "var(--color-on-primary-container)",
        border: "var(--color-border)",
        "skeleton-fill": "var(--color-skeleton-fill)",
        "border-sm": "var(--color-border-sm)",
        "border-lg": "var(--color-border-lg)",
        "progress-sm": "var(--color-progress-sm)",
        "progress-lg": "var(--color-progress-lg)",
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
