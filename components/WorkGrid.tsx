"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import ProjectTile, { Project } from "./ProjectTile";
import StickyLabel from "./StickyLabel";

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80px", "end 90px"],
  });

  const years = Array.from(new Set(projects.map((p) => p.year))).sort(
    (a, b) => b - a
  );

  return (
    <section id="s-work" ref={sectionRef} className="relative flex w-full flex-col items-start overflow-clip">
      {/* This section's own progress bar, pinned under the nav */}
      <div className="sticky top-20.5 z-10 w-full bg-surface px-3 md:px-8 lg:px-12">
        <div className="h-px w-full bg-border">
          <motion.div className="h-full origin-left bg-on-border" style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
{/* Column 1 */}
      <div className="flex w-full items-start px-4 md:px-10 lg:px-14">
        {/* Left rail: sticky "Work" label, pinned for the section's whole scroll range */}
        <div className="hidden sm:flex w-12 md:w-19.25 shrink-0 flex-col items-center self-stretch py-12 md:py-22.5">
          <div className="spacer-1 w-full shrink-0" />
          <StickyLabel as="h2">Work</StickyLabel>
        </div>

        {/* One block per year: a sticky year label on the left, project
            tiles stacked on the right */}
        <div className="flex min-w-0 flex-1 flex-col items-center w-full">
          {years.map((year) => (
            <div key={year} className="flex w-full flex-col sm:flex-row items-start">
              <div className="flex w-full pr-3 sm:w-auto sm:flex-1 flex-col items-start sm:items-center ">
                <div className="hidden sm:block spacer-2 w-full shrink-0" />
                <div className="sm:hidden pt-8 pb-4">
                  <span className="text-label text-on-surface sm:hidden">Work — {year}</span>
                </div>
                <StickyLabel as="h3" className="hidden sm:block w-full text-center">{year}</StickyLabel>
              </div>
              <div className="flex w-full min-w-0 lg:max-w-300 flex-col items-stretch lg:items-end gap-10 lg:gap-12.5">
                <div className="spacer-3 sm:spacer-4 w-full shrink-0" />
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
