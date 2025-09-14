"use client";

import { useRef, useState } from "react";

type Props = {
  src: string;
  alt?: string;
  scale?: number;                // default: 2
  className?: string;            // <img> class
  containerClassName?: string;   // wrapper class
};

export default function ZoomImage({
  src,
  alt = "",
  scale = 2,
  className = "",
  containerClassName = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState<string>("center center");
  const [zoom, setZoom] = useState<boolean>(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={onMove}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-contain transition-transform duration-200 ease-out ${className}`}
        style={{
          transform: zoom ? `scale(${scale})` : "scale(1)",
          transformOrigin: origin,
          willChange: "transform",
          cursor: zoom ? "zoom-out" : "zoom-in",
        }}
      />
    </div>
  );
}
