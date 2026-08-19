/**
 * Central motion tokens. Every major animation reads from here so the whole
 * site shares one motion language. Tune values here, not in components.
 */
export const motion = {
  duration: {
    fast: 0.4,
    normal: 0.8,
    slow: 1.2,
    cinematic: 1.6,
  },
  ease: {
    /** default entrance ease */
    smooth: "power3.out",
    /** big cinematic moves (overlays, hero, menu) */
    cinematic: "power4.inOut",
    /** exits */
    out: "power2.in",
    /** magnetic reset */
    elastic: "elastic.out(1, 0.4)",
  },
  stagger: {
    small: 0.04,
    normal: 0.08,
    large: 0.15,
  },
  /** default ScrollTrigger start position for reveals */
  start: "top 85%",
} as const;

export type MotionTokens = typeof motion;
