"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { GridBackdrop } from "./GridBackdrop";
import { Icon } from "./icons";
import { whoWeAre } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Idea → Scale. The steps rise in, then light up one after another as the
 * section is scrolled (scrubbed), the connector between cards filling lime
 * on the way. A vertical stepper on phones/tablets, one row from `lg` up.
 * At rest (or with reduced motion) only "Idea" is lit.
 */
export function WhoJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const list = listRef.current;
      if (!list) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]");

        gsap.from(steps, {
          y: 56,
          autoAlpha: 0,
          duration: motion.duration.slow,
          ease: motion.ease.smooth,
          stagger: motion.stagger.large,
          scrollTrigger: { trigger: list, start: "top 88%", once: true },
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: list, start: "top 80%", end: "top 25%", scrub: 0.6 },
        });

        steps.forEach((step, i) => {
          if (i === 0) return;
          const at = i - 1;
          const prev = steps[i - 1];
          const linkH = prev.querySelector("[data-link-fill]");
          const linkV = prev.querySelector("[data-link-fill-v]");
          if (linkH) tl.fromTo(linkH, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, at);
          if (linkV) tl.fromTo(linkV, { scaleY: 0 }, { scaleY: 1, duration: 0.6 }, at);
          tl.fromTo(
            step.querySelector("[data-on]"),
            { autoAlpha: 0, scale: 0.4 },
            { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
            at + 0.5
          )
            .fromTo(
              step.querySelector("[data-ring]"),
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.4 },
              at + 0.5
            )
            .fromTo(
              step.querySelector("[data-label]"),
              { opacity: 0.4 },
              { opacity: 1, duration: 0.4 },
              at + 0.5
            );
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  const last = whoWeAre.journey.length - 1;

  return (
    <section ref={rootRef} className="relative overflow-hidden py-24 sm:py-32">
      <GridBackdrop cols={5} rows={2} />
      <div className="container-x relative">
        <Reveal direction="up" distance={20}>
          <p className="label-mono text-lime">From idea to experience</p>
        </Reveal>
        <TextReveal
          as="h2"
          className="mt-6 max-w-[11.8em] text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-paper"
        >
          A continuous journey from idea to experience.
        </TextReveal>

        <ol
          ref={listRef}
          className="mt-12 grid gap-4 sm:mt-16 lg:grid-cols-5 lg:gap-6"
        >
          {whoWeAre.journey.map((step, i) => (
            <li key={step.label} data-step className="relative">
              <div className="relative flex h-full items-center gap-4 rounded-3xl border border-line bg-card px-5 py-4 transition-transform duration-300 hover:-translate-y-1 lg:flex-col lg:px-4 lg:pt-6 lg:pb-5">
                <span className="relative grid size-13 place-items-center rounded-full bg-ink text-lime">
                  <Icon name={step.icon} className="size-5" />
                  <span
                    data-on
                    className={cn(
                      "absolute inset-0 grid place-items-center rounded-full bg-lime text-ink",
                      i > 0 && "opacity-0"
                    )}
                  >
                    <Icon name={step.icon} className="size-5" />
                  </span>
                </span>
                <span
                  data-label
                  className={cn(
                    "label-mono font-bold text-paper",
                    i > 0 && "opacity-40"
                  )}
                >
                  {step.label}
                </span>
                <span
                  data-ring
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-3xl border border-lime/50",
                    i > 0 && "opacity-0"
                  )}
                />
              </div>
              {i < last ? (
                <>
                  {/* horizontal connector (one-row layout) */}
                  <span
                    aria-hidden="true"
                    className="absolute top-[3.125rem] left-full hidden h-px w-6 bg-white/10 lg:block"
                  >
                    <span
                      data-link-fill
                      className="absolute inset-0 origin-left bg-lime"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                  {/* vertical connector (stacked layout), under the icon centre */}
                  <span
                    aria-hidden="true"
                    className="absolute top-full left-[2.875rem] h-4 w-px -translate-x-1/2 bg-white/10 lg:hidden"
                  >
                    <span
                      data-link-fill-v
                      className="absolute inset-0 origin-top bg-lime"
                      style={{ transform: "scaleY(0)" }}
                    />
                  </span>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
