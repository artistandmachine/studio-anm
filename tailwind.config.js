/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Keys match the token names in app/globals.css exactly, so
        // `bg-<token>` / `text-<token>` / etc. just alias var(--color-<token>).
        // See globals.css's THEME block for the actual values (light + dark).
        "on-surface": "var(--color-on-surface)",
        surface: "var(--color-surface)",
        "inverse-surface": "var(--color-inverse-surface)",
        "on-inverse-surface": "var(--color-on-inverse-surface)",
        secondary: "var(--color-secondary)",
        "surface-variant": "var(--color-surface-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "primary-container": "var(--color-primary-container)",
        "neutral-300": "var(--color-neutral-300)",
        tertiary: "var(--color-tertiary)",
        "progress-bar": "var(--color-progress-bar)",
        "on-progress-bar": "var(--color-on-progress-bar)",
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
