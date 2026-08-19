"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Parallax intensity: 0.2 = subtle, 0.5 = pronounced.
   * Positive moves against scroll (classic depth), negative with it.
   */
  speed?: number;
  direction?: "vertical" | "horizontal";
};

/** Scrub-linked parallax. Disabled under reduced motion. */
export function Parallax({
  children,
  className,
  speed = 0.2,
  direction = "vertical",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const travel = speed * 160;
        const axis = direction === "vertical" ? "y" : "x";
        gsap.fromTo(
          el,
          { [axis]: travel },
          {
            [axis]: -travel,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
