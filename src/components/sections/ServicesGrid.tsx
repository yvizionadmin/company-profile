import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { services } from "@/lib/data";

/** Home services overview: numbered card grid with hover micro-interactions. */
export function ServicesGrid() {
  return (
    <section className="container-x py-16 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Reveal direction="up" distance={20}>
            <p className="label-mono text-lime">( Services )</p>
          </Reveal>
          <TextReveal as="h2" className="display-lg mt-4">
            Full-stack digital growth
          </TextReveal>
        </div>
        <Reveal delay={0.2}>
          <TransitionLink
            href="/services"
            data-cursor="link"
            className="link-sweep label-mono text-white/60 hover:text-white active:text-white"
          >
            All services →
          </TransitionLink>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.num} delay={(i % 4) * 0.07} distance={50}>
            <TransitionLink
              href="/services"
              data-cursor="link"
              className="group flex h-full min-h-44 flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-200 active:border-lime/60 active:bg-ink-3 sm:min-h-64 sm:transition-colors sm:duration-400 sm:hover:border-lime/60 sm:hover:bg-ink-3"
            >
              <span className="text-4xl font-extrabold text-lime">{service.num}</span>
              <span>
                <span className="block text-lg font-bold">{service.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-white/50">
                  {service.blurb.split(".")[0]}.
                </span>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-block text-lime transition-transform duration-400 group-hover:translate-x-2 group-active:translate-x-2"
                >
                  →
                </span>
              </span>
            </TransitionLink>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
