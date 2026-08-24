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
    offset: ["start 90px", "end 90px"],
  });

  return (
    <section id="s-headline" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      <div className="sticky top-20.5 z-10 w-full bg-surface px-12">
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
      <div className="flex w-full items-start px-14">
        <div className="flex w-19.25 shrink-0 flex-col items-center self-stretch">
          <div className="h-[25vh] w-full shrink-0" />
          <StickyLabel>Studio A&amp;M</StickyLabel>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="h-[50vh] w-full shrink-0" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full max-w-150 flex-col items-start gap-2 text-body text-on-surface"
          >
            <p>{tagline}</p>
            <p>{intro}</p>
            <p className="max-w-[420px]">{subIntro}</p>
            <p>{signoff}</p>
            <p>– {designerFirstName}</p>
          </motion.div>
          <div className="h-[50vh] w-full shrink-0" />
        </div>
      </div>
    </section>
  );
}
