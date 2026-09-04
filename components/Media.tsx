"use client";

import { useRef, useState, type MouseEvent } from "react";
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
  loading,
  className = "",
  cursorFollow = false,
  moveAmount = 6,
  hoverScale = 1.02,
}: {
  src: string;
  video?: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  /** Override the default lazy load — e.g. "eager" for off-screen hero
   * slides that must be ready before the carousel rotates to them.
   * Ignored when `priority` is set (that already forces eager). */
  loading?: "eager" | "lazy";
  className?: string;
  /** Opt in to the translate/scale-toward-cursor hover treatment.
   * Off by default so most media slots stay static. */
  cursorFollow?: boolean;
  /** Max px the media drifts toward the cursor. Default 6. */
  moveAmount?: number;
  /** Scale applied while hovering. Default 1.02. */
  hoverScale?: number;
}) {
  const [videoFailed, setVideoFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px) scale(1)");

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cursorFollow) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const xOffset = (e.clientX - rect.left) / rect.width - 0.5;
    const yOffset = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `translate(${xOffset * moveAmount}px, ${yOffset * moveAmount}px) scale(${hoverScale})`
    );
  };

  const handleMouseLeave = () => {
    if (cursorFollow) setTransform("translate(0px, 0px) scale(1)");
  };
  /*
  Disable the hover-color effect entirely (always desaturated, or always full color) — delete group-hover:opacity-0 (stays desaturated) or delete opacity-100/set it to opacity-0 (stays full color).
Change the speed — duration-700 (hover-out) / duration-0 (hover-in) control the ease timing.
Scope it to specific sections only — since every section shares this one Media component, an on/off toggle would need a new prop (e.g. desaturate?: boolean) rather than editing this file directly, if you want it to vary by section.
*/

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden bg-skeleton-fill ${className}`}
    >
      <div
        className={
          cursorFollow
            ? "absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            : "absolute inset-0"
        }
        style={cursorFollow ? { transform } : undefined}
      >
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
          <Photo src={src} alt={alt} fill sizes={sizes} priority={priority} loading={loading} className="object-cover" />
        )}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black mix-blend-saturation opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-0 group-hover:duration-0" />
    </div>
  );
}
