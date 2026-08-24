"use client";

import { hideOffset, useFillerProgress } from "@/lib/useAboutEndProgress";

/** Sits between the nav (z-50) and every section's progress bar (z-10).
 * Each bar rests at the same y-coordinate this mask's bottom edge sits
 * at, so the outgoing bar's brief unstick-and-scroll-away moment is
 * hidden behind it instead of visibly overlapping the incoming one — an
 * instant swap instead of a slide.
 *
 * Slides itself off-screen over #s-footer-filler's scroll range, in sync
 * with the About bar/label/nav-logo hide (see About.tsx/Nav.tsx) —
 * starting exactly when About's bar reaches 100% fill, not before, and
 * finishing within that same short, exact distance so nothing sits idle
 * before the footer appears. */
export default function ProgressMask() {
  const progress = useFillerProgress();

  return (
    <div
      className="sticky top-0 z-20 h-[82px] w-full bg-surface"
      style={{ transform: `translateY(${hideOffset(progress)}px)` }}
    />
  );
}
