# Color tokens

`tokens/*.json` is the **source of truth** for every color on the site. It
mirrors the Figma variable collections 1:1. `scripts/build-tokens.mjs`
(`npm run tokens`) compiles it to `app/tokens.generated.css`, which
`app/globals.css` imports. The generated file is committed but must never be
hand-edited — `predev` / `prebuild` regenerate it.

## Figma setup

Create **two variable collections**.

### Collection: `Primitives`

Single mode (`Value`). Raw brand swatches, referenced by `Theme`, never used
directly on a layer.

| Variable          | Value     |
| ----------------- | --------- |
| `brand/primary`   | `#7C6699` |
| `brand/secondary` | `#B6B2AF` |
| `brand/tertiary`  | `#70665C` |

→ `tokens/primitives.json` → `--brand-primary`, `--brand-secondary`, `--brand-tertiary`

### Collection: `Theme`

Two modes: `Light`, `Dark`. Semantic tokens — named for what the color is
_for_. Each is an alias to a `Primitives` variable, except a few contrast-tuned
literals (see below).

| Variable                     | Light                | Dark                 |
| ---------------------------- | -------------------- | -------------------- |
| `color/accent`               | → `brand/primary`    | `#B0A3C2` (literal¹) |
| `color/surface`              | `#FFFFFF`            | `#1A1A1A`            |
| `color/on-surface`           | `#000000`            | `#FFFFFF`            |
| `color/primary-container`    | `#000000`            | `#000000`            |
| `color/on-primary-container` | `#FFFFFF`            | `#FFFFFF`            |
| `color/surface-variant`      | → `brand/secondary`  | `#404040` (Tailwind neutral-800²) |
| `color/on-surface-variant`   | → `brand/tertiary`   | `#A89F91` (literal¹) |
| `color/skeleton-fill`        | `#F5F5F5` (Tailwind neutral-100²) | _same as Light³_ |
| `color/border-sm`            | `#70665C` @ 30%      | → `brand/tertiary`   |
| `color/progress-sm`          | `#000000`            | `#FFFFFF`            |
| `color/border-lg`            | `#000000`            | → `brand/tertiary`   |
| `color/progress-lg`          | → `brand/tertiary`   | `#FFFFFF`            |

¹ Lightened for WCAG AA contrast against the dark surface — keep the rationale
in the variable's description and in `tokens/theme.dark.json`.

² In code these currently alias Tailwind's built-in `--color-neutral-*`
(authored in oklch, so slightly off the hex shown). If you want Figma to be
fully authoritative, add `neutral/100` + `neutral/800` to `Primitives` with the
hex values and accept the sub-1% shift; otherwise leave the `var(--color-*)`
passthrough in the JSON as-is.

³ `skeleton-fill` is intentionally identical in both modes, so it is **absent**
from `theme.dark.json`. Anything not in `theme.dark.json` inherits from `:root`.
`primary-container` / `on-primary-container` are omitted for the same reason.

## Regenerating from Figma

Pull the collections to JSON (Figma MCP `get_variable_defs`, a small first-party
export plugin, or the Enterprise Variables REST API), overwrite the files in
`tokens/`, run `npm run tokens`, and review the diff in
`app/tokens.generated.css`.
