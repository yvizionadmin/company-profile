import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { services } from "@/lib/data";

/** Home services overview: numbered card grid with hover micro-interactions. */
export function ServicesGrid() {
  return (
    <section className="container-x py-24 sm:py-32">
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
            className="link-sweep label-mono text-white/60 hover:text-white"
          >
            All services →
          </TransitionLink>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.num} delay={(i % 4) * 0.07} distance={50}>
            <TransitionLink
              href="/services"
              data-cursor="link"
              className="group flex h-full min-h-64 flex-col justify-between rounded-2xl border border-line bg-ink-2 p-6 transition-colors duration-400 hover:border-lime/60 hover:bg-ink-3"
            >
              <span className="text-4xl font-extrabold text-lime">{service.num}</span>
              <span>
                <span className="block text-lg font-bold">{service.title}</span>
                <span className="mt-2 block text-sm leading-relaxed text-white/50">
                  {service.blurb.split(".")[0]}.
                </span>
                <span
                  aria-hidden="true"
                  className="mt-5 inline-block text-lime transition-transform duration-400 group-hover:translate-x-2"
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
