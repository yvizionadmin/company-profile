import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { Parallax } from "@/components/animation/Parallax";
import { DnaOrbit } from "./DnaOrbit";
import { FlowChain } from "./FlowChain";
import { whoWeAre } from "@/lib/data";

/** "E-commerce is in our DNA": headline beside the orbiting commerce diagram. */
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
            className="mt-6 max-w-[10.5em] text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-paper uppercase"
          >
            E-commerce is in our DNA.
          </TextReveal>

          <div className="mt-10 max-w-xl lg:mt-12">
            <Reveal direction="up" distance={20} delay={0.1}>
              <h3 className="text-[clamp(1.25rem,1.8vw,1.6rem)] font-extrabold tracking-[-0.03em] text-paper uppercase">
                We understand the ecosystem.
              </h3>
            </Reveal>
            <Reveal direction="up" distance={20} delay={0.2}>
              <FlowChain items={whoWeAre.ecosystem} className="mt-5" />
            </Reveal>
            <Reveal direction="up" distance={20} delay={0.3}>
              <p className="mt-6 text-sm leading-relaxed text-white/55 sm:text-base">
                From managing products and catalogue structures to building storefronts,
                marketplaces, seller ecosystems, order management, customer experiences, and
                growth platforms — we understand how the pieces connect.
              </p>
            </Reveal>
          </div>
        </div>

        <Parallax speed={0.12} className="w-full lg:justify-self-end">
          <DnaOrbit />
        </Parallax>
      </div>
    </section>
  );
}
