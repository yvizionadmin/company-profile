"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** px per second */
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
};

/**
 * Seamless infinite marquee: content is rendered twice and translated by
 * -50% on a linear repeating tween (transform only — no layout work).
 * Reduced motion: static single row.
 */
export function Marquee({
  children,
  className,
  innerClassName,
  speed = 80,
  direction = "left",
  pauseOnHover = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const inner = innerRef.current;
      if (!container || !inner || prefersReducedMotion()) return;

      const distance = () => inner.scrollWidth / 2;
      const tween = gsap.fromTo(
        inner,
        { xPercent: direction === "left" ? 0 : -50 },
        {
          xPercent: direction === "left" ? -50 : 0,
          ease: "none",
          repeat: -1,
          duration: Math.max(distance() / speed, 1),
        }
      );

      // Keep perceived speed constant across resizes.
      const ro = new ResizeObserver(() => {
        tween.duration(Math.max(distance() / speed, 1));
      });
      ro.observe(inner);

      let enter: (() => void) | null = null;
      let leave: (() => void) | null = null;
      if (pauseOnHover) {
        enter = () => gsap.to(tween, { timeScale: 0, duration: 0.4 });
        leave = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
        container.addEventListener("mouseenter", enter);
        container.addEventListener("mouseleave", leave);
      }

      return () => {
        ro.disconnect();
        if (enter) container.removeEventListener("mouseenter", enter);
        if (leave) container.removeEventListener("mouseleave", leave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={innerRef} className={cn("flex w-max", innerClassName)}>
        <div className="flex shrink-0 items-center">{children}</div>
        {/* duplicate for the seamless loop; clipped & inert when static */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
