import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { Parallax } from "@/components/animation/Parallax";
import { DnaOrbit } from "./DnaOrbit";

/** "Commerce is in our DNA": headline beside the orbiting commerce diagram. */
export function WhoDna() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:flex lg:min-h-svh lg:items-center">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal direction="up" distance={20}>
            <p className="label-mono text-lime">E-commerce DNA</p>
          </Reveal>
          <TextReveal
            as="h2"
            split="chars"
            stagger={0.03}
            className="mt-6 max-w-[9.2em] text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-paper uppercase"
          >
            Commerce is in our DNA.
          </TextReveal>
        </div>

        <Parallax speed={0.12} className="w-full lg:justify-self-end">
          <DnaOrbit />
        </Parallax>
      </div>
    </section>
  );
}
