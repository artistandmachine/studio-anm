"use client";

import { useEffect, useState } from "react";

/** How far the viewport has scrolled through an element, as 0→1: 0 when
 * its top reaches the top of the viewport, 1 once its full height has
 * scrolled past (its bottom reaches the top of the viewport). Meant for
 * a short element used purely as a scroll-distance ruler — e.g.
 * #s-footer-filler, sized to exactly the hide distance below — so "how
 * much of it have I scrolled through" is a clean 0→1 with no slack. */
export function useFillerProgress(selector = "#s-footer-filler") {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const el = document.querySelector(selector);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = rect.height !== 0 ? -rect.top / rect.height : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [selector]);

  return progress;
}

/** Maps a 0→1 progress value straight to a translateY (px) that slides an
 * element off the top of the viewport — used on the About progress bar,
 * its "About" label, the shared progress-bar mask, and the nav logo, all
 * driven by the same #s-footer-filler scroll-through progress so they
 * move in lockstep, starting exactly when About's bar reaches 100% fill
 * (the filler sits immediately after #s-about) and finishing within
 * exactly `distance`px of scroll — no slack before the footer appears. */
export function hideOffset(progress: number, distance = 100) {
  return -progress * distance;
}
