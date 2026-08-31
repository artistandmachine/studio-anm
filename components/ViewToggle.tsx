"use client";

import type { ProjectTileVariant } from "./ProjectTile";

/** List/grid toggle for the Work section. Both options stay visible; the
 * button for the view you're already in is disabled and dimmed to 60%
 * (no pointer, not selectable), and the other one is the live control —
 * same transition / hover feel as ThemeToggle.
 *
 * Controlled (unlike ThemeToggle, which owns its state) because the Work
 * section also feeds `view` to every tile — the parent has to hold it. */
export default function ViewToggle({
  view,
  onChange,
}: {
  view: ProjectTileVariant;
  onChange: (v: ProjectTileVariant) => void;
}) {
  return (
    <div className="flex select-none items-center gap-1">
      {(
        [
          ["list", "List view", ListIcon],
          ["grid", "Grid view", GridIcon],
        ] as const
      ).map(([v, label, Icon]) => {
        const current = view === v;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            disabled={current}
            aria-pressed={current}
            aria-label={label}
            className="flex shrink-0 cursor-pointer items-center justify-center text-on-surface transition-opacity duration-200 ease-out hover:opacity-60 disabled:cursor-default disabled:opacity-60"
          >
            <Icon className="h-4 w-fit" />
          </button>
        );
      })}
    </div>
  );
}

/* Icons inlined (not <img>-sourced) so their stroke follows the current
   text color via currentColor — same pattern as ThemeIcons. */

function ListIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-hidden="true">
      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeLinecap="square" />
    </svg>
  );
}

function GridIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-hidden="true">
      <rect x="2" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="2" width="5" height="5" stroke="currentColor" />
      <rect x="2" y="9" width="5" height="5" stroke="currentColor" />
      <rect x="9" y="9" width="5" height="5" stroke="currentColor" />
    </svg>
  );
}
