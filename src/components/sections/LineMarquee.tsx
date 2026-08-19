import { Marquee } from "@/components/animation/Marquee";
import { cn } from "@/lib/utils";

type LineMarqueeProps = {
  items: readonly string[];
  className?: string;
  itemClassName?: string;
  speed?: number;
  direction?: "left" | "right";
  mono?: boolean;
};

/** Word strip marquee with lime diamond separators. */
export function LineMarquee({
  items,
  className,
  itemClassName,
  speed = 70,
  direction = "left",
  mono = false,
}: LineMarqueeProps) {
  return (
    <Marquee speed={speed} direction={direction} pauseOnHover className={className}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span
            className={cn(
              "whitespace-nowrap",
              mono ? "label-mono" : "text-xl font-semibold tracking-tight",
              itemClassName
            )}
          >
            {item}
          </span>
          <span className="mx-6 text-sm text-lime" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </Marquee>
  );
}
