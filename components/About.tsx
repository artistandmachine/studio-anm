"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Media from "./Media";
import StickyLabel from "./StickyLabel";
import { hideOffset, useFillerProgress } from "@/lib/useAboutEndProgress";

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
    offset: ["start 90px", "end end"],
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

  return (
    <section id="s-about" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      <div
        className="sticky top-20.5 z-10 w-full bg-transparent px-12"
        style={{ transform: `translateY(${hideY}px)` }}
      >
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div className="flex w-full items-start px-14">
        <div className="flex w-19.25 shrink-0 flex-col items-center self-stretch">
          <div className="h-[25vh] w-full shrink-0" />
          <div style={{ transform: `translateY(${hideY}px)` }}>
            <StickyLabel>About</StickyLabel>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-end">
          <div className="h-[50vh] w-full shrink-0" />
          {/* blockCapabilities */}
          <div className="flex w-full items-start justify-end">
            <div className="flex min-w-0 flex-1 shrink-0 flex-col items-center self-stretch">
              <StickyLabel className="w-full text-center">Capabilities</StickyLabel>
            </div>
            <div className="min-w-0 max-w-125 flex-1">
              <div className="h-screen w-full shrink-0" />
              {capabilities.map((c) => (
                <div
                  key={c}
                  className="flex aspect-400/225 w-full flex-col items-end justify-center pr-20"
                >
                  <p className="text-right text-body text-on-surface">{c}</p>
                </div>
              ))}
            </div>
            <div className="min-w-0 max-w-125 flex-1">
              <div className="h-screen w-full shrink-0" />
              {images.map((src) => (
                <Media
                  key={src}
                  src={src}
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="aspect-400/225 w-full"
                />
              ))}
            </div>
          </div>

          {/* blockTeam */}
          <div className="flex w-full items-start justify-between px-32">
            <div className="flex flex-1 flex-col items-center self-stretch">
              <div className="h-[50vh] w-full shrink-0" />
              <StickyLabel className="w-full text-center">Designer</StickyLabel>
              <div className="h-[150vh] w-full shrink-0" />
            </div>
            <div className="flex min-w-0 max-w-125 flex-1 flex-col items-end justify-end gap-3 self-stretch">
              <Media
                src={designer.photo}
                alt={designer.name}
                sizes="(min-width: 1024px) 500px, 100vw"
                className="aspect-square w-full max-w-125"
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
          <div className="h-[150vh] w-full shrink-0" />
        </div>
      </div>
    </section>
  );
}
