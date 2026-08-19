import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { HorizontalScroll } from "@/components/animation/HorizontalScroll";
import { Parallax } from "@/components/animation/Parallax";
import { works } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Selected work: desktop scroll-driven horizontal showcase
 * (native swipe track on mobile). Cards use the "view" cursor state.
 */
export function Work() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x flex flex-wrap items-end justify-between gap-6 pb-14">
        <div>
          <Reveal direction="up" distance={20}>
            <p className="label-mono text-lime">( Selected work )</p>
          </Reveal>
          <TextReveal as="h2" className="display-lg mt-4">
            Proof, not promises
          </TextReveal>
        </div>
        <Reveal delay={0.2}>
          <p className="label-mono text-white/40">Drag or scroll</p>
        </Reveal>
      </div>

      <HorizontalScroll
        className="max-lg:px-5"
        trackClassName="items-stretch gap-5 lg:h-svh lg:items-center lg:px-16"
      >
        {works.map((work) => (
          <article
            key={work.num}
            data-cursor="view"
            className={cn(
              "group relative flex h-[65vh] w-[82vw] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-line bg-linear-to-br p-8 sm:w-[60vw] lg:h-[72vh] lg:w-[52vw]",
              work.art
            )}
          >
            <Parallax speed={-0.12} className="pointer-events-none absolute -right-6 -bottom-10 select-none">
              <span className="text-[12rem] leading-none font-extrabold text-white/5 sm:text-[18rem]">
                {work.num}
              </span>
            </Parallax>

            <div className="flex items-start justify-between">
              <span className="label-mono text-white/50">
                {work.sector} ✦ {work.year}
              </span>
              <span className="font-mono text-sm text-lime">{work.num}</span>
            </div>

            <div className="relative">
              <h3 className="display-md transition-transform duration-500 group-hover:-translate-y-1">
                {work.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.65rem] tracking-wider text-white/60 uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </HorizontalScroll>
    </section>
  );
}
