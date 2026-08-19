import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { approach } from "@/lib/data";

/**
 * "How we drive growth" — sticky heading column (CSS sticky, zero JS cost)
 * while the numbered steps reveal on scroll.
 */
export function Approach() {
  return (
    <section className="border-t border-line">
      <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal direction="up" distance={20}>
            <p className="label-mono text-lime">( The approach )</p>
          </Reveal>
          <TextReveal as="h2" className="display-lg mt-4">
            How we drive growth
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-white/60">
              A proven process that turns marketing from a cost centre into
              your most reliable growth engine.
            </p>
          </Reveal>
        </div>

        <div>
          {approach.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.05} distance={50}>
              <div className="group border-t border-line py-10 transition-colors duration-400 last:border-b hover:border-lime/40">
                <div className="flex items-baseline gap-6">
                  <span className="font-mono text-sm text-lime">{step.num}</span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">{step.title}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-white/55">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
