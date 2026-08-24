"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ProjectTile, { Project } from "./ProjectTile";
import StickyLabel from "./StickyLabel";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90px", "end 90px"],
  });

  const years = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => b - a
  );

  return (
    <section id="s-work" ref={sectionRef} className="relative flex w-full flex-col items-center overflow-clip">
      <div className="sticky top-[82px] z-10 w-full bg-surface px-[48px]">
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div className="flex w-full items-start px-[56px]">
        <div className="flex w-[77px] shrink-0 flex-col items-center self-stretch py-[90px]">
          <div className="h-[25vh] w-full shrink-0" />
          <StickyLabel>Work</StickyLabel>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center">
          {years.map((year) => (
            <div key={year} className="flex w-full items-start">
              <div className="flex flex-1 flex-col items-center self-stretch">
                <div className="h-[50vh] w-full shrink-0" />
                <StickyLabel className="w-full text-center">{year}</StickyLabel>
              </div>
              <div className="flex shrink-0 flex-col items-start gap-[50px] py-[90px]">
                <div className="h-[100vh] w-full shrink-0" />
                {projects
                  .filter((p) => p.year === year)
                  .map((project) => (
                    <ProjectTile key={project.id} project={project} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
