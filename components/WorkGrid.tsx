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
      {/* This section's own progress bar, pinned under the nav */}
      <div className="sticky top-20.5 z-10 w-full bg-surface px-12">
        <div className="h-px w-full bg-neutral-300">
          <motion.div className="h-full origin-left bg-on-surface" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>

      <div className="flex w-full items-start px-14">
        {/* Left rail: sticky "Work" label, pinned for the section's whole scroll range */}
        <div className="flex w-19.25 shrink-0 flex-col items-center self-stretch py-22.5">
          <div className="spacer-1 w-full shrink-0" />
          <StickyLabel>Work</StickyLabel>
        </div>

        {/* One block per year: a sticky year label on the left, project
            tiles stacked on the right */}
        <div className="flex min-w-0 flex-1 flex-col items-center">
          {years.map((year) => (
            <div key={year} className="flex w-full items-start">
              <div className="flex flex-1 flex-col items-center self-stretch">
                <div className="spacer-3 w-full shrink-0" />
                <StickyLabel className="w-full text-center">{year}</StickyLabel>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-12.5">
                <div className="spacer-4 w-full shrink-0" />
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
      <div className="spacer-2" />
    </section>
  );
}
