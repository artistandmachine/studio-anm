"use client";

import { getLenis } from "./SmoothScroll";

/** "Back to top" control — sits just above the footer, right-aligned.
 * Same button treatment as ThemeToggle / ViewToggle. The mark is the
 * Instagram icon's rounded-square border with an up arrow inside. */
export default function BackToTop() {
  function toTop() {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="flex shrink-0 cursor-pointer select-none items-center justify-center text-on-surface transition-opacity duration-200 ease-out hover:opacity-60"
    >
      <BackToTopIcon className="h-6 w-6" />
    </button>
  );
}

/* Instagram icon's rounded-square frame (same outer path, so the border
   weight/radius match exactly) with an up arrow centered inside. */
function BackToTopIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-hidden="true">
      <path d="M0.784321 6.03945C0.784321 3.13731 3.13658 0.784493 6.03868 0.784328H17.9606C20.8628 0.784328 23.2157 3.13721 23.2157 6.03945V17.9613C23.2155 20.8634 20.8627 23.2157 17.9606 23.2157H6.03868C3.13668 23.2155 0.784486 20.8634 0.784321 17.9613V6.03945ZM0 17.9613C0.00016574 21.2965 2.70351 23.9999 6.03868 24H17.9606C21.2959 24 23.9999 21.2966 24 17.9613V6.03945C24 2.70404 21.296 0 17.9606 0H6.03868C2.70341 0.000165736 0 2.70414 0 6.03945V17.9613Z" fill="currentColor" />
      <path d="M12 16.5V7.5M12 7.5L7.75 11.75M12 7.5L16.25 11.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}
