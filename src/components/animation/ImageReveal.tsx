"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
  duration?: number;
  delay?: number;
  start?: string;
};

const CLIP_FROM: Record<"up" | "left" | "right", string> = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Media reveal: clip-path wipe (or scale fade) with a counter-zoom on the
 * inner content. GPU-friendly (clip-path + transform only).
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  duration = motion.duration.slow,
  delay = 0,
  start = motion.start,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      const inner = el?.firstElementChild as HTMLElement | null;
      if (!el || !inner || prefersReducedMotion()) return;

      const trigger = { trigger: el, start, once: true } as const;

      if (direction === "scale") {
        gsap.fromTo(
          el,
          { autoAlpha: 0, scale: 0.92 },
          { autoAlpha: 1, scale: 1, duration, delay, ease: motion.ease.smooth, scrollTrigger: trigger }
        );
        return;
      }

      gsap.fromTo(
        el,
        { clipPath: CLIP_FROM[direction] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration,
          delay,
          ease: motion.ease.cinematic,
          scrollTrigger: trigger,
        }
      );
      gsap.fromTo(
        inner,
        { scale: 1.25 },
        { scale: 1, duration: duration * 1.15, delay, ease: motion.ease.cinematic, scrollTrigger: trigger }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {children}
    </div>
  );
}
