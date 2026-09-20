import { Fragment } from "react";
import { Icon } from "./icons";

/**
 * Miniature interface / code / catalogue fragments shown inside each
 * technology layer. Purely illustrative: abstract product shapes, SKU rows,
 * request lines, a pipeline and an AI search. Each fills a 4rem-high slot.
 */

const mono = "font-mono text-[0.6rem] leading-none";

function Experience() {
  return (
    <div className="flex h-full items-stretch gap-3">
      <div className="flex gap-1.5">
        {[
          <circle key="orb" cx="22" cy="26" r="11" fill="rgba(201,243,29,0.85)" />,
          <path key="arch" d="M10 44V30a12 12 0 0 1 24 0v14Z" fill="rgba(255,255,255,0.32)" />,
          <rect
            key="gem"
            x="12"
            y="16"
            width="20"
            height="20"
            rx="4"
            transform="rotate(45 22 26)"
            fill="rgba(201,243,29,0.4)"
          />,
        ].map((shape, i) => (
          <svg
            key={i}
            viewBox="0 0 44 56"
            className="h-full w-11 rounded-md border border-white/10 bg-ink"
          >
            {shape}
            <rect x="10" y="48" width="16" height="2" rx="1" fill="rgba(255,255,255,0.28)" />
          </svg>
        ))}
      </div>
      <div className="flex flex-1 flex-col justify-between py-0.5">
        <span className={`${mono} text-white/40`}>{"<ProductCard />"}</span>
        <span className="h-1.5 w-4/5 rounded-full bg-white/15" />
        <span className="h-1.5 w-3/5 rounded-full bg-white/10" />
        <span className="w-fit rounded-full bg-lime px-2 py-1 text-[0.5rem] leading-none font-bold tracking-wider text-ink uppercase">
          Add to bag
        </span>
      </div>
    </div>
  );
}

function Commerce() {
  const rows = [
    { code: "SKU 2041", status: "In stock", swatch: "bg-lime" },
    { code: "SKU 2042", status: "Listed", swatch: "bg-white/50" },
    { code: "ORD 8810", status: "Shipped", swatch: "bg-lime/60" },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      {rows.map((r) => (
        <div
          key={r.code}
          className="flex h-5 items-center gap-2 rounded-md border border-white/8 bg-ink/60 px-1.5"
        >
          <span className={`size-2.5 rounded-[3px] ${r.swatch}`} />
          <span className={`${mono} text-white/60`}>{r.code}</span>
          <span className="ml-auto text-[0.5rem] leading-none font-bold tracking-wider text-lime uppercase">
            {r.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function Engineering() {
  return (
    <div className="flex h-full flex-col justify-center gap-[0.32rem] rounded-md border border-white/10 bg-ink/70 px-2.5 font-mono text-[0.6rem] leading-none">
      <p className="whitespace-nowrap">
        <span className="text-lime">GET</span> <span className="text-white/70">/v1/products</span>{" "}
        <span className="text-white/35">200</span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-lime">POST</span> <span className="text-white/70">/v1/orders</span>{" "}
        <span className="text-white/35">201</span>
      </p>
      <p className="whitespace-nowrap">
        <span className="text-white/35">sync</span>{" "}
        <span className="text-white/70">erp → catalogue</span> <span className="text-lime">✓</span>
      </p>
    </div>
  );
}

function Cloud() {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex flex-1 items-center">
        {["build", "test", "ship", "live"].map((step, i) => (
          <Fragment key={step}>
            {i > 0 ? <span className="mb-3 h-px flex-1 bg-white/15" /> : null}
            <span className="flex flex-col items-center gap-1.5">
              <span className="relative size-2.5 rounded-full border border-lime/50">
                <span
                  data-pipe
                  className="absolute inset-0 rounded-full bg-lime opacity-0"
                />
              </span>
              <span className="font-mono text-[0.5rem] leading-none text-white/40">{step}</span>
            </span>
          </Fragment>
        ))}
      </div>
      <div className="flex h-10 items-end gap-1">
        {[0.5, 0.75, 0.6, 0.95, 0.7, 0.85].map((h, i) => (
          <span
            key={i}
            data-bar
            className="w-1.5 rounded-sm bg-lime/60"
            style={{ height: `${h * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Ai() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-2 rounded-full border border-lime/30 bg-ink/70 px-2.5 py-1.5">
        <Icon name="search" className="size-3 text-lime" />
        <span className={`${mono} text-white/70`}>linen summer shirt</span>
        <span data-caret className="h-3 w-px bg-lime" />
        <Icon name="sparkle" className="ml-auto size-3 text-lime" />
      </div>
      <div className="flex gap-1.5">
        {[
          "from-lime/60 to-lime/5",
          "from-white/40 to-white/5",
          "from-lime/30 to-white/10",
          "from-white/25 to-lime/20",
        ].map((g, i) => (
          <span
            key={i}
            className={`h-6 flex-1 rounded-md border border-white/10 bg-linear-to-br ${g}`}
          />
        ))}
      </div>
    </div>
  );
}

const fragments = {
  experience: Experience,
  commerce: Commerce,
  engineering: Engineering,
  cloud: Cloud,
  ai: Ai,
} as const;

export type LayerId = keyof typeof fragments;

export function LayerVisual({ id }: { id: LayerId }) {
  const Visual = fragments[id];
  return <Visual />;
}
