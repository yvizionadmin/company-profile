"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type CursorMode = "default" | "view" | "drag" | "link";

const LABELS: Record<Exclude<CursorMode, "default">, string> = {
  view: "View",
  drag: "Drag",
  link: "→",
};

/**
 * Custom cursor (desktop pointer devices only). A small dot trails the
 * pointer; over `[data-cursor="view" | "drag" | "link"]` elements it expands
 * into a labelled lime bubble. Rendered with transforms only.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const reduced = useReducedMotion();
  const enabled = isDesktop && !reduced;

  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const shownRef = useRef(false);
  const [mode, setMode] = useState<CursorMode>("default");

  // Track hovered [data-cursor] targets via event delegation.
  useEffect(() => {
    if (!enabled) return;
    const onOver = (e: Event) => {
      const target = e.target;
      const host =
        target instanceof Element ? target.closest<HTMLElement>("[data-cursor]") : null;
      setMode((host?.dataset.cursor as CursorMode | undefined) ?? "default");
    };
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, [enabled]);

  // Follow the pointer with interpolated transforms.
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!enabled || !root) return;
      const xTo = gsap.quickTo(root, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(root, "y", { duration: 0.35, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        if (!shownRef.current) {
          shownRef.current = true;
          gsap.set(root, { x: e.clientX, y: e.clientY });
          gsap.to(root, { autoAlpha: 1, duration: 0.25 });
        }
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      return () => window.removeEventListener("mousemove", onMove);
    },
    { dependencies: [enabled] }
  );

  // Morph between dot and labelled bubble.
  useGSAP(
    () => {
      if (!enabled) return;
      const active = mode !== "default";
      gsap.to(bubbleRef.current, {
        scale: active ? 1 : 0,
        duration: 0.4,
        ease: active ? "back.out(1.8)" : "power3.out",
      });
      gsap.to(dotRef.current, { scale: active ? 0 : 1, duration: 0.3, ease: "power3.out" });
    },
    { dependencies: [mode, enabled] }
  );

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-95 opacity-0"
    >
      <div
        ref={dotRef}
        className="absolute -top-1 -left-1 size-2 rounded-full bg-lime mix-blend-difference"
      />
      <div
        ref={bubbleRef}
        className="absolute -top-10 -left-10 flex size-20 scale-0 items-center justify-center rounded-full bg-lime text-sm font-semibold text-ink"
      >
        {mode !== "default" ? LABELS[mode] : ""}
      </div>
    </div>
  );
}
