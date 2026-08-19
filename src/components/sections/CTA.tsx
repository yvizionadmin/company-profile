import { TextReveal } from "@/components/animation/TextReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { TransitionLink } from "@/components/transition/TransitionLink";

type CTAProps = {
  label?: string;
  title?: string;
  copy?: string;
};

/** Closing call-to-action shared across pages. */
export function CTA({
  label = "Work with us",
  title = "Let's write the next chapter together.",
  copy = "We take on a limited number of partners at a time so every client gets our best. Let's see if we're a fit.",
}: CTAProps) {
  return (
    <section className="container-x py-28 sm:py-40">
      <Reveal direction="up" distance={20}>
        <p className="label-mono text-lime">{label}</p>
      </Reveal>
      <TextReveal as="h2" className="display-xl mt-6 max-w-4xl">
        {title}
      </TextReveal>
      <Reveal delay={0.2}>
        <p className="mt-8 max-w-xl text-white/60">{copy}</p>
      </Reveal>
      <Reveal delay={0.35}>
        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic>
            <TransitionLink href="/contact" data-cursor="link" className="btn btn-lime">
              Book consultation
            </TransitionLink>
          </Magnetic>
          <Magnetic>
            <TransitionLink href="/services" data-cursor="link" className="btn btn-ghost">
              View services
            </TransitionLink>
          </Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
