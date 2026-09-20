"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { services, site } from "@/lib/data";
import { TransitionLink } from "@/components/transition/TransitionLink";

type MenuProps = {
  open: boolean;
  onClose: () => void;
};

const EXPLORE = [
  { label: "About Us", href: "/about" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "Works", href: "/" },
  { label: "Contact", href: "/contact" },
];

/**
 * Fullscreen menu overlay: white panel drops in, items stagger up.
 * Close reverses the same timeline.
 */
export function Menu({ open, onClose }: MenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const panel = root.querySelector("[data-menu-panel]");
      const items = root.querySelectorAll("[data-menu-item]");

      const tl = gsap
        .timeline({ paused: true })
        .set(root, { autoAlpha: 1 })
        .fromTo(
          panel,
          { yPercent: -105 },
          { yPercent: 0, duration: 0.8, ease: motion.ease.cinematic }
        )
        .fromTo(
          items,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: motion.duration.fast,
            ease: motion.ease.smooth,
            stagger: motion.stagger.small,
          },
          "-=0.35"
        );
      tl.eventCallback("onReverseComplete", () => gsap.set(root, { autoAlpha: 0 }));
      tlRef.current = tl;

      return () => {
        tlRef.current = null;
      };
    },
    { scope: rootRef }
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      lockScroll();
      if (prefersReducedMotion()) tl.progress(1);
      else tl.timeScale(1).play();
    } else {
      unlockScroll();
      if (prefersReducedMotion()) tl.progress(0);
      else tl.timeScale(1.4).reverse();
    }
  }, [open]);

  // Esc closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className="invisible fixed inset-0 z-70 opacity-0"
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/60" onClick={onClose} />
      <div
        data-menu-panel
        data-lenis-prevent
        className="relative m-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto overscroll-contain rounded-3xl bg-white p-6 pt-0 text-ink shadow-2xl sm:p-10 lg:m-5 lg:p-12 will-change-transform"
      >
        {/* header row: pinned above the scrolling content below */}
        <div
          className="sticky top-0 z-10 -mx-6 flex items-center justify-between border-b border-ink/10 bg-white p-6 pb-4 sm:mx-0 sm:px-0 lg:static lg:mx-0 lg:border-0 lg:bg-transparent lg:px-0 lg:pb-6"
          data-menu-item
        >
          <button
            type="button"
            onClick={onClose}
            data-cursor="link"
            className="label-mono flex items-center gap-2 text-ink"
          >
            <span aria-hidden="true" className="text-base leading-none">✕</span> Menu
          </button>
          <TransitionLink
            href="/"
            onNavigate={onClose}
            className="text-lg font-extrabold tracking-tight"
          >
            {site.wordmark}
          </TransitionLink>
          <TransitionLink
            href="/contact"
            onNavigate={onClose}
            data-cursor="link"
            className="btn bg-ink text-white hover:bg-ink-3 max-sm:hidden"
          >
            Book a call <span aria-hidden="true">↗</span>
          </TransitionLink>
        </div>

        {/* services */}
        <p className="label-mono mt-8 text-ink/50 sm:mt-10" data-menu-item>
          Service
        </p>
        <div className="mt-4 max-sm:-mx-6 max-sm:border-t max-sm:border-ink/10 sm:mt-6 sm:grid sm:gap-x-10 sm:gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <TransitionLink
              key={s.num}
              href="/services"
              onNavigate={onClose}
              data-menu-item
              data-cursor="link"
              className="group block border-b border-ink/10 px-6 py-5 transition-colors duration-200 active:bg-ink/[0.04] sm:border-0 sm:px-0 sm:py-0 sm:active:bg-transparent"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-ink/40">{s.num}</span>
                  <span className="display-md transition-colors duration-300 group-hover:text-ink/50">
                    {s.title === "Mobile App Development" ? "Mobile App" : s.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-lg text-ink/25 transition-transform duration-200 group-active:translate-x-1 sm:hidden"
                >
                  →
                </span>
              </span>
              <span className="mt-2 block pl-8 text-sm text-ink/55">{s.short}</span>
            </TransitionLink>
          ))}
        </div>

        {/* explore */}
        <p className="label-mono mt-10 text-ink/50 sm:mt-12" data-menu-item>
          Explore
        </p>
        <div
          className="mt-4 max-sm:-mx-6 max-sm:border-t max-sm:border-ink/10 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-3"
          data-menu-item
        >
          {EXPLORE.map((item) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              onNavigate={onClose}
              data-cursor="link"
              className="link-sweep flex items-center justify-between gap-3 border-b border-ink/10 px-6 py-4 text-2xl font-semibold tracking-tight active:text-ink/50 sm:border-0 sm:px-0 sm:py-0 sm:active:text-inherit"
            >
              {item.label}
              <span aria-hidden="true" className="text-lg text-ink/25 sm:hidden">
                →
              </span>
            </TransitionLink>
          ))}
        </div>

        {/* mobile CTA: header CTA is hidden below sm to avoid crowding, so
            give touch users a reachable, full-width conversion action */}
        <div className="mt-8 sm:hidden" data-menu-item>
          <TransitionLink
            href="/contact"
            onNavigate={onClose}
            data-cursor="link"
            className="btn w-full justify-center bg-ink text-base text-white active:bg-ink-3"
          >
            Book a call <span aria-hidden="true">↗</span>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
