"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import Media from "./Media";
import StickyLabel from "./StickyLabel";
import { hideOffset, useFillerProgress } from "@/lib/useAboutEndProgress";

// StickyLabel's own `top-22.5` offset (22.5 * 4 = 90px) — the label
// stays pinned there natively until its containing block's bottom
// scrolls up past this line, at which point it unsticks.
const STICKY_TOP_OFFSET = 90;
const LABEL_HIDE_WINDOW = 100;

/** Progress (0→1) for the "About" label's own hide, timed to start
 * `delayPx` of scroll after the Designer label's native sticky-unstick
 * point (i.e. after the Designer column's bottom passes STICKY_TOP_OFFSET),
 * not the shared filler-based timeline used by the bar/mask/nav-logo. */
function useLabelHideProgress(designerColumnRef: React.RefObject<HTMLDivElement | null>, delayPx = 160) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    function update() {
      ticking = false;
      const col = designerColumnRef.current;
      if (!col) return;
      const designerUnstickDocY = col.getBoundingClientRect().bottom + window.scrollY - STICKY_TOP_OFFSET;
      const triggerY = designerUnstickDocY + delayPx;
      const p = (window.scrollY - triggerY) / LABEL_HIDE_WINDOW;
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
  }, [designerColumnRef, delayPx]);

  return progress;
}

export default function About({
  capabilities,
  images,
  designer,
}: {
  capabilities: string[];
  images: string[];
  designer: {
    name: string;
    email: string;
    instagram: string;
    linkedin: string;
    photo: string;
  };
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80px", "end end"],
  });
  // Slides the bar and "About" label off-screen over #s-footer-filler's
  // scroll range (right after this section, sized to exactly the hide
  // distance) — not on their native CSS sticky-unstick point, which only
  // fires much later (after this section's full trailing spacer scrolls
  // past) and was leaving both sitting there fully filled/opaque in
  // between. Starts exactly when the bar reaches 100% fill, since the
  // filler begins right where #s-about ends.
  const fillerProgress = useFillerProgress();
  const hideY = hideOffset(fillerProgress);
  // The "About" label hides on its own timeline — 80px of scroll after
  // the Designer label's native sticky-unstick point — instead of the
  // shared filler-based one above, so it tucks under ProgressMask (z-20,
  // sits above the label's default stacking) well before the bar does,
  // matching how each section's OWN sticky label already tucks under the
  // incoming section's bar first, rather than both vanishing in lockstep.
  const designerColumnRef = useRef<HTMLDivElement>(null);
  const labelProgress = useLabelHideProgress(designerColumnRef);
  // Extra upward travel (vs the shared 100px) so the label fully clears
  // the nav band — at only -100 a sliver still sits behind the
  // mix-blend-exclusion nav bar and ghosts through the blend.
  const labelHideY = hideOffset(labelProgress, 130);

  return (
    <section id="s-about" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      {/* This section's own progress bar. Slides off with the "About"
          label below (see hideY) instead of using its native sticky
          unstick point — see useAboutEndProgress comment above. */}
      <div
        id="about-progress"
        className="sticky top-20.5 z-10 w-full bg-surface px-3 md:px-8 lg:px-12"
        style={{ transform: `translateY(${hideY}px)` }}
      >
        <div className="h-px w-full bg-border">
          <motion.div className="h-full origin-left bg-on-border" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div id="about-row" className="flex w-full items-start px-4 md:px-10 lg:px-14">
        {/* Left rail: sticky "About" label, pinned for the section's whole scroll range */}
        <div id="about-rail" className="hidden sm:flex w-12 md:w-19.25 shrink-0 flex-col items-center self-stretch">
          <div className="h-[25vh] w-full shrink-0" />
          <StickyLabel as="h2" style={{ transform: `translateY(${labelHideY}px)` }}>About</StickyLabel>
        </div>

        <div id="about-body" className="flex min-w-0 flex-1 flex-col items-end w-full">
          <div className="h-[25vh] sm:h-[50vh] w-full shrink-0" />
          <div className="sm:hidden w-full pb-4">
            <span className="text-label text-on-surface">About</span>
          </div>
          {/* blockCapabilities: sticky "Capabilities" label on the left,
              capability text column, capability image column */}
          <div id="about-capabilities" className="flex w-full flex-col lg:flex-row items-start justify-end">
            <div className="flex min-w-0 flex-1 shrink-0 flex-col items-start sm:items-center self-stretch">
              <StickyLabel as="h3" className="w-full text-left sm:text-center">Capabilities</StickyLabel>
            </div>
            <div className="min-w-0 max-w-full lg:max-w-125 flex-1 w-full">
              <div className="spacer-2 sm:spacer-3 w-full shrink-0" />
              {capabilities.map((c) => (
                <div
                  key={c}
                  className="flex aspect-400/225 w-full flex-col items-end justify-center pr-4 lg:pr-20"
                >
                  <p className="text-right text-body text-on-surface">{c}</p>
                </div>
              ))}
            </div>
            <div className="min-w-0 max-w-full lg:max-w-125 flex-1 w-full">
              <div className="spacer-2 sm:spacer-3 w-full shrink-0" />
              {images.map((src) => (
                <Media
                  key={src}
                  src={src}
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="aspect-400/225 w-full"
                  cursorFollow
                />
              ))}
            </div>
          </div>

          {/* blockTeam: sticky "Designer" label on the left, designer
              photo/name/social links on the right */}
          <div id="about-designer" className="flex w-full flex-col sm:flex-row items-start justify-between px-0 sm:px-6 md:px-12 lg:px-32">
            <div ref={designerColumnRef} className="flex flex-1 flex-col items-start sm:items-center self-stretch">
              <div className="h-[25vh] sm:h-[50vh] w-full shrink-0" />
              <StickyLabel as="h3" className="w-full text-left sm:text-center">Designer</StickyLabel>
              <div className="hidden sm:block h-[150vh] w-full shrink-0" />
            </div>
            <div className="flex min-w-0 max-w-full lg:max-w-125 flex-1 flex-col items-end justify-end gap-3 self-stretch w-full pt-8 sm:pt-0">
              <Media
                src={designer.photo}
                alt={designer.name}
                sizes="(min-width: 1024px) 500px, 100vw"
                className="aspect-square w-full max-w-full lg:max-w-125"
                cursorFollow
              />
              <p className="whitespace-nowrap text-body text-on-surface">
                {designer.name}
              </p>
              <div className="flex items-end justify-end gap-2">
                <a
                  href={designer.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="transition-opacity duration-200 ease-out hover:opacity-60"
                >
                  <img src="/brand/ic-instagram.svg" alt="" className="h-6 w-6 dark:invert" />
                </a>
                <a
                  href={designer.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="transition-opacity duration-200 ease-out hover:opacity-60"
                >
                  <img src="/brand/ic-linkedin.svg" alt="" className="h-6 w-6 dark:invert" />
                </a>
              </div>
            </div>
          </div>
          <div id="end" className="spacer-4 w-full shrink-0" />
        </div>
      </div>
    </section>
  );
}
