"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Media from "./Media";
import StickyLabel from "./StickyLabel";

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
    offset: ["start start", "end end"],
  });

  return (
    <section id="s-about" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      <div className="sticky top-0 z-10 w-full bg-surface px-[48px] pt-[80px]">
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div className="flex w-full items-start px-[56px]">
        <div className="flex w-[77px] shrink-0 flex-col items-center self-stretch py-[90px]">
          <div className="h-[25vh] w-full shrink-0" />
          <StickyLabel>About</StickyLabel>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-end">
          <div className="h-[50vh] w-full shrink-0" />
          {/* blockCapabilities */}
          <div className="flex w-full items-start justify-end py-[90px]">
            <div className="flex min-w-0 max-w-[500px] flex-1 shrink-0 flex-col items-center self-stretch">
              <StickyLabel>Capabilities</StickyLabel>
            </div>
            <div className="min-w-0 max-w-[500px] flex-1">
              <div className="h-[100vh] w-full shrink-0" />
              {capabilities.map((c) => (
                <div
                  key={c}
                  className="flex aspect-[400/225] w-full flex-col items-end justify-center pr-[80px]"
                >
                  <p className="text-right text-base leading-4 tracking-normal text-on-surface">{c}</p>
                </div>
              ))}
            </div>
            <div className="min-w-0 max-w-[500px] flex-1">
              <div className="h-[100vh] w-full shrink-0" />
              {images.map((src) => (
                <Media
                  key={src}
                  src={src}
                  sizes="(min-width: 1024px) 500px, 100vw"
                  className="aspect-[400/225] w-full"
                />
              ))}
            </div>
          </div>

          {/* blockTeam */}
          <div className="flex w-full items-start justify-between px-[128px] py-[90px]">
            <div className="flex max-w-[500px] flex-1 flex-col items-center self-stretch">
              <div className="h-[50vh] w-full shrink-0" />
              <StickyLabel>Designer</StickyLabel>
              <div className="h-[150vh] w-full shrink-0" />
            </div>
            <div className="flex min-w-0 max-w-[500px] flex-1 flex-col items-end justify-end gap-[12px] self-stretch">
              <Media
                src={designer.photo}
                alt={designer.name}
                sizes="(min-width: 1024px) 500px, 100vw"
                className="aspect-square w-full max-w-[500px]"
              />
              <p className="whitespace-nowrap text-base leading-4 tracking-normal text-on-surface">
                {designer.name}
              </p>
              <div className="flex items-end justify-end gap-[8px]">
                <a
                  href={designer.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="transition-opacity duration-200 ease-out hover:opacity-60"
                >
                  <img src="/brand/ic-instagram.svg" alt="" className="h-[24px] w-[24px]" />
                </a>
                <a
                  href={designer.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="transition-opacity duration-200 ease-out hover:opacity-60"
                >
                  <img src="/brand/ic-linkedin.svg" alt="" className="h-[24px] w-[24px]" />
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
