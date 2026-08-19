import { TextReveal } from "@/components/animation/TextReveal";
import { Reveal } from "@/components/animation/Reveal";
import { testimonial } from "@/lib/data";

/** Full-bleed lime quote section. */
export function Testimonial() {
  return (
    <section className="bg-lime py-24 text-ink sm:py-36">
      <div className="container-x">
        <Reveal direction="up" distance={20}>
          <p className="label-mono">( What clients say )</p>
        </Reveal>
        <TextReveal
          as="blockquote"
          split="words"
          className="display-lg mt-10 max-w-5xl"
        >
          &ldquo;{testimonial.quote}&rdquo;
        </TextReveal>
        <Reveal delay={0.3}>
          <footer className="mt-12">
            <p className="font-bold">{testimonial.author}</p>
            <p className="text-sm text-ink/60">{testimonial.role}</p>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
