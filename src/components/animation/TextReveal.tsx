"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { useLoader } from "@/components/providers/LoaderProvider";

type TextRevealProps = {
  children: ReactNode;
  /** rendered element, defaults to div */
  as?: ElementType;
  className?: string;
  /** split granularity — lines by default; chars sparingly */
  split?: "lines" | "words" | "chars";
  /** scroll = animate when scrolled into view, load = after preloader */
  trigger?: "scroll" | "load";
  delay?: number;
  duration?: number;
  stagger?: number;
  /** ScrollTrigger start (scroll trigger only) */
  start?: string;
};

/**
 * Masked text reveal. Splits text (SplitText with line masking so nothing
 * overflows during the animation) and slides units up into place.
 * Reduced motion: no split, text simply stays visible.
 */
export function TextReveal({
  children,
  as = "div",
  className,
  split = "lines",
  trigger = "scroll",
  delay = 0,
  duration = motion.duration.slow,
  stagger,
  start = motion.start,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { loaded } = useLoader();
  const Tag = as as "div";

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      // Load-triggered reveals wait for the preloader to finish.
      if (trigger === "load" && !loaded) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });

      const unitStagger =
        stagger ??
        (split === "chars" ? motion.stagger.small : motion.stagger.normal);

      const instance = SplitText.create(el, {
        type: split === "lines" ? "lines" : `lines,${split}`,
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          const targets =
            split === "lines"
              ? self.lines
              : split === "words"
                ? self.words
                : self.chars;
          return gsap.from(targets, {
            yPercent: 115,
            duration,
            ease: motion.ease.smooth,
            stagger: unitStagger,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: el, start, once: true }
                : undefined,
          });
        },
      });

      return () => instance.revert();
    },
    { dependencies: [loaded, trigger, split], scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
