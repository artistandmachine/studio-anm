"use client";

import { motion, useScroll } from "framer-motion";
import { getLenis } from "./SmoothScroll";

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target as HTMLElement);
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={(e) => smoothScrollTo(e, href)}
      className="relative flex items-center gap-[10px] py-[2px] pl-[4px] pr-[6px] transition-opacity duration-200 ease-out hover:opacity-60"
    >
      <p className="whitespace-nowrap text-[14px] font-medium leading-[14px] tracking-[0.3px] text-on-surface">
        {children}
      </p>
      <span className="absolute bottom-0 right-0 top-0 w-px bg-on-surface" />
    </a>
  );
}

export default function Nav() {
  const { scrollYProgress } = useScroll();

  return (
    <header className="sticky top-0 z-50 flex w-full flex-col items-center">
      <div className="h-[4px] w-full bg-on-surface-variant">
        <motion.div
          className="h-full origin-left bg-inverse-surface"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      <div className="flex h-[76px] w-full items-center justify-center px-[56px]">
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
            className="transition-opacity duration-200 ease-out hover:opacity-60"
          >
            <img
              src="/brand/logo-mark.svg"
              alt="Studio A&amp;M"
              className="h-[16px] w-[81px]"
            />
          </a>
        </div>
        <nav className="flex flex-1 items-center justify-end gap-[20px]">
          <NavLink href="#s-work">Work</NavLink>
          <NavLink href="#s-about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
