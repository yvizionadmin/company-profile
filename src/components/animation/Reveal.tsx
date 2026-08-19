"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { useLoader } from "@/components/providers/LoaderProvider";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  /** px travel distance */
  distance?: number;
  duration?: number;
  delay?: number;
  trigger?: "scroll" | "load";
  start?: string;
};

/** Generic fade/slide-in reveal for blocks (cards, buttons, media, copy). */
export function Reveal({
  children,
  as = "div",
  className,
  direction = "up",
  distance = 40,
  duration = motion.duration.normal,
  delay = 0,
  trigger = "scroll",
  start = motion.start,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { loaded } = useLoader();
  const Tag = as as "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      if (trigger === "load" && !loaded) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }

      const from: gsap.TweenVars = { autoAlpha: 0 };
      if (direction === "up") from.y = distance;
      if (direction === "down") from.y = -distance;
      if (direction === "left") from.x = distance;
      if (direction === "right") from.x = -distance;

      gsap.fromTo(el, from, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: motion.ease.smooth,
        scrollTrigger:
          trigger === "scroll" ? { trigger: el, start, once: true } : undefined,
      });
    },
    { dependencies: [loaded, trigger], scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
