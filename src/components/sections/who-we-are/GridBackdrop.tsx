"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GridBackdropProps = {
  className?: string;
  /** vertical line count (spaced evenly across the width) */
  cols?: number;
  /** horizontal line count (spaced evenly across the height) */
  rows?: number;
};

/**
 * Faint blueprint grid behind a section. Lines draw in from the middle
 * outwards when the section scrolls into view. Purely decorative.
 */
export function GridBackdrop({ className, cols = 5, rows = 3 }: GridBackdropProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrollTrigger = { trigger: el, start: "top 80%", once: true };
        gsap.from("[data-grid-v]", {
          scaleY: 0,
          duration: motion.duration.cinematic,
          ease: motion.ease.cinematic,
          stagger: { each: motion.stagger.normal, from: "center" },
          scrollTrigger,
        });
        gsap.from("[data-grid-h]", {
          scaleX: 0,
          duration: motion.duration.cinematic,
          ease: motion.ease.cinematic,
          stagger: { each: motion.stagger.large, from: "center" },
          scrollTrigger,
        });
      });
      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_70%_65%_at_50%_50%,#000_30%,transparent_100%)]",
        className
      )}
    >
      {Array.from({ length: cols }, (_, i) => (
        <span
          key={`v${i}`}
          data-grid-v
          className="absolute inset-y-0 w-px origin-top bg-white/[0.06]"
          style={{ left: `${((i + 1) / (cols + 1)) * 100}%` }}
        />
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <span
          key={`h${i}`}
          data-grid-h
          className="absolute inset-x-0 h-px origin-left bg-white/[0.06]"
          style={{ top: `${((i + 1) / (rows + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
}
