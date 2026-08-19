import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { values } from "@/lib/data";

/** Light editorial section: core values grid with a closing accent card. */
export function ValuesGrid() {
  return (
    <section className="bg-paper py-24 text-ink sm:py-32">
      <div className="container-x">
        <Reveal direction="up" distance={20}>
          <p className="label-mono text-ink/50">( Core values )</p>
        </Reveal>
        <TextReveal as="h2" className="display-xl mt-6 max-w-3xl">
          What we stand for
        </TextReveal>

        <div className="mt-16 grid border-t border-l border-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
            <Reveal
              key={value.num}
              delay={(i % 3) * 0.07}
              className="border-r border-b border-line-dark"
            >
              <div className="h-full p-8">
                <p className="font-mono text-xs text-ink/40">{value.num}</p>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">{value.text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2} className="border-r border-b border-line-dark">
            <div className="flex h-full min-h-52 items-end bg-ink p-8 text-white">
              <p className="text-lg leading-snug font-bold">
                Five principles. <span className="text-lime">One promise:</span>{" "}
                your growth, measured.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
