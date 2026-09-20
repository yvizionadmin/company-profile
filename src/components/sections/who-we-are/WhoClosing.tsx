"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { Icon } from "./icons";

/**
 * Closing statement. Two oversized lines cascade in and, on desktop, drift
 * in opposite directions as you scroll. A lime glow swells behind them and
 * the CTA pulses with a nudging arrow.
 */
export function WhoClosing() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };

        gsap.fromTo(
          "[data-glow]",
          { scale: 0.55, autoAlpha: 0.4 },
          { scale: 1.2, autoAlpha: 1, ease: "none", scrollTrigger: scrub }
        );

        gsap.to("[data-arrow]", {
          x: 5,
          duration: 0.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        gsap.fromTo(
          "[data-cta-ring]",
          { scale: 1, autoAlpha: 0.55 },
          {
            scale: 1.35,
            autoAlpha: 0,
            duration: 1.8,
            ease: "power1.out",
            repeat: -1,
            repeatDelay: 0.6,
            immediateRender: false,
          }
        );
      });

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const scrub = { trigger: root, start: "top bottom", end: "bottom top", scrub: true };
        gsap.fromTo("[data-line-a]", { x: 56 }, { x: -56, ease: "none", scrollTrigger: scrub });
        gsap.fromTo("[data-line-b]", { x: -56 }, { x: 56, ease: "none", scrollTrigger: scrub });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-surface py-28 sm:py-40 lg:flex lg:min-h-svh lg:items-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          data-glow
          className="size-full rounded-full bg-[radial-gradient(circle,rgba(201,243,29,0.11),transparent_65%)]"
        />
      </div>

      <div className="container-x relative">
        <Reveal direction="up" distance={20}>
          <p className="label-mono mb-8 text-lime">Built for what&apos;s next.</p>
        </Reveal>
        <h2 className="text-[clamp(2.25rem,5.1vw,4.75rem)] leading-[1.06] font-extrabold tracking-[-0.055em] uppercase">
          <span data-line-a className="block">
            <TextReveal as="span" split="chars" stagger={0.02} className="block">
              <span className="text-paper">We don&apos;t just / </span>
              <span className="text-white/45">Build digital.</span>
            </TextReveal>
          </span>
          <span data-line-b className="mt-4 block">
            <TextReveal as="span" split="chars" stagger={0.02} delay={0.5} className="block">
              <span className="text-paper">We build / </span>
              <span className="text-lime">Experiences people use.</span>
            </TextReveal>
          </span>
        </h2>

        <Reveal delay={0.9} direction="up" distance={24}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            We combine deep E-commerce knowledge with modern design, engineering, and AI to help
            businesses build, launch, and evolve their digital E-commerce ecosystem.
          </p>
        </Reveal>

        <Reveal delay={1.05} direction="up" distance={24} className="mt-8">
          <Magnetic>
            <div className="relative">
              <span
                data-cta-ring
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-lime"
              />
              <TransitionLink
                href="/contact"
                data-cursor="link"
                className="btn btn-lime relative uppercase"
              >
                Let&apos;s build
                <span data-arrow className="inline-flex">
                  <Icon name="arrow" className="size-4" />
                </span>
              </TransitionLink>
            </div>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
