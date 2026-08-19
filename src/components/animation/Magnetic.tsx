"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** how strongly the element follows the cursor (0.1–0.5 sensible) */
  strength?: number;
};

/**
 * Magnetic hover: element subtly follows the cursor and springs back on
 * leave. Desktop pointer devices only; inert on touch and reduced motion.
 */
export function Magnetic({ children, className, strength = 0.25 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: motion.ease.smooth });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: motion.ease.smooth });

          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * strength);
            yTo((e.clientY - (r.top + r.height / 2)) * strength);
          };
          const onLeave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.9,
              ease: motion.ease.elastic,
              overwrite: true,
            });
          };

          el.addEventListener("mousemove", onMove);
          el.addEventListener("mouseleave", onLeave);
          return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
          };
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
