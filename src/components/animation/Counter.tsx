"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Counts from 0 to `value` when scrolled into view.
 * Server-renders the final value (SEO / no-JS), rewinds only when animating.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;
      const state = { v: 0 };
      el.textContent = format(0);

      gsap.to(state, {
        v: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(state.v);
        },
      });
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
