"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { useLoader } from "@/components/providers/LoaderProvider";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Magnetic } from "@/components/animation/Magnetic";
import { Menu } from "./Menu";
import { site } from "@/lib/data";

/**
 * Floating pill navbar: enters after the preloader, hides on scroll down,
 * returns on scroll up. Opens the fullscreen menu.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loaded } = useLoader();
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      if (!loaded) {
        gsap.set(el, { yPercent: -180, autoAlpha: 0 });
        return;
      }

      gsap.to(el, {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });

      // Hide on scroll down, show on scroll up.
      let hidden = false;
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const shouldHide = self.direction === 1 && self.scroll() > 200;
          if (shouldHide !== hidden) {
            hidden = shouldHide;
            gsap.to(el, {
              yPercent: hidden ? -180 : 0,
              duration: 0.5,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        },
      });
      return () => st.kill();
    },
    { dependencies: [loaded], scope: ref }
  );

  return (
    <>
      <header
        ref={ref}
        className="fixed inset-x-0 top-4 z-60 flex justify-center px-4"
      >
        <div className="flex items-center gap-1 rounded-full bg-white p-1.5 pl-4 text-ink shadow-xl shadow-black/30">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            data-cursor="link"
            aria-label="Open menu"
            className="flex items-center gap-2.5 pr-3"
          >
            <span className="flex flex-col gap-1" aria-hidden="true">
              <span className="h-0.5 w-4 bg-ink" />
              <span className="h-0.5 w-4 bg-ink" />
            </span>
            <span className="label-mono">Menu</span>
          </button>
          <TransitionLink
            href="/"
            data-cursor="link"
            className="px-4 text-base font-extrabold tracking-tight sm:px-6"
          >
            {site.wordmark}
          </TransitionLink>
          <Magnetic strength={0.2}>
            <TransitionLink
              href="/contact"
              data-cursor="link"
              className="btn bg-ink py-2.5! text-white hover:bg-ink-3"
            >
              Book a call <span aria-hidden="true">↗</span>
            </TransitionLink>
          </Magnetic>
        </div>
      </header>
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
