# Studio A&M — React scaffold

A hand-built Next.js + Tailwind + Framer Motion recreation of the Framer prototype, including its three signature scroll effects:

- **Hero** — a pinned frame that crossfades through multiple full-bleed images as you scroll (`components/Hero.tsx`).
- **Work / About** — a sticky left index/tab column with scrolling rows on the right, plus a sticky thumbnail that swaps to match whichever row is in view (`components/WorkGrid.tsx`, `components/About.tsx`).
- **Footer reveal** — the whole page scales down slightly and its bottom corners round off as you hit the end, lifting like a card to reveal a fixed black footer underneath (`components/Reveal.tsx` + `components/Footer.tsx`).

This is a structural + interaction match, not a pixel-perfect clone — spacing, timing, and exact scale/radius values will need a pass against your Figma design once you're ready to refine.

## Run it

```
npm install
npm run dev
```

Then open http://localhost:3000.

## Styling with Tailwind

Every component uses **Tailwind CSS utility classes** for layout, spacing, type, and color. Open any `.tsx` file and you'll see classes like `flex`, `gap-4`, `px-6`, `text-lg`, `md:px-10`, etc.

**Quick edits:**
- Change a color anywhere? Edit the `extend.colors` in `tailwind.config.ts` (e.g., change `accent: "#b5502c"` to your new color).
- Adjust spacing or type sizes? Same place in the config, or just change class names in the component.
- Responsive breakpoints? Use `md:`, `lg:`, etc. prefixes (already built into Tailwind).

**How it works:** Tailwind scans your component files for class names, generates only the CSS you use, and injects it into `globals.css`. No CSS files to maintain — just pick classes and go.

## Adding or editing a project

1. Open `data/projects.json`.
2. Add a new object to the `projects` array (copy an existing one as a template) or edit an existing entry.
3. Drop the project image into `public/images/projects/` using the filename referenced in `image`.
4. If you don't have final copy yet, write your notes in `rawNotes` and set `needsDescription: true` — the row will show a "pending" placeholder instead of guessing. Hand the notes to Claude to polish per `content/STYLE_GUIDE.md`.
5. Save. The dev server hot-reloads.

## Adding hero / about images

- Hero: drop images into `public/images/hero/` and list their paths in `data/projects.json` → `studio.heroImages`. The hero section's height is `images.length * 100vh`, so adding more images makes the pinned scroll sequence longer automatically.
- About: same idea, `public/images/about/` + `studio.capabilityImages`. Ideally one image per capability, in the same order as `studio.capabilities`.

## Design in Figma, iterate in code

The workflow for next phase:
1. Design in Figma (colors, spacing, typography, layout).
2. Extract design tokens from Figma (via Figma MCP in Claude).
3. Update `tailwind.config.ts` with your palette and spacing scale.
4. Run `npm run dev`, tweak classes in components, see changes live.
5. Repeat until it matches your Figma design.

Tailwind makes this fast — you're just changing class names and seeing the result instantly, not writing CSS from scratch.

## Things to verify once you're running it locally

- **Reveal timing**: `lib/constants.ts` sets `FOOTER_HEIGHT = 440` (px). This must match the footer's actual rendered height, or the scale/reveal animation will feel off. If you change footer content, update this constant to match.
- **Reveal scale/radius amounts**: currently scales to `0.94` and rounds to `32px` — subtle by design, tune in `components/Reveal.tsx` if you want it punchier.
- **Sticky-inside-scaled-wrapper**: `Reveal` applies a Framer Motion `scale` transform, which is why `Nav` is rendered *outside* `Reveal` in `app/page.tsx` — a `transform` on an ancestor breaks `position: fixed` children. Worth double-checking in the browser that this didn't slip back in if you refactor the layout.
- **IntersectionObserver thresholds**: `WorkGrid` and `About` use `rootMargin: "-45% 0px -45% 0px"` to decide which row/capability is "active" (and therefore which sticky image shows). This is a reasonable default but may need adjusting once real content/image aspect ratios are in.
- **Hero image count**: with 3 placeholder hero images the section is 300vh tall. If you end up with only 1-2 real hero images, the scroll distance will feel too long — trim `studio.heroImages` accordingly or add a max height cap.

## Stack

- Next.js (App Router)
- Tailwind CSS (utility-first styling)
- Framer Motion (scroll-linked animations, same library Framer uses under the hood)
