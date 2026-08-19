import type Lenis from "lenis";

/**
 * Shared handle to the app-wide Lenis instance so non-React code
 * (preloader, menu, transitions) can stop/start scrolling without prop drilling.
 */
export const scrollState: { lenis: Lenis | null } = { lenis: null };

export function lockScroll() {
  scrollState.lenis?.stop();
  document.documentElement.classList.add("overflow-hidden");
}

export function unlockScroll() {
  scrollState.lenis?.start();
  document.documentElement.classList.remove("overflow-hidden");
}
