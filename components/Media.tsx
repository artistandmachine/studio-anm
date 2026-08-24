"use client";

import { useState } from "react";
import Photo from "./Photo";

/**
 * Shared treatment for every media slot in the design: desaturated by
 * default (matching the Figma source's Overlay technique), easing to
 * full color on hover over 200ms. Sits on a `mist` placeholder fill, so
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

  return (
    <div className={`group relative overflow-hidden bg-primary-container ${className}`}>
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
      <div className="pointer-events-none absolute inset-0 bg-black mix-blend-saturation transition-opacity duration-200 ease-out group-hover:opacity-0" />
    </div>
  );
}
