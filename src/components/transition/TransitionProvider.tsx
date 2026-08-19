"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "@/lib/scroll";

type TransitionContextValue = {
  /** Animated navigation: overlay in → route change → overlay out. */
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function useTransition(): TransitionContextValue {
  return useContext(TransitionContext);
}

/**
 * Page transition overlay. Only link clicks play the exit animation —
 * back/forward, refresh and direct URLs behave natively (no overlay).
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const coveringRef = useRef(false);

  useGSAP(() => {
    if (overlayRef.current) gsap.set(overlayRef.current, { yPercent: 100 });
  });

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || coveringRef.current) return;
      const overlay = overlayRef.current;
      if (!overlay || prefersReducedMotion()) {
        router.push(href);
        return;
      }
      coveringRef.current = true;
      lockScroll();
      gsap.fromTo(
        overlay,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: motion.ease.cinematic,
          onComplete: () => router.push(href),
        }
      );
    },
    [pathname, router]
  );

  // New route mounted → sweep the overlay away.
  useEffect(() => {
    if (!coveringRef.current) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, {
      yPercent: -100,
      duration: 0.65,
      delay: 0.15,
      ease: motion.ease.cinematic,
      onComplete: () => {
        gsap.set(overlay, { yPercent: 100 });
        coveringRef.current = false;
        unlockScroll();
      },
    });
  }, [pathname]);

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-80 flex translate-y-full items-center justify-center bg-ink-2"
      >
        <span className="label-mono text-lime">Y-VISION</span>
      </div>
    </TransitionContext.Provider>
  );
}
