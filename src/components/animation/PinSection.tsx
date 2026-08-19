"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/animations/gsap";

type PinSectionProps = {
  children: ReactNode;
  className?: string;
  /** how much scroll distance the pin lasts, e.g. "+=150%" */
  end?: string;
  scrub?: boolean | number;
  /**
   * Build the scrubbed timeline for the pinned duration.
   * Receives the timeline and the section root for querySelector targeting.
   */
  build?: (tl: gsap.core.Timeline, root: HTMLDivElement) => void;
};

/**
 * Pinned, scrub-driven storytelling section (desktop only — on mobile and
 * under reduced motion the content flows normally without pinning).
 */
export function PinSection({
  children,
  className,
  end = "+=150%",
  scrub = 0.8,
  build,
}: PinSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end,
              pin: true,
              scrub,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          build?.(tl, root);
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
