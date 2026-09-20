"use client";

import { Fragment, useRef, useState, type CSSProperties } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { Reveal } from "@/components/animation/Reveal";
import { TextReveal } from "@/components/animation/TextReveal";
import { GridBackdrop } from "./GridBackdrop";
import { EngineCore } from "./EngineCore";
import { LayerVisual, type LayerId } from "./TechFragments";
import { whoWeAre } from "@/lib/data";

const tech = whoWeAre.technology;

/** Logical canvas of the radial (xl+) layout; everything is placed in these units. */
const STAGE = { w: 1200, h: 760 };
const CORE = { x: 600, y: 380 };

type Point = { x: number; y: number };

const POS: Record<LayerId, Point> = {
  experience: { x: 600, y: 96 },
  commerce: { x: 1040, y: 276 },
  engineering: { x: 905, y: 654 },
  cloud: { x: 295, y: 654 },
  ai: { x: 160, y: 276 },
};

/** Faint code / interface scraps drifting between the layers (xl+ only). */
const FLOATS: (Point & { text: string })[] = [
  { text: '<ProductCard sku="LX-204" />', x: 250, y: 60 },
  { text: "{ stock: 128, price: 89 }", x: 950, y: 60 },
  { text: 'search("linen shirt") → 24', x: 330, y: 470 },
  { text: "POST /orders → 201", x: 870, y: 470 },
  { text: "git push → build ✓ → live", x: 600, y: 598 },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/**
 * Closed Catmull-Rom-style loop through the layer centres, as cubic
 * Béziers, plus the midpoint of each segment (for junction nodes).
 */
function loopThrough(pts: Point[]) {
  const n = pts.length;
  let d = `M${pts[0].x} ${pts[0].y}`;
  const mids: Point[] = [];
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += `C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
    mids.push({
      x: (p1.x + 3 * c1.x + 3 * c2.x + p2.x) / 8,
      y: (p1.y + 3 * c1.y + 3 * c2.y + p2.y) / 8,
    });
  }
  return { d: `${d}Z`, mids };
}

const LAYERS = tech.layers.map((l) => ({ ...l, ...POS[l.id] }));
const LOOP = loopThrough(LAYERS);

const NODE_T = 0.6;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * "Built for modern E-commerce": one connected architecture instead of five
 * cards. A lime E-commerce Engine sits at the centre; the five layers hang off
 * it on spokes and are tied to each other by a loop. On scroll-in the lines
 * draw, the engine powers up and the layers bloom outwards; afterwards data
 * pulses run the spokes and the loop while the fragments inside each layer
 * tick over. Below xl the same content becomes a vertical chain that lights
 * up as it is scrolled.
 */
export function WhoTechnology() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<LayerId | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add(
        {
          radial: "(min-width: 1280px) and (prefers-reduced-motion: no-preference)",
          stack: "(max-width: 1279px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { radial } = ctx.conditions as { radial: boolean };
          const idle: gsap.core.Animation[] = [];
          let ready = false;
          let inView = false;

          const sync = () => idle.forEach((a) => (ready && inView ? a.play() : a.pause()));
          const st = ScrollTrigger.create({
            trigger: stage,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              inView = self.isActive;
              sync();
            },
          });
          inView = st.isActive;

          // --- idle loops (armed once the entrance has played) --------------
          q("[data-spin]").forEach((el) => {
            idle.push(
              gsap.to(el, {
                rotation: 360,
                svgOrigin: "150 150",
                duration: 42,
                ease: "none",
                repeat: -1,
                paused: true,
              })
            );
          });

          q("[data-ripple]").forEach((el, i) => {
            gsap.set(el, { svgOrigin: "150 150" });
            idle.push(
              gsap.fromTo(
                el,
                { scale: 1, autoAlpha: 0.5 },
                {
                  scale: 2.5,
                  autoAlpha: 0,
                  duration: 3.2,
                  ease: "power1.out",
                  repeat: -1,
                  delay: i * 1.6,
                  paused: true,
                  immediateRender: false,
                }
              )
            );
          });

          q("[data-chip]").forEach((el) => {
            idle.push(
              gsap.to(el, {
                scale: 1.035,
                duration: 1.8,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                paused: true,
              })
            );
          });

          q("[data-caret]").forEach((el) => {
            idle.push(
              gsap.to(el, {
                autoAlpha: 0,
                duration: 0.5,
                ease: "steps(1)",
                yoyo: true,
                repeat: -1,
                paused: true,
              })
            );
          });

          const pipes = q("[data-pipe]");
          if (pipes.length) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, paused: true });
            pipes.forEach((el, i) =>
              tl.to(el, { autoAlpha: 1, scale: 1.35, duration: 0.3, ease: "power2.out" }, i * 0.5)
            );
            tl.to(pipes, { autoAlpha: 0, scale: 1, duration: 0.4 }, pipes.length * 0.5 + 0.8);
            idle.push(tl);
          }

          q("[data-bar]").forEach((el) => {
            idle.push(
              gsap.to(el, {
                scaleY: gsap.utils.random(0.3, 0.9),
                transformOrigin: "50% 100%",
                duration: gsap.utils.random(0.7, 1.4),
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                paused: true,
              })
            );
          });

          if (radial) {
            q("[data-float]").forEach((el) => {
              idle.push(
                gsap.to(el, {
                  y: gsap.utils.random(5, 9) * (Math.random() < 0.5 ? -1 : 1),
                  duration: gsap.utils.random(2.6, 4),
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                  paused: true,
                })
              );
            });

            // comets: a short dash slides along each path (pathLength is 1)
            q("[data-comet]").forEach((el, i) => {
              idle.push(
                gsap.fromTo(
                  el,
                  { strokeDashoffset: 0.1 },
                  {
                    strokeDashoffset: -1,
                    duration: 1.6,
                    ease: "power1.in",
                    repeat: -1,
                    repeatDelay: gsap.utils.random(0.8, 2.4),
                    delay: i * 0.5,
                    paused: true,
                  }
                )
              );
            });

            q("[data-comet-loop]").forEach((el, i) => {
              const tween = gsap.fromTo(
                el,
                { strokeDashoffset: 0.05 },
                { strokeDashoffset: -1, duration: 9, ease: "none", repeat: -1, paused: true }
              );
              tween.progress(i * 0.5);
              idle.push(tween);
            });
          }

          // --- entrance ------------------------------------------------------
          const engineIn = (tl: gsap.core.Timeline, at: number) =>
            tl
              .from(q("[data-ring]"), { strokeDashoffset: 1, duration: 1.6, ease: "power2.inOut" }, at)
              .from(
                q("[data-core]"),
                { scale: 0, duration: motion.duration.slow, ease: "back.out(1.8)" },
                at + 0.1
              )
              .from(
                q("[data-ticks]"),
                { autoAlpha: 0, duration: motion.duration.normal },
                at + 0.3
              )
              .from(
                q("[data-pins]"),
                { autoAlpha: 0, duration: motion.duration.normal },
                at + 0.5
              );

          const arm = () => {
            ready = true;
            sync();
          };

          if (radial) {
            const tl = gsap.timeline({
              defaults: { ease: motion.ease.smooth },
              scrollTrigger: { trigger: stage, start: "top 60%", once: true },
            });
            engineIn(tl, 0)
              .from(
                q("[data-loop]"),
                { strokeDashoffset: 1, duration: 2, ease: "power2.inOut" },
                0.4
              )
              .from(
                q("[data-spoke]"),
                { strokeDashoffset: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.1 },
                0.6
              )
              .from(
                q("[data-layer]"),
                {
                  autoAlpha: 0,
                  scale: 0.86,
                  x: (i: number) => (CORE.x - LAYERS[i].x) * 0.2,
                  y: (i: number) => (CORE.y - LAYERS[i].y) * 0.2,
                  duration: motion.duration.slow,
                  ease: "back.out(1.4)",
                  stagger: motion.stagger.large,
                },
                1
              )
              .from(
                q("[data-frag]"),
                { autoAlpha: 0, duration: 0.6, stagger: 0.1 },
                1.6
              )
              .from(
                q("[data-tech]"),
                { autoAlpha: 0, y: 8, duration: 0.5, stagger: 0.03 },
                1.7
              )
              .from(
                q("[data-node]"),
                { scale: 0, autoAlpha: 0, duration: 0.5, ease: "back.out(2)", stagger: 0.05 },
                1.8
              )
              .from(q("[data-float]"), { autoAlpha: 0, duration: 1, stagger: 0.15 }, 2)
              .add(arm, 2.4);
          } else {
            const tl = gsap.timeline({
              defaults: { ease: motion.ease.smooth },
              scrollTrigger: { trigger: q("[data-engine]")[0], start: "top 85%", once: true },
            });
            engineIn(tl, 0).add(arm, 1.4);

            q("[data-layer]").forEach((el) => {
              const trigger = { trigger: el, start: "top 90%", once: true };
              gsap.from(el, {
                y: 48,
                autoAlpha: 0,
                duration: motion.duration.slow,
                ease: motion.ease.smooth,
                scrollTrigger: trigger,
              });
              gsap.from(el.querySelectorAll("[data-frag], [data-tech]"), {
                autoAlpha: 0,
                y: 10,
                duration: 0.6,
                delay: 0.25,
                stagger: 0.04,
                ease: motion.ease.smooth,
                scrollTrigger: trigger,
              });
            });

            // links fill lime down the chain, lighting each layer on arrival
            const links = q("[data-link-fill]");
            const lits = q("[data-lit]");
            const scrub = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 70%", scrub: 0.6 },
            });
            links.forEach((link, i) => {
              scrub.fromTo(link, { scaleY: 0 }, { scaleY: 1, duration: 0.6 }, i);
              if (lits[i]) scrub.fromTo(lits[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, i + 0.5);
            });
          }
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="relative overflow-hidden py-20 sm:py-28">
      <GridBackdrop cols={7} rows={3} />

      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
          <div>
            <Reveal direction="up" distance={20}>
              <p className="label-mono text-lime">{tech.eyebrow}</p>
            </Reveal>
            <h2 className="mt-6 text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.055em] uppercase">
              <TextReveal as="span" split="chars" stagger={0.025} className="block text-paper">
                {tech.headline[0]}
              </TextReveal>
              <TextReveal
                as="span"
                split="chars"
                stagger={0.025}
                delay={0.2}
                className="block text-lime"
              >
                {tech.headline[1]}
              </TextReveal>
            </h2>
          </div>
          <Reveal direction="up" distance={20} delay={0.2}>
            <p className="max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
              {tech.line}
            </p>
          </Reveal>
        </div>

        <div
          ref={stageRef}
          className="relative mx-auto mt-14 max-w-xl sm:mt-16 xl:mt-6 xl:aspect-[1200/760] xl:max-w-[76rem]"
        >
          {/* radial-only backdrop: glow, connections, floating fragments */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden xl:block"
          >
            <div className="absolute top-1/2 left-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(201,243,29,0.08),transparent_65%)]" />

            <svg
              viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
              fill="none"
              className="absolute inset-0 size-full overflow-visible"
            >
              <path
                data-loop
                d={LOOP.d}
                pathLength={1}
                strokeDasharray={1}
                stroke="rgba(255,255,255,0.12)"
              />
              {[0, 1].map((i) => (
                <path
                  key={i}
                  data-comet-loop
                  d={LOOP.d}
                  pathLength={1}
                  strokeDasharray="0.05 1.05"
                  strokeDashoffset={0.05}
                  stroke="#c9f31d"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ))}

              {LAYERS.map((l) => (
                <path
                  key={l.id}
                  data-spoke
                  d={`M${CORE.x} ${CORE.y}L${l.x} ${l.y}`}
                  pathLength={1}
                  strokeDasharray={1}
                  className="transition-[stroke] duration-300"
                  style={{
                    stroke: active === l.id ? "#c9f31d" : "rgba(255,255,255,0.14)",
                  }}
                />
              ))}
              {LAYERS.map((l) => (
                <path
                  key={l.id}
                  data-comet
                  d={`M${CORE.x} ${CORE.y}L${l.x} ${l.y}`}
                  pathLength={1}
                  strokeDasharray="0.1 1.1"
                  strokeDashoffset={0.1}
                  stroke="#c9f31d"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              ))}

              {LAYERS.map((l) => (
                <g
                  key={l.id}
                  data-node
                  transform={`translate(${lerp(CORE.x, l.x, NODE_T)} ${lerp(CORE.y, l.y, NODE_T)})`}
                >
                  <circle r={9} fill="#c9f31d" opacity={0.12} />
                  <circle r={4.5} fill="#0a0a0b" stroke="#c9f31d" strokeOpacity={0.7} />
                  <circle r={1.8} fill="#c9f31d" />
                </g>
              ))}
              {LOOP.mids.map((m, i) => (
                <g key={i} data-node transform={`translate(${m.x} ${m.y})`}>
                  <circle r={3.5} fill="#0a0a0b" stroke="rgba(255,255,255,0.4)" />
                  <circle r={1.3} fill="rgba(255,255,255,0.7)" />
                </g>
              ))}
            </svg>

            {FLOATS.map((f) => (
              <span
                key={f.text}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pct(f.x, STAGE.w), top: pct(f.y, STAGE.h) }}
              >
                <span
                  data-float
                  className="block font-mono text-[0.68rem] whitespace-nowrap text-white/25"
                >
                  {f.text}
                </span>
              </span>
            ))}
          </div>

          {/* the engine */}
          <div className="relative z-10 mx-auto w-64 sm:w-72 xl:absolute xl:top-1/2 xl:left-1/2 xl:w-[27%] xl:-translate-x-1/2 xl:-translate-y-1/2">
            <EngineCore />
            <span
              aria-hidden="true"
              className="absolute top-full left-1/2 h-7 w-px -translate-x-1/2 bg-white/12 xl:hidden"
            >
              <span
                data-link-fill
                className="absolute inset-0 origin-top bg-lime"
                style={{ transform: "scaleY(0)" }}
              />
            </span>
          </div>

          {/* the five layers */}
          <ol className="relative mt-7 flex flex-col gap-7 xl:static xl:mt-0">
            {LAYERS.map((l, i) => (
              <li
                key={l.id}
                className="relative xl:absolute xl:top-(--y) xl:left-(--x) xl:z-20 xl:w-[18.5rem] xl:-translate-x-1/2 xl:-translate-y-1/2"
                style={
                  {
                    "--x": pct(l.x, STAGE.w),
                    "--y": pct(l.y, STAGE.h),
                  } as CSSProperties
                }
                onPointerEnter={() => setActive(l.id)}
                onPointerLeave={() => setActive(null)}
              >
                <div
                  data-layer
                  className="relative rounded-[1.4rem] border border-white/10 bg-card p-4 transition-colors duration-300 hover:border-lime/40"
                >
                  <span
                    data-lit
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[1.4rem] border border-lime/50 opacity-0 xl:hidden"
                  />
                  <div className="flex items-center justify-between">
                    <p className="label-mono flex items-center gap-2 text-[0.65rem] font-bold text-lime">
                      <span className="text-white/35">{String(i + 1).padStart(2, "0")}</span>
                      {l.label}
                    </p>
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-lime/70" />
                  </div>
                  <div data-frag aria-hidden="true" className="mt-3 h-16">
                    <LayerVisual id={l.id} />
                  </div>
                  <p className="mt-3 text-[0.72rem] leading-relaxed text-white/55">
                    {l.tech.map((t, j) => (
                      <Fragment key={t}>
                        {j > 0 ? (
                          <span aria-hidden="true" className="mx-1.5 text-lime/50">
                            ·
                          </span>
                        ) : null}
                        <span data-tech className="inline-block">
                          {t}
                        </span>
                      </Fragment>
                    ))}
                  </p>
                </div>

                {i < LAYERS.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute top-full left-1/2 h-7 w-px -translate-x-1/2 bg-white/12 xl:hidden"
                  >
                    <span
                      data-link-fill
                      className="absolute inset-0 origin-top bg-lime"
                      style={{ transform: "scaleY(0)" }}
                    />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
