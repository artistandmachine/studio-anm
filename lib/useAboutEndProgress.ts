"use client";

import { useEffect, useState } from "react";

/** How close the viewport is to the browser's natural max-scroll
 * position, as 0→1 over the last `hideWindowPx` of scroll: 0 until
 * you're `hideWindowPx` away from the very end of the page, 1 exactly
 * at max scroll. Since #footer is the last element on the page,
 * "reached max scroll" and "reached the bottom of the footer" are the
 * same moment.
 *
 * Deliberately anchored to max-scroll (always reachable by definition)
 * rather than to a start landmark's rect (e.g. "#s-footer-filler's top
 * reaches the viewport top") — that geometric condition silently becomes
 * unreachable whenever the remaining page content after the landmark is
 * shorter than the viewport itself (here: 80px gap + 360px footer = 440px,
 * which is less than most viewport heights), since the browser simply
 * runs out of page to scroll before the landmark's top can reach the
 * viewport's top. Counting backward a fixed pixel window from the one
 * point that's always reachable sidesteps that entirely.
 *
 * Used to drive the About bar/label/mask/nav logo hide animation so it
 * finishes exactly as the page's true end (the footer's bottom) comes
 * into view, instead of a fixed-height ruler div — a ruler's own bottom
 * edge is always adjacent to whatever comes right after it in flow
 * (making it taller just pushes that content down; it can never reach
 * past its own next sibling, so it can't "reach into" the footer). */
export function useFillerProgress(hideWindowPx = 100) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let cachedMaxScrollY = 0;

    function measure() {
      cachedMaxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    }

    function update() {
      ticking = false;
      if (cachedMaxScrollY <= 0) measure();
      const p = hideWindowPx !== 0 ? (window.scrollY - (cachedMaxScrollY - hideWindowPx)) / hideWindowPx : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    function onResize() {
      measure();
      onScroll();
    }

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [hideWindowPx]);

  return progress;
}

/** Maps a 0→1 progress value straight to a translateY (px) that slides an
 * element off the top of the viewport — used on the About progress bar,
 * its "About" label, the shared progress-bar mask, and the nav logo, all
 * driven by the same start-of-filler-to-bottom-of-footer progress (see
 * useFillerProgress) so they move in lockstep, starting exactly when
 * About's bar reaches 100% fill and finishing within exactly
 * `distance`px of travel, spread across the whole scroll from there to
 * the footer's bottom edge — not visible again once the footer arrives. */
export function hideOffset(progress: number, distance = 100) {
  return -progress * distance;
}
