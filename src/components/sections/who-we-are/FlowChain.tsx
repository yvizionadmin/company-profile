import { Fragment } from "react";
import { Icon } from "./icons";
import { cn } from "@/lib/utils";

type FlowChainProps = {
  items: readonly string[];
  className?: string;
};

/**
 * Left-to-right chain of pills joined by lime arrows. The last step is
 * highlighted as the outcome. Wraps on narrow screens.
 */
export function FlowChain({ items, className }: FlowChainProps) {
  const last = items.length - 1;
  return (
    <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-3", className)}>
      {items.map((item, i) => (
        <Fragment key={item}>
          <li
            className={cn(
              "label-mono rounded-full border px-3.5 py-2 text-[0.65rem] font-bold",
              i === last
                ? "border-lime bg-lime text-ink"
                : "border-white/12 bg-card text-paper"
            )}
          >
            {item}
          </li>
          {i < last ? (
            <li aria-hidden="true" className="flex text-lime">
              <Icon name="arrow" className="size-3.5" />
            </li>
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
