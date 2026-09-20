import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { Counter } from "@/components/animation/Counter";
import { GridBackdrop } from "./GridBackdrop";
import { SpotlightCard } from "./SpotlightCard";
import { whoWeAre } from "@/lib/data";

/** Three years-of-experience stat cards on a drawing blueprint grid. */
export function WhoExperience() {
  return (
    <section className="relative overflow-hidden bg-surface py-24 sm:py-32">
      <GridBackdrop cols={5} rows={3} />
      <div className="container-x relative">
        <Reveal direction="up" distance={20}>
          <p className="label-mono text-lime">Our experience</p>
        </Reveal>
        <TextReveal
          as="h2"
          className="mt-6 max-w-[11.5em] text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-paper"
        >
          Experience that goes beyond pixels and code.
        </TextReveal>
        <Reveal direction="up" distance={20} delay={0.15}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            With{" "}
            <strong className="font-semibold text-paper">
              10+ years of e-commerce and catalogue expertise
            </strong>{" "}
            and{" "}
            <strong className="font-semibold text-paper">
              15+ years across design and engineering
            </strong>
            , we understand what happens behind the storefront — not just what customers see.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:mt-16 md:grid-cols-3 md:gap-6">
          {whoWeAre.experience.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.12} distance={60} className="h-full">
              <SpotlightCard className="flex flex-col p-7 sm:p-8">
                <p className="label-mono text-lime">{item.label}</p>
                <p className="mt-5 text-[clamp(4.25rem,7vw,6rem)] leading-none font-extrabold tracking-[-0.06em] text-paper transition-transform duration-500 ease-out group-hover/card:translate-x-1">
                  <Counter value={item.value} suffix="+" duration={1.8} />
                </p>
                <p className="mt-6 text-sm font-bold tracking-wide text-paper uppercase">
                  {item.caption}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
