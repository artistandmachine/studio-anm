"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { getLenis } from "./SmoothScroll";
import { hideOffset, useFillerProgress } from "@/lib/useAboutEndProgress";
import ThemeToggle from "./ThemeToggle";

// Matches the 90px sticky-nav buffer sections use to decide when they've
// "started" (see useActiveSection and the offset on each section's own
// scroll-progress tracker), so a nav-link click lands a section exactly
// where it's considered active instead of tucking it under the nav.
const SECTION_SCROLL_BUFFER = 80;

const NAV_SECTION_IDS = ["#s-work", "#s-about"];

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target as HTMLElement, { offset: -SECTION_SCROLL_BUFFER });
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_BUFFER;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={(e) => smoothScrollTo(e, href)}
      className="group relative flex cursor-pointer select-none items-center gap-2.5 py-0.5 pl-1 pr-1.5"
    >
      <p
        className={`text-nav-link whitespace-nowrap transition-opacity duration-200 ease-out group-active:opacity-20 ${active ? "text-accent" : "text-on-surface opacity-100 group-hover:opacity-60"
          }`}
      >
        {children}
      </p>
      <span className="absolute bottom-0 right-0 top-0 w-px bg-on-surface" />
    </a>
  );
}

/** Which nav-linked section (#s-work, #s-about) is currently active, for
 * the "active" nav-link state. A section becomes active once its top has
 * scrolled up past a buffer from the top of the viewport (matching
 * the sticky nav's height), and stays active until the next section
 * crosses that same line. */
function useActiveSection(ids: string[], buffer = SECTION_SCROLL_BUFFER) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.querySelector(id))
      .filter((el): el is HTMLElement => el !== null);

    let ticking = false;

    function update() {
      ticking = false;
      const endMarker = document.querySelector("#end") || document.querySelector("#footer");
      if (endMarker && endMarker.getBoundingClientRect().top <= buffer) {
        setActive(null);
        return;
      }
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= buffer) {
          current = `#${el.id}`;
        }
      }
      setActive(current);
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, buffer]);

  return active;
}

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const activeSection = useActiveSection(NAV_SECTION_IDS);
  const fillerProgress = useFillerProgress();
  const logoHideOffset = hideOffset(fillerProgress);

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center">
      {/* z-index above the nav row below — otherwise the row's own
          content (e.g. the logo, mid hide-animation) paints over this
          bar by default DOM order once a transform makes them overlap. */}
      <div className="relative z-10 h-1.5 w-full bg-bar">
        <motion.div
          className="h-full origin-left bg-on-bar"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      <div className="relative z-0 flex h-16 sm:h-19 w-full items-center justify-between px-4 md:px-10 lg:px-14">
        <div className="flex items-center justify-center">
          <a
            href="#main-home"
            onClick={(e) => {
              e.preventDefault();
              const lenis = getLenis();
              if (lenis) {
                lenis.scrollTo(0);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            style={{ transform: `translateY(${logoHideOffset}px)` }}
          >
            <motion.span
              className="inline-block"
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 1, transition: { duration: 0 } }}
            >
              <img
                src="/brand/logo-mark.svg"
                alt="Studio A&amp;M"
                className="h-4 w-20.25 dark:invert"
              />
            </motion.span>
          </a>
        </div>
        <nav className="flex items-center justify-end gap-3 sm:gap-5">
          <ThemeToggle />
          <NavLink href="#s-work" active={activeSection === "#s-work"}>
            Work
          </NavLink>
          <NavLink href="#s-about" active={activeSection === "#s-about"}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
