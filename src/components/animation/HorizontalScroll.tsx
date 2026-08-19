"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/utils";

type HorizontalScrollProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
};

/**
 * Desktop: vertical scroll drives horizontal movement (pinned + scrubbed,
 * width-aware and resize-safe via invalidateOnRefresh).
 * Mobile / reduced motion: falls back to a native horizontal swipe track.
 */
export function HorizontalScroll({
  children,
  className,
  trackClassName,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const getX = () => -(track.scrollWidth - container.clientWidth);
          gsap.to(track, {
            x: getX,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${Math.abs(getX())}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "max-lg:overflow-x-auto max-lg:[scrollbar-width:none] lg:overflow-hidden",
        className
      )}
    >
      <div ref={trackRef} className={cn("flex w-max", trackClassName)}>
        {children}
      </div>
    </div>
  );
}
