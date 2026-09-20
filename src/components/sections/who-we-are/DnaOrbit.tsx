"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { Icon, type IconName } from "./icons";

/** Logical canvas; nodes and rings are positioned in these units. */
const VB = { w: 552, h: 604 };
const CENTER = { x: 240, y: 220 };
const RINGS = [176, 124];

const NODES: { id: string; label: string; icon: IconName; x: number; y: number }[] = [
  { id: "product", label: "Product", icon: "box", x: 472, y: 112 },
  { id: "growth", label: "Growth", icon: "growth", x: 58, y: 290 },
  { id: "catalogue", label: "Catalogue", icon: "catalogue", x: 542, y: 290 },
  { id: "order", label: "Order", icon: "bag", x: 120, y: 468 },
  { id: "search", label: "Search", icon: "search", x: 472, y: 468 },
  { id: "customer", label: "Customer", icon: "user", x: 284, y: 520 },
];

/** Circle as a path so stroke-dash "draw" animations work in every browser. */
const circlePath = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

const GRID_V = [100, 240, 380, 520];
const GRID_H = [60, 220, 380, 540];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const stroke = "rgba(255,255,255,0.09)";

/**
 * "Commerce is in our DNA" diagram. On scroll-in the blueprint draws itself,
 * the core pops and the six commerce nodes bloom outwards along their
 * spokes. Afterwards satellites orbit the rings, the core radiates ripples,
 * data pulses run out to the nodes and the nodes drift.
 */
