"use client";

import { useEffect, useState } from "react";
import Media from "./Media";

export default function Hero({ images }: { images: string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section id="s-hero" className="flex w-full flex-col items-center overflow-clip px-[48px]">
      <div className="relative aspect-[1104/621] w-full">
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
      </div>
    </section>
  );
}
