"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { GridBackdrop } from "./GridBackdrop";
import { SpotlightCard } from "./SpotlightCard";
import { Icon } from "./icons";
import { whoWeAre } from "@/lib/data";

/**
 * People + expertise. The three discipline cards slide in from different
 * sides and settle into one row (the "one team" idea), icons spin into
 * place and the copy follows.
 */
export function WhoExpertise() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          wide: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { wide } = ctx.conditions as { wide: boolean };
          const cards = gsap.utils.toArray<HTMLElement>("[data-exp-card]");

          cards.forEach((card, i) => {
            const from: gsap.TweenVars = wide
              ? i === 0
                ? { x: -110 }
                : i === cards.length - 1
                  ? { x: 110 }
                  : { y: 90 }
              : { y: 70 };

            gsap
              .timeline({
                defaults: { ease: motion.ease.smooth },
                scrollTrigger: { trigger: card, start: "top 88%", once: true },
              })
              .from(card, { ...from, autoAlpha: 0, duration: motion.duration.slow })
              .from(
                card.querySelector("[data-exp-icon]"),
                { scale: 0, rotation: -120, duration: motion.duration.normal, ease: "back.out(2)" },
                "-=0.7"
              )
              .from(
                card.querySelectorAll("[data-exp-copy]"),
                { y: 22, autoAlpha: 0, duration: motion.duration.normal, stagger: motion.stagger.normal },
                "-=0.5"
              );
          });
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <GridBackdrop cols={5} rows={3} />
      <div className="container-x relative">
        <Reveal direction="up" distance={20}>
          <p className="label-mono text-lime">People + expertise</p>
        </Reveal>
        <TextReveal
          as="h2"
          className="mt-6 max-w-[11.5em] text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em] uppercase"
        >
          <span className="text-paper">Experience / </span>
          <span className="text-white/45">Behind the experience.</span>
        </TextReveal>

        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
          {whoWeAre.expertise.map((item) => (
            <div key={item.label} data-exp-card>
              <SpotlightCard className="flex min-h-64 flex-col justify-between p-7">
                <span
                  data-exp-icon
                  className="grid size-13 place-items-center rounded-full bg-ink text-lime transition-colors duration-300 group-hover/card:bg-lime group-hover/card:text-ink"
                >
                  <Icon name={item.icon} className="size-5" />
                </span>
                <div>
                  <p data-exp-copy className="label-mono text-[0.7rem] font-bold text-lime">
                    {item.label}
                  </p>
                  <p data-exp-copy className="mt-3 text-sm leading-relaxed text-white/55">
                    {item.text}
                  </p>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center sm:mt-16">
          <Reveal direction="up" distance={16}>
            <p className="label-mono text-lime">One team</p>
          </Reveal>
          <TextReveal
            as="p"
            split="chars"
            stagger={0.02}
            delay={0.1}
            className="mt-2 text-[clamp(1.1rem,1.7vw,1.5rem)] font-extrabold tracking-[-0.02em] text-paper uppercase"
          >
            Experience, together.
          </TextReveal>
        </div>
      </div>
    </section>
  );
}
