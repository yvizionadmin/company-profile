"use client";

import { useMediaQuery } from "./useMediaQuery";

/** True when the user asked the OS for reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Non-hook check for imperative code paths. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
