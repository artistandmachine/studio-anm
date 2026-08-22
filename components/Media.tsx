"use client";

import Photo from "./Photo";

/**
 * Shared treatment for every photo slot in the design: desaturated by
 * default (matching the Figma source's Overlay technique), easing to
 * full color on hover over 200ms. Sits on a `mist` placeholder fill, so
 * a slot with no real file yet (Photo quietly renders nothing on a
 * 404) still reads as an intentional empty swatch — and starts using
 * the hover treatment automatically the moment a real photo lands at
 * that path, no code change needed.
 */
export default function Media({
  src,
  alt = "",
  sizes,
  priority,
  className = "",
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`group relative overflow-hidden bg-primary-container ${className}`}>
      <Photo src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-black mix-blend-saturation transition-opacity duration-200 ease-out group-hover:opacity-0" />
    </div>
  );
}
