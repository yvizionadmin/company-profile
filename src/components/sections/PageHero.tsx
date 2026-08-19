import type { ReactNode } from "react";
import { TextReveal } from "@/components/animation/TextReveal";
import { Reveal } from "@/components/animation/Reveal";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  copy?: string;
};

/** Inner-page hero: mono label, oversized masked title, supporting copy. */
export function PageHero({ label, title, copy }: PageHeroProps) {
  return (
    <section className="container-x pt-44 pb-20 sm:pt-52 sm:pb-28">
      <Reveal trigger="load" delay={0.1} direction="up" distance={24}>
        <p className="label-mono text-lime">( {label} )</p>
      </Reveal>
      <TextReveal
        as="h1"
        trigger="load"
        delay={0.25}
        className="display-xl mt-8 max-w-5xl"
      >
        {title}
      </TextReveal>
      {copy ? (
        <Reveal trigger="load" delay={0.7} direction="up" distance={30}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            {copy}
          </p>
        </Reveal>
      ) : null}
    </section>
  );
}
