"use client";

import { useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "theme";

/** Inline script string, meant to run in <head> before hydration (see
 * layout.tsx) so the correct theme attribute is set before first paint —
 * without it, the page would flash light and then snap to a stored dark
 * preference a moment later. */
export const themeInitScript = `
  try {
    var t = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (t === "dark") document.documentElement.setAttribute("data-theme", "dark");
  } catch (e) {}
`;

/** Manual light/dark toggle — never follows the OS/browser theme, only
 * ever this button (persisted to localStorage). Toggles the
 * [data-theme="dark"] attribute globals.css keys its dark token values
 * off of. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still
      // applies for this page view, just won't persist across reloads.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="h-[10px] w-[10px] shrink-0 rounded-full bg-on-surface transition-opacity duration-200 ease-out hover:opacity-60"
    />
  );
}
