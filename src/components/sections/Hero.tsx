"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { TextReveal } from "@/components/animation/TextReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { LineMarquee } from "./LineMarquee";
import { techStack } from "@/lib/data";

/**
 * Cinematic home hero: staggered masked title after the preloader,
 * subtle content parallax on scroll-out, tech marquee at the base.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  // Scroll-out choreography: content drifts up and fades as the hero exits.
  useGSAP(
    () => {
      const content = rootRef.current?.querySelector("[data-hero-content]");
      if (!content) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(content, {
          yPercent: -12,
          autoAlpha: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom 40%",
            scrub: true,
          },
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative flex min-h-svh flex-col overflow-hidden">
      {/* backdrop: radial glow + faint grid */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 rounded-full bg-lime/9 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px)] bg-[size:12rem_100%] opacity-40" />
      </div>

      <div
        data-hero-content
        className="container-x relative flex flex-1 flex-col justify-end pt-40 pb-16"
      >
        <Reveal trigger="load" delay={0.1} direction="up" distance={24}>
          <p className="label-mono flex items-center gap-2 text-lime">
            <span aria-hidden="true">✦</span> Middle East digital agency
          </p>
           <TextReveal
        as="h1"
        trigger="load"
        delay={0.25}
        className="display-xl mt-8 max-w-5xl"
      >
        Empowering your <span className="text-lime">digital future.</span> 
      </TextReveal>
       
        </Reveal>

        <div className="relative w-full overflow-hidden py-8">
          <TextReveal
            as="h1"
            trigger="load"
            split="chars"
            delay={0.25}
            className="absolute left-0 top-8 text-[140px] md:text-[200px] lg:text-[300px] leading-none font-extrabold"
            direction="left"
            exit
            exitStagger={0.02}
            exitRotation={35}
          >
            Let's
          </TextReveal>

          <TextReveal
            as="h1"
            trigger="load"
            split="chars"
            delay={0.35}
            className="absolute right-0 top-8 text-[140px] md:text-[200px] lg:text-[300px] leading-none font-extrabold text-lime"
            direction="right"
            exit
            exitStagger={0.02}
            exitRotation={35}
          >
            build
          </TextReveal>
        </div>

        <Reveal trigger="load" delay={0.7} direction="up" distance={30}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            Y-Vision helps businesses grow through websites, mobile apps,
            marketing, SEO, automation, and innovative technology solutions.
          </p>
        </Reveal>

        <Reveal trigger="load" delay={0.9} direction="up" distance={30}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <TransitionLink href="/contact" data-cursor="link" className="btn btn-lime">
                Book consultation
              </TransitionLink>
            </Magnetic>
            <Magnetic>
              <TransitionLink href="/services" data-cursor="link" className="btn btn-ghost">
                View services
              </TransitionLink>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <Reveal trigger="load" delay={1.1} direction="none" className="relative border-y border-line py-4">
        <LineMarquee items={techStack} mono itemClassName="text-white/50" speed={50} />
      </Reveal>
    </section>
  );
}
