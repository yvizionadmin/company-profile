"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/animations/gsap";
import { motion } from "@/lib/motion";
import { useLoader } from "@/components/providers/LoaderProvider";
import { Icon, type IconName } from "./icons";

/** Logical canvas. Everything below is positioned in these units. */
const VB = { w: 442, h: 620 };

type Chip = { kind: "chip"; label: string; icon?: IconName };
type Dot = { kind: "dot"; tone: "lime" | "muted" };
type Card = { kind: "card"; w: number; h: number };
type NodeDef = { id: string; x: number; y: number } & (Chip | Dot | Card);

const NODES: NodeDef[] = [
  { id: "products", x: 51, y: 54, kind: "chip", label: "Products" },
  { id: "catalogue", x: 363, y: 22, kind: "chip", label: "Catalogue", icon: "catalogue" },
  { id: "dotA", x: 74, y: 90, kind: "dot", tone: "lime" },
  { id: "cardA", x: 283, y: 155, kind: "card", w: 143, h: 104 },
  { id: "experience", x: 220, y: 259, kind: "chip", label: "Experience", icon: "pen" },
  { id: "dotB", x: 394, y: 308, kind: "dot", tone: "lime" },
  { id: "transaction", x: 116, y: 381, kind: "chip", label: "Transaction", icon: "card" },
  { id: "cardB", x: 460, y: 365, kind: "card", w: 100, h: 117 },
  { id: "dotC", x: 225, y: 438, kind: "dot", tone: "muted" },
  { id: "dotD", x: 116, y: 514, kind: "dot", tone: "lime" },
  { id: "growth", x: 319, y: 516, kind: "chip", label: "Growth", icon: "growth" },
  { id: "dotE", x: 376, y: 553, kind: "dot", tone: "lime" },
  { id: "cardC", x: 408, y: 577, kind: "card", w: 100, h: 83 },
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES: [string, string][] = [
  ["products", "dotA"],
  ["dotA", "cardA"],
  ["cardA", "catalogue"],
  ["cardA", "experience"],
  ["cardA", "dotB"],
  ["dotB", "cardB"],
  ["experience", "transaction"],
  ["experience", "dotC"],
  ["transaction", "dotD"],
  ["dotC", "growth"],
  ["growth", "dotE"],
  ["dotE", "cardC"],
];

/** Routes the "data pulses" travel along. */
const PULSES: [string, string][] = [
  ["dotA", "cardA"],
  ["cardA", "experience"],
  ["experience", "transaction"],
  ["experience", "dotC"],
  ["dotC", "growth"],
  ["growth", "dotE"],
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

const position = (n: NodeDef) => ({ left: pct(n.x, VB.w), top: pct(n.y, VB.h) });

/**
 * Hero visual: a commerce "system map" (products → catalogue → experience →
 * transaction → growth). Edges draw in, nodes pop, chips drift, data pulses
 * travel the edges and the layers shift with the pointer.
 * Scales like an image: all sizing is in container-query units.
 */
export function HeroNetwork() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { loaded } = useLoader();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!loaded) {
          gsap.set(root, { autoAlpha: 0 });
          return;
        }
        gsap.set(root, { autoAlpha: 1 });

        // --- entrance -----------------------------------------------------
        gsap
          .timeline({
            delay: 0.4,
            defaults: { ease: motion.ease.smooth },
            scrollTrigger: { trigger: root, start: "top 92%", once: true },
          })
          .from("[data-edge]", {
            strokeDashoffset: 1,
            duration: motion.duration.slow,
            ease: "power2.inOut",
            stagger: motion.stagger.normal,
          })
          .from(
            "[data-dot]",
            { scale: 0, duration: motion.duration.fast, ease: "back.out(2.4)", stagger: 0.07 },
            "<0.25"
          )
          .from(
            "[data-chip]",
            {
              autoAlpha: 0,
              y: 16,
              scale: 0.85,
              duration: motion.duration.normal,
              ease: "back.out(1.6)",
              stagger: motion.stagger.normal,
            },
            "<0.1"
          )
          .from(
            "[data-card]",
            { autoAlpha: 0, x: 48, duration: motion.duration.slow, stagger: motion.stagger.large },
            "<0.15"
          );

        // --- idle: drift, ping, data pulses ------------------------------
        gsap.utils.toArray<HTMLElement>("[data-chip], [data-card]").forEach((el) => {
          const card = el.hasAttribute("data-card");
          gsap.to(el, {
            yPercent: gsap.utils.random(card ? 3 : 14, card ? 6 : 24) * (Math.random() < 0.5 ? -1 : 1),
            duration: gsap.utils.random(2.6, 4.2),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-ping]").forEach((el) => {
          gsap.fromTo(
            el,
            { scale: 1, autoAlpha: 0.55 },
            {
              scale: 3.2,
              autoAlpha: 0,
              duration: 2.2,
              ease: "power1.out",
              repeat: -1,
              delay: gsap.utils.random(1.4, 3.4),
              repeatDelay: gsap.utils.random(0.4, 1.4),
            }
          );
        });

        gsap.utils.toArray<SVGGElement>("[data-pulse]").forEach((el, i) => {
          const [from, to] = PULSES[i].map((id) => byId[id]);
          gsap
            .timeline({
              repeat: -1,
              repeatDelay: gsap.utils.random(0.8, 2.4),
              delay: 1.8 + i * 0.7,
            })
            .set(el, { x: from.x, y: from.y })
            .to(el, { autoAlpha: 1, duration: 0.25 })
            .to(el, { x: to.x, y: to.y, duration: 1.6, ease: "power1.inOut" }, "<")
            .to(el, { autoAlpha: 0, duration: 0.25 }, "-=0.25");
        });

        // --- scroll: drift upward as the hero leaves ---------------------
        gsap.to(root, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.closest("section") ?? root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // --- pointer parallax (fine pointers only) --------------------------
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          if (!loaded) return;
          const depths: Record<string, number> = { back: 6, mid: 11, front: 16 };
          const movers = gsap.utils.toArray<HTMLElement>("[data-layer]").map((el) => ({
            depth: depths[el.dataset.layer ?? "back"],
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: motion.ease.smooth }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: motion.ease.smooth }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2;
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            movers.forEach((m) => {
              m.x(-nx * m.depth);
              m.y(-ny * m.depth);
            });
          };
          window.addEventListener("pointermove", onMove);
          return () => window.removeEventListener("pointermove", onMove);
        }
      );

      return () => mm.revert();
    },
    { dependencies: [loaded], scope: rootRef, revertOnUpdate: true }
  );

  const dots = NODES.filter((n) => n.kind === "dot");
  const chips = NODES.filter((n) => n.kind === "chip");
  const cards = NODES.filter((n) => n.kind === "card");

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="@container relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
      style={{ aspectRatio: `${VB.w} / ${VB.h}`, clipPath: "inset(-3rem 0 -3rem -3rem)" }}
    >
      {/* back: edges, pulses, dots */}
      <div data-layer="back" className="absolute inset-0">
        <svg viewBox={`0 0 ${VB.w} ${VB.h}`} fill="none" className="absolute inset-0 size-full overflow-visible">
          {EDGES.map(([a, b]) => (
            <path
              key={`${a}-${b}`}
              data-edge
              d={`M${byId[a].x} ${byId[a].y}L${byId[b].x} ${byId[b].y}`}
              pathLength={1}
              strokeDasharray={1}
              stroke="rgba(255,255,255,0.13)"
              strokeWidth={1}
            />
          ))}
          {PULSES.map(([a, b]) => (
            <g key={`p-${a}-${b}`} data-pulse opacity={0}>
              <circle r={7} fill="#c9f31d" opacity={0.18} />
              <circle r={2.4} fill="#c9f31d" />
            </g>
          ))}
        </svg>
        {dots.map((n) => (
          <div
            key={n.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={position(n)}
          >
            <div
              data-dot
              className={
                (n as Dot).tone === "lime"
                  ? "relative size-[max(5px,1.8cqw)] rounded-full bg-lime"
                  : "relative size-[max(4px,1.4cqw)] rounded-full bg-white/25"
              }
            >
              {(n as Dot).tone === "lime" ? (
                <span data-ping className="absolute inset-0 rounded-full bg-lime" />
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* mid: chips */}
      <div data-layer="mid" className="absolute inset-0">
        {chips.map((n) => {
          const chip = n as NodeDef & Chip;
          return (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={position(n)}
            >
              <div
                data-chip
                className="label-mono flex items-center gap-[0.7em] rounded-[0.7em] border border-white/10 bg-card px-[1.1em] py-[0.85em] leading-none whitespace-nowrap text-paper"
                style={{ fontSize: "max(0.6rem, 2.05cqw)" }}
              >
                {chip.icon ? (
                  <Icon name={chip.icon} className="size-[1.25em] text-lime" />
                ) : (
                  <span className="size-[0.7em] rounded-full bg-lime" />
                )}
                {chip.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* front: ghost UI cards */}
      <div data-layer="front" className="absolute inset-0">
        {cards.map((n) => {
          const card = n as NodeDef & Card;
          return (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ ...position(n), width: pct(card.w, VB.w), aspectRatio: `${card.w} / ${card.h}` }}
            >
              <div
                data-card
                className="flex size-full flex-col justify-center gap-[1.6cqw] rounded-[2.7cqw] border border-white/10 bg-card p-[2.9cqw]"
              >
                <div className="flex items-center gap-[1.4cqw]">
                  <span className="size-[1.6cqw] rounded-full bg-lime" />
                  <span className="h-[1cqw] w-[38%] rounded-full bg-white/15" />
                </div>
                <span className="h-[1cqw] w-[88%] rounded-full bg-white/10" />
                <span className="h-[1cqw] w-[58%] rounded-full bg-white/10" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
