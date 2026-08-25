"use client";

import { useEffect, useRef, useState } from "react";
import Media from "./Media";

const AUTO_ROTATE_INTERVAL = 4000;
const RESUME_DELAY_AFTER_CLICK = 3000;

export default function Hero({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (images.length <= 1 || !autoRotate) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, AUTO_ROTATE_INTERVAL);
    return () => clearInterval(id);
  }, [images.length, autoRotate]);

  // Any manual navigation pauses auto-rotate, then resumes it after a
  // short delay instead of immediately fighting the user's click.
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  function goToSlide(next: number | ((i: number) => number)) {
    setActive(next);
    setAutoRotate(false);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setAutoRotate(true), RESUME_DELAY_AFTER_CLICK);
  }

  return (
    <section id="s-hero" className="flex w-full flex-col items-center overflow-clip px-12">
      <div className="relative aspect-1104/621 w-full">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === active ? "" : "pointer-events-none"
            }`}
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Media
              src={src}
              sizes="(min-width: 1200px) 1104px, 100vw"
              priority={i === 0}
              className="h-full w-full"
            />
          </div>
        ))}

        {images.length > 1 && (
          <>
            {/* Click zones: right half advances, left half goes back.
                Sit above the slides but below the pagination row below. */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => goToSlide((i) => (i - 1 + images.length) % images.length)}
              style={{ cursor: "url(/icons/cursor-prev.svg) 16 16, pointer" }}
              className="absolute inset-y-0 left-0 w-1/2"
            />
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => goToSlide((i) => (i + 1) % images.length)}
              style={{ cursor: "url(/icons/cursor-next.svg) 16 16, pointer" }}
              className="absolute inset-y-0 right-0 w-1/2"
            />
          </>
        )}

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-30">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active}
                disabled={i === active}
                onClick={() => goToSlide(i)}
                className="group flex shrink-0 cursor-pointer items-center justify-center p-6 disabled:cursor-default">
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 shrink-0 bg-on-inverse-surface transition-transform duration-200 ease-out ${
                    i === active ? "" : "opacity-50 group-hover:scale-120 group-hover:opacity-100"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="spacer-1"></div>
    </section>
  );
}
