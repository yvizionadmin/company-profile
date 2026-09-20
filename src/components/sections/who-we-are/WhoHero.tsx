import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { HeroNetwork } from "./HeroNetwork";

/** "Who we are" hero: cascading headline beside the commerce system map. */
export function WhoHero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-20 lg:flex lg:min-h-svh lg:items-center lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-12">
        <div>
          <Reveal trigger="load" delay={0.1} direction="up" distance={24}>
            <p className="label-mono flex items-center gap-3 text-lime">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
              Who we are
            </p>
          </Reveal>

          <h1 className="mt-8 font-extrabold tracking-[-0.055em] uppercase">
            <TextReveal
              as="span"
              trigger="load"
              split="chars"
              delay={0.25}
              stagger={0.025}
              className="block text-[clamp(2.5rem,5.8vw,5.5rem)] leading-[0.98] text-paper"
            >
              We know /
            </TextReveal>
            <TextReveal
              as="span"
              trigger="load"
              split="chars"
              delay={0.45}
              stagger={0.025}
              className="block text-[clamp(2.5rem,5.8vw,5.5rem)] leading-[0.98] text-lime"
            >
              E - commerce.
            </TextReveal>
            <TextReveal
              as="span"
              trigger="load"
              split="words"
              delay={0.85}
              className="mt-4 block text-[clamp(1.05rem,5vw,1.9rem)] leading-[1.05] lg:mt-5 lg:text-[clamp(1.6rem,3vw,2.9rem)]"
            >
              <span className="text-white/45">We build / </span>
              <span className="text-paper">What comes next.</span>
            </TextReveal>
          </h1>

          <Reveal trigger="load" delay={1.2} direction="up" distance={24}>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-white/50">
              Deep e-commerce experience, brought together with design and technology.
            </p>
          </Reveal>
        </div>

        <HeroNetwork />
      </div>
    </section>
  );
}
