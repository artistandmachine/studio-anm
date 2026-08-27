"use client";

import { useState } from "react";
import Photo from "./Photo";

/**
 * Shared treatment for every media slot in the design: desaturated by
 * default (matching the Figma source's Overlay technique), snapping to
 * full color instantly on hover-in and easing back to desaturated over
 * 700ms on hover-out. Sits on a `mist` placeholder fill, so
 * a slot with no real file yet (Photo quietly renders nothing on a
 * 404) still reads as an intentional empty swatch — and starts using
 * the hover treatment automatically the moment a real photo lands at
 * that path, no code change needed.
 *
 * Pass `video` to play a looping muted clip instead of a static photo
 * (source lives under `public/videos/...`, mirroring the `images/`
 * layout). `src` still doubles as the video's poster frame and as the
 * fallback if the video file 404s, so every video slot degrades to a
 * real image instead of a broken player.
 */
export default function Media({
  src,
  video,
  alt = "",
  sizes,
  priority,
  className = "",
}: {
  src: string;
  video?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  /*
  Disable the hover-color effect entirely (always desaturated, or always full color) — delete group-hover:opacity-0 (stays desaturated) or delete opacity-100/set it to opacity-0 (stays full color).
Change the speed — duration-700 (hover-out) / duration-0 (hover-in) control the ease timing.
Scope it to specific sections only — since every section shares this one Media component, an on/off toggle would need a new prop (e.g. desaturate?: boolean) rather than editing this file directly, if you want it to vary by section.
*/

  return (
    <div className={`group relative overflow-hidden bg-skeleton-fill ${className}`}>
      {video && !videoFailed ? (
        <video
          src={video}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <Photo src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-black mix-blend-saturation opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-0 group-hover:duration-0" />
    </div>
  );
}
