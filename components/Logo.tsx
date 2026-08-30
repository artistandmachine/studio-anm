"use client";

import { useState } from "react";

/**
 * Plain <img> wrapper for client/partner logo SVGs. Unmounts itself on
 * error instead of showing the browser's broken-image glyph, so a
 * project's clientLogo/partnerLogo path can be set in projects.json
 * ahead of the actual file — it just renders nothing until a real SVG
 * is dropped in at that path, no code change needed.
 *
 * `object-contain` is baked in so callers only ever need to hand it a
 * fixed-size box (a definite height + width) — logos vary wildly in
 * aspect ratio, and without a reserved box each one shifts the page as
 * it decodes mid-scroll. Always give the className a concrete height.
 */
export default function Logo({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`block object-contain dark:invert ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
