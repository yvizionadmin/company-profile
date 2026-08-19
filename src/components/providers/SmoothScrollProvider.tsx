"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { scrollState } from "@/lib/scroll";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * App-wide smooth scroll. One Lenis instance driven by the GSAP ticker
 * (single RAF loop) and kept in sync with ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion — native scroll remains.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.12,
      anchors: true,
    });
    scrollState.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      scrollState.lenis = null;
    };
  }, []);

  // On route change: jump to top and re-measure all triggers for the new DOM.
  useEffect(() => {
    scrollState.lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    // Wait a frame so the new page has painted before measuring.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return <>{children}</>;
}
