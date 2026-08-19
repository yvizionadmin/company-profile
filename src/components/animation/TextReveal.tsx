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
  /** direction the text should come from when revealed */
  direction?: "up" | "left" | "right";
  /** when true, animate a 'shatter' exit when the section leaves viewport */
  exit?: boolean;
  /** stagger for the exit pieces */
  exitStagger?: number;
  /** rotation range for exit pieces (deg) */
  exitRotation?: number;
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
  direction = "up",
  delay = 0,
  duration = motion.duration.slow,
  stagger,
  exit = false,
  exitStagger = 0.02,
  exitRotation = 25,
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
          const fromVars: any =
            direction === "up"
              ? { yPercent: 115 }
              : direction === "left"
              ? { xPercent: -115 }
              : { xPercent: 115 };

          const tl = gsap.from(targets, {
            ...fromVars,
            duration,
            ease: motion.ease.smooth,
            stagger: unitStagger,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: el, start, once: true }
                : undefined,
          });

          if (exit) {
            try {
              const ScrollTrigger = (gsap as any).ScrollTrigger || (gsap as any).core?.ScrollTrigger || (window as any).ScrollTrigger;
              if (ScrollTrigger) {
                ScrollTrigger.create({
                  trigger: el,
                  start: "top center",
                  end: "bottom top",
                  onLeave: () => {
                    gsap.to(targets, {
                      y: () => gsap.utils.random(40, 120),
                      x: () => gsap.utils.random(-200, 200),
                      rotation: () => gsap.utils.random(-exitRotation, exitRotation),
                      autoAlpha: 0,
                      duration: 0.8,
                      ease: motion.ease.smooth,
                      stagger: exitStagger,
                    });
                  },
                  onEnterBack: () => {
                    gsap.to(targets, {
                      x: 0,
                      y: 0,
                      rotation: 0,
                      autoAlpha: 1,
                      duration: 0.6,
                      ease: motion.ease.smooth,
                      stagger: exitStagger,
                    });
                  },
                });
              }
            } catch (e) {
              // ignore if ScrollTrigger unavailable
            }
          }

          return tl;
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
