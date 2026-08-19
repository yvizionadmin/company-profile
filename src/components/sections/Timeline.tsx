import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { timeline } from "@/lib/data";
import { cn } from "@/lib/utils";

/** "The road so far" — alternating timeline along a central spine. */
export function Timeline() {
  return (
    <section className="container-x py-24 sm:py-32">
      <div className="text-center">
        <Reveal direction="up" distance={20}>
          <p className="label-mono text-lime">( Our journey )</p>
        </Reveal>
        <TextReveal as="h2" className="display-lg mt-4">
          The road so far
        </TextReveal>
      </div>

      <div className="relative mx-auto mt-20 max-w-3xl">
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-4 w-px bg-line sm:left-1/2"
        />
        <ol className="space-y-16">
          {timeline.map((entry, i) => {
            const left = i % 2 === 0;
            return (
              <li key={entry.year} className="relative pl-12 sm:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 left-4 size-2.5 -translate-x-1/2 rounded-full bg-lime sm:left-1/2"
                />
                <Reveal
                  direction={left ? "right" : "left"}
                  distance={40}
                  className={cn(
                    "sm:w-[calc(50%-2.5rem)]",
                    left ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                  )}
                >
                  <p className="font-mono text-sm text-lime">{entry.year}</p>
                  <h3 className="mt-2 text-xl font-bold tracking-tight">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{entry.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
