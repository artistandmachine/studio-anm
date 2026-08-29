"use client";

import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import ProjectTile, { Project, ProjectTileVariant } from "./ProjectTile";
import StickyLabel from "./StickyLabel";
import { useMinWidth } from "@/lib/useMinWidth";

export default function WorkProjects({ projects }: { projects: Project[] }) {
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

        {/* One block per year: a sticky year label + per-year view toggle on
            the left, project tiles on the right */}
        <div className="flex min-w-0 flex-1 flex-col items-center w-full">
          {years.map((year) => (
            <YearBlock
              key={year}
              year={year}
              projects={projects.filter((p) => p.year === year)}
            />
          ))}
        </div>
      </div>
      <div className="spacer-2" />
    </section>
  );
}

/* Each year owns its own grid/list view state, so the two blocks can be
   toggled independently. The list variant only exists at xl+ (1280px);
   below that every year is forced to grid and the toggle is hidden. */
function YearBlock({ year, projects }: { year: number; projects: Project[] }) {
  const canToggle = useMinWidth(1280);
  const [listWanted, setListWanted] = useState(true);
  const view: ProjectTileVariant = canToggle && listWanted ? "list" : "grid";

  return (
    <div className="flex w-full flex-col sm:flex-row items-start">
      <div className="flex w-full pr-3 sm:w-auto sm:flex-1 flex-col items-start sm:items-center self-stretch">
        <div className="hidden sm:block spacer-2 w-full shrink-0" />
        {/* Mobile: inline year heading */}
        <div className="flex w-full items-center pt-8 pb-4 sm:hidden">
          <span className="text-label text-on-surface">Work — {year}</span>
        </div>
        {/* Desktop: sticky year heading; toggle only where list is available */}
        <div className="sticky top-22.5 hidden w-full min-w-24 flex-col items-center gap-2.5 sm:flex">
          <h3 className="text-label whitespace-nowrap text-on-surface">{year}</h3>
          {canToggle && (
            <ViewToggle
              view={view}
              onChange={(v) => setListWanted(v === "list")}
            />
          )}
        </div>
      </div>
      <div className="flex w-full min-w-0 lg:max-w-300 flex-col items-stretch">
        <div className="spacer-3 sm:spacer-4 w-full shrink-0" />
        <div
          className={
            view === "list"
              ? "flex flex-col items-stretch lg:items-end gap-10 lg:gap-12.5"
              : "grid grid-cols-1 max-w-100 gap-x-6 gap-y-10 lg:grid-cols-2 lg:max-w-[51.5rem]"
          }
        >
          {projects.map((project) => (
            <ProjectTile key={project.id} project={project} variant={view} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ProjectTileVariant;
  onChange: (v: ProjectTileVariant) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {([
        ["list", "List view", <ListIcon key="i" />],
        ["grid", "Grid view", <GridIcon key="i" />],
      ] as const).map(([v, label, icon]) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(v)}
          aria-pressed={view === v}
          aria-label={label}
          className={`transition-opacity duration-200 ${
            view === v
              ? "text-on-surface"
              : "text-on-surface/40 hover:text-on-surface/70"
          }`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}

/* View-toggle icons — inline so stroke follows currentColor, matching
   the ThemeIcons pattern. */

function ListIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="2" y="9" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="9" width="5" height="5" stroke="currentColor" />
    </svg>
  );
}