export function DnaOrbit() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const idle: gsap.core.Animation[] = [];
        const origin = `${CENTER.x} ${CENTER.y}`;

        // --- idle loops (armed by the entrance timeline) ------------------
        gsap.utils.toArray<SVGGElement>("[data-orbit]").forEach((el, i) => {
          idle.push(
            gsap.to(el, {
              rotation: i % 2 ? -360 : 360,
              svgOrigin: origin,
              duration: 22 + i * 14,
              ease: "none",
              repeat: -1,
              paused: true,
            })
          );
        });

        gsap.set("[data-ripple]", { svgOrigin: origin });
        gsap.utils.toArray<SVGCircleElement>("[data-ripple]").forEach((el, i) => {
          idle.push(
            gsap.fromTo(
              el,
              { scale: 1, autoAlpha: 0.5 },
              {
                scale: 2.6,
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

        idle.push(
          gsap.to("[data-core]", {
            scale: 1.05,
            duration: 1.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          })
        );

        gsap.utils.toArray<HTMLElement>("[data-node]").forEach((el) => {
          idle.push(
            gsap.to(el, {
              yPercent: gsap.utils.random(6, 11) * (Math.random() < 0.5 ? -1 : 1),
              duration: gsap.utils.random(2.6, 4),
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            })
          );
        });

        gsap.utils.toArray<SVGGElement>("[data-pulse]").forEach((el, i) => {
          const node = NODES[i];
          idle.push(
            gsap
              .timeline({ repeat: -1, repeatDelay: gsap.utils.random(1, 2.6), delay: i * 0.55, paused: true })
              .set(el, { x: CENTER.x, y: CENTER.y })
              .to(el, { autoAlpha: 1, duration: 0.2 })
              .to(el, { x: node.x, y: node.y, duration: 1.7, ease: "power1.in" }, "<")
              .to(el, { autoAlpha: 0, duration: 0.25 }, "-=0.25")
          );
        });

        // --- entrance -------------------------------------------------------
        gsap
          .timeline({
            defaults: { ease: motion.ease.smooth },
            scrollTrigger: { trigger: root, start: "top 75%", once: true },
          })
          .from("[data-grid]", {
            strokeDashoffset: 1,
            duration: motion.duration.cinematic,
            ease: "power2.inOut",
            stagger: 0.08,
          })
          .from(
            "[data-ring]",
            { strokeDashoffset: 1, duration: 1.8, ease: "power2.inOut", stagger: 0.25 },
            0.2
          )
          .from(
            "[data-halo]",
            { scale: 0, autoAlpha: 0, duration: motion.duration.slow, ease: "back.out(1.6)" },
            0.5
          )
          .from(
            "[data-core]",
            { scale: 0, duration: motion.duration.slow, ease: "back.out(2)" },
            0.7
          )
          .from(
            "[data-spoke]",
            { strokeDashoffset: 1, duration: 1.2, ease: "power2.inOut", stagger: 0.1 },
            1
          )
          .from(
            "[data-pop]",
            {
              scale: 0,
              autoAlpha: 0,
              duration: motion.duration.normal,
              ease: "back.out(1.8)",
              stagger: 0.1,
            },
            1.3
          )
          .fromTo(
            "[data-orbit]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: motion.duration.normal },
            1.8
          )
          .add(() => idle.forEach((a) => a.play()), 1.9);
      });

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="@container relative mx-auto w-full max-w-[34.5rem] overflow-clip lg:mx-0"
      style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
    >
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} fill="none" className="absolute inset-0 size-full overflow-visible">
        {GRID_V.map((x) => (
          <path
            key={`v${x}`}
            data-grid
            d={`M${x} 0V520`}
            pathLength={1}
            strokeDasharray={1}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        {GRID_H.map((y) => (
          <path
            key={`h${y}`}
            data-grid
            d={`M0 ${y}H520`}
            pathLength={1}
            strokeDasharray={1}
            stroke="rgba(255,255,255,0.06)"
          />
        ))}
        {RINGS.map((r) => (
          <path
            key={r}
            data-ring
            d={circlePath(CENTER.x, CENTER.y, r)}
            pathLength={1}
            strokeDasharray={1}
            stroke={stroke}
          />
        ))}
        {NODES.map((n) => (
          <path
            key={n.id}
            data-spoke
            d={`M${CENTER.x} ${CENTER.y}L${n.x} ${n.y}`}
            pathLength={1}
            strokeDasharray={1}
            stroke="rgba(255,255,255,0.11)"
          />
        ))}
        {[0, 1].map((i) => (
          <circle
            key={i}
            data-ripple
            cx={CENTER.x}
            cy={CENTER.y}
            r={56}
            stroke="#c9f31d"
            strokeWidth={1}
            opacity={0}
          />
        ))}
        {RINGS.map((r, i) => (
          <g key={r} data-orbit opacity={0}>
            <circle cx={CENTER.x + r} cy={CENTER.y} r={9} fill="#c9f31d" opacity={0.14} />
            <circle cx={CENTER.x + r} cy={CENTER.y} r={3.2} fill="#c9f31d" />
            {i === 0 ? <circle cx={CENTER.x - r} cy={CENTER.y} r={2} fill="rgba(255,255,255,0.35)" /> : null}
          </g>
        ))}
        {NODES.map((n) => (
          <g key={n.id} data-pulse opacity={0}>
            <circle r={7} fill="#c9f31d" opacity={0.18} />
            <circle r={2.4} fill="#c9f31d" />
          </g>
        ))}
      </svg>

      {/* core */}
      <div
        className="absolute w-[26.1%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: pct(CENTER.x, VB.w), top: pct(CENTER.y, VB.h), aspectRatio: "1" }}
      >
        <div data-halo className="grid size-full place-items-center rounded-full border border-white/10 bg-card">
          <div
            data-core
            className="label-mono grid size-[77.8%] place-items-center rounded-full bg-lime font-bold text-ink"
            style={{ fontSize: "max(0.5rem, 1.5cqw)" }}
          >
            Commerce
          </div>
        </div>
      </div>

      {/* nodes */}
      {NODES.map((n) => (
        <div
          key={n.id}
          className="group absolute w-[18.84%] -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct(n.x, VB.w), top: pct(n.y, VB.h), aspectRatio: "1" }}
        >
          <div data-pop className="size-full">
            <div
              data-node
              className="flex size-full flex-col items-center justify-center gap-[6%] rounded-full border border-white/10 bg-card transition-colors duration-300 group-hover:border-lime/60"
            >
              <span className="grid size-[36%] place-items-center rounded-full bg-ink text-lime transition-colors duration-300 group-hover:bg-lime group-hover:text-ink">
                <Icon name={n.icon} className="size-[56%]" />
              </span>
              <span
                className="label-mono font-bold tracking-[0.12em] text-paper"
                style={{ fontSize: "max(0.5rem, 1.5cqw)" }}
              >
                {n.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
