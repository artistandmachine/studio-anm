"use client";

import { GridIcon, ListIcon } from "./ViewToggleIcons";
import type { ProjectTileVariant } from "./ProjectTile";

/** Single-button list/grid toggle for the Work section — mirrors
 * ThemeToggle's interaction exactly: one button, a click flips to the
 * other view, and the icon shows the view you're *currently* in.
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
  const next: ProjectTileVariant = view === "list" ? "grid" : "list";

  return (
    <button
      type="button"
      onClick={() => onChange(next)}
      aria-label={`Switch to ${next} view`}
      className="flex shrink-0 cursor-pointer items-center justify-center text-on-surface transition-opacity duration-200 ease-out hover:opacity-60"
    >
      {view === "list" ? (
        <ListIcon className="h-4 w-fit" />
      ) : (
        <GridIcon className="h-4 w-fit" />
      )}
    </button>
  );
}
