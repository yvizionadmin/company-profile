"use client";

import { useSyncExternalStore } from "react";

/** SSR-safe media query hook (returns `false` on the server / first paint). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
}
