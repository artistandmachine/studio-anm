"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import StickyLabel from "./StickyLabel";

export default function Headline({
  tagline,
  intro,
  subIntro,
  signoff,
  designerFirstName,
}: {
  tagline: string;
  intro: string;
  subIntro: string;
  signoff: string;
  designerFirstName: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="s-headline" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      <div className="sticky top-0 z-10 w-full bg-surface px-[48px] pt-[80px]">
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
      <div className="flex w-full items-start px-[56px] py-[90px]">
        <div className="flex w-[77px] shrink-0 flex-col items-center self-stretch">
          <div className="h-[25vh] w-full shrink-0" />
          <StickyLabel>Studio A&amp;M</StickyLabel>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center py-[90px]">
          <div className="h-[25vh] w-full shrink-0" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-[600px] flex-col items-start gap-[8px] text-base leading-4 tracking-normal text-on-surface"
          >
            <p>{tagline}</p>
            <p>{intro}</p>
            <p>{subIntro}</p>
            <p>{signoff}</p>
            <p>– {designerFirstName}</p>
          </motion.div>
          <div className="h-[50vh] w-full shrink-0" />
        </div>
      </div>
    </section>
  );
}
