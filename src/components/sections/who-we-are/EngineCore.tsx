import { Icon } from "./icons";
import { cn } from "@/lib/utils";

const C = 150;

const circlePath = (r: number) =>
  `M${C - r} ${C}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 ${-r * 2} 0`;

/** 48 hairline ticks around the outer ring (every 4th one longer), one path. */
const TICKS = Array.from({ length: 48 }, (_, i) => {
  const a = (i / 48) * Math.PI * 2;
  const r1 = 128;
  const r2 = i % 4 === 0 ? 137 : 133;
  const f = (n: number) => n.toFixed(2);
  return `M${f(C + Math.cos(a) * r1)} ${f(C + Math.sin(a) * r1)}L${f(C + Math.cos(a) * r2)} ${f(C + Math.sin(a) * r2)}`;
}).join("");

/** Chip pins: four per side, poking out of the 150-unit square. */
const PINS = [105, 135, 165, 195]
  .map((p) => `M${p} 75V62M${p} 225v13M75 ${p}H62M225 ${p}h13`)
  .join("");

type EngineCoreProps = {
  className?: string;
};

/**
 * The "E-commerce Engine" hub: a lime chip ringed by ticks, a slowly spinning
 * dashed orbit and ripples. Self-contained (own 300-unit viewBox) and sized
 * by its parent; text scales with the container.
 */
export function EngineCore({ className }: EngineCoreProps) {
  return (
    <div data-engine className={cn("@container relative aspect-square", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(201,243,29,0.14),transparent_62%)]"
      />
      <svg
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        {[0, 1].map((i) => (
          <circle
            key={i}
            data-ripple
            cx={C}
            cy={C}
            r={84}
            stroke="#c9f31d"
            strokeWidth={1}
            opacity={0}
          />
        ))}
        <path
          data-ring
          d={circlePath(142)}
          pathLength={1}
          strokeDasharray={1}
          stroke="rgba(255,255,255,0.12)"
        />
        <path data-ticks d={TICKS} stroke="rgba(255,255,255,0.14)" />
        <g data-spin>
          <circle
            cx={C}
            cy={C}
            r={116}
            stroke="rgba(255,255,255,0.22)"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <circle cx={C + 116} cy={C} r={9} fill="#c9f31d" opacity={0.16} />
          <circle cx={C + 116} cy={C} r={3.2} fill="#c9f31d" />
          <circle cx={C - 116} cy={C} r={2} fill="rgba(255,255,255,0.4)" />
        </g>
        <path
          data-pins
          d={PINS}
          stroke="#c9f31d"
          strokeOpacity={0.6}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>

      <div data-core className="absolute inset-[25%]">
        <div
          data-chip
          className="relative grid size-full place-items-center rounded-[16%] bg-lime text-ink shadow-[0_0_5rem_rgba(201,243,29,0.22)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[5%] rounded-[12%] border border-ink/15"
          />
          <div className="relative flex flex-col items-center gap-[3cqw]">
            <Icon name="code" className="size-[9cqw]" />
            <p className="flex flex-col items-center text-center leading-none">
              <span
                className="label-mono font-bold"
                style={{ fontSize: "max(0.5rem, 3.3cqw)" }}
              >
                E-commerce
              </span>
              <span
                className="mt-[1.6cqw] font-extrabold tracking-[-0.05em] uppercase"
                style={{ fontSize: "9.6cqw" }}
              >
                Engine
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
