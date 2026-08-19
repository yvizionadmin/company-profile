"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { useLoader } from "@/components/providers/LoaderProvider";
import { lockScroll, unlockScroll } from "@/lib/scroll";

/**
 * Entry preloader: progress count → brand reveal → panel sweep.
 * ~1.3s total. Scroll is locked while visible; the hero entrance is gated
 * on `useLoader().loaded`, which flips when this finishes.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const { finish } = useLoader();
  const rootRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const done = () => {
        setHidden(true);
        finish();
        unlockScroll();
        ScrollTrigger.refresh();
      };

      if (prefersReducedMotion()) {
        done();
        return;
      }

      lockScroll();
      const progress = { value: 0 };

      const tl = gsap.timeline({ onComplete: done });
      tl.to(progress, {
        value: 100,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: () => {
          if (percentRef.current) {
            percentRef.current.textContent = String(Math.round(progress.value));
          }
          if (barRef.current) {
            gsap.set(barRef.current, { scaleX: progress.value / 100 });
          }
        },
      })
        .fromTo(
          brandRef.current,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.6, ease: motion.ease.smooth },
          "-=0.35"
        )
        .to(root, {
          yPercent: -100,
          duration: 0.7,
          ease: motion.ease.cinematic,
          delay: 0.2,
        });
    },
    { scope: rootRef }
  );

  if (hidden) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-90 flex flex-col justify-between bg-ink px-6 py-8 sm:px-12"
      aria-hidden="true"
    >
      <span className="label-mono text-white/40">( Loading experience )</span>

      <div className="flex items-end justify-between">
        <span className="block overflow-hidden text-3xl font-extrabold tracking-tight sm:text-5xl">
          <span ref={brandRef} className="block will-change-transform">
            Y-VISION<span className="text-lime">.</span>
          </span>
        </span>
        <span className="font-mono text-6xl font-medium text-lime tabular-nums sm:text-8xl">
          <span ref={percentRef}>0</span>
        </span>
      </div>

      <div className="h-px w-full bg-white/10">
        <div ref={barRef} className="h-px origin-left scale-x-0 bg-lime" />
      </div>
    </div>
  );
}
