import { ImageReveal } from "@/components/animation/ImageReveal";
import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { TransitionLink } from "@/components/transition/TransitionLink";
import { services } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ART = [
  "from-emerald-950 to-ink-2",
  "from-indigo-950 to-ink-2",
  "from-cyan-950 to-ink-2",
  "from-fuchsia-950 to-ink-2",
  "from-amber-950 to-ink-2",
  "from-rose-950 to-ink-2",
  "from-sky-950 to-ink-2",
  "from-lime-950 to-ink-2",
];

const ART_IMAGES = [
  "websiteDevelopment.png",
  "mobileAppDevelopment.png",
  "seoServices.png",
  "digitalMarketing.png",
  "paidAdvertising.png",
  "emailMarketing.png",
  "brandingStrategy.png",
  "UI-UXDesign.png",
];

/** Detailed alternating service blocks for the services page. */
export function ServiceBlocks() {
  return (
    <div>
      {services.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={service.num}
            className="border-t border-line"
            id={`service-${service.num}`}
          >
            <div className="container-x grid items-start gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
              {/* text column */}
              <div className={cn(flip && "lg:order-2")}>
                <Reveal direction="up" distance={20}>
                  <p className="label-mono text-lime">{service.num} / Service</p>
                </Reveal>
                <TextReveal as="h2" className="display-lg mt-4" direction={flip ? "right" : "left"} exit exitStagger={0.03} exitRotation={30}>
                  {service.title}
                </TextReveal>
                <Reveal delay={0.15}>
                  <p className="mt-6 max-w-xl leading-relaxed text-white/60">
                    {service.blurb}
                  </p>
                </Reveal>

                <Reveal delay={0.25}>
                  <p className="label-mono mt-10 text-white/40">Why choose us</p>
                  <ul className="mt-4 space-y-3">
                    {service.why.map((reason) => (
                      <li key={reason} className="flex gap-3 text-sm text-white/75">
                        <span className="text-lime" aria-hidden="true">✦</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </Reveal>

                <Reveal delay={0.3}>
                  <p className="label-mono mt-10 text-white/40">Deliverables</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-line px-3 py-1.5 text-xs text-white/70"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.35}>
                  <Magnetic className="mt-10">
                    <TransitionLink
                      href="/contact"
                      data-cursor="link"
                      className="btn btn-lime"
                    >
                      Start this project →
                    </TransitionLink>
                  </Magnetic>
                </Reveal>
              </div>

              {/* art + process column */}
              <div className={cn("lg:sticky lg:top-28", flip && "lg:order-1")}>
                <ImageReveal direction={flip ? "right" : "left"}>
                  <div
                    className={cn(
                      "flex flex-col items-end",
                      ART[i % ART.length]
                    )}
                  >
                    <div className=" w-full md:w-[560px] lg:w-[620px]">
                      <div className="relative rounded-2xl overflow-hidden">
                        <Image
                          key={service.num}
                          src={`/assets/images/${ART_IMAGES[i % ART_IMAGES.length]}`}
                          alt={service.title}
                          width={1200}
                          height={900}
                          unoptimized
                          loading={i === 0 ? "eager" : "lazy"}
                          sizes="(max-width: 1024px) 60vw, 33vw"
                          className="w-full h-full"
                        />
                        <span className="absolute bottom-4 right-6 text-7xl font-extrabold text-black/10 pointer-events-none">
                          {service.num}
                        </span>
                      </div>
                    </div>
                  </div>
                </ImageReveal>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {service.process.map((phase, j) => (
                    <Reveal key={phase.step} delay={j * 0.06}>
                      <div className="rounded-2xl border border-line p-5">
                        <p className="font-mono text-xs text-lime">0{j + 1}</p>
                        <p className="mt-2 text-sm font-bold">{phase.step}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/50">
                          {phase.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
