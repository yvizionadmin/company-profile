"use client";

import { PinSection } from "@/components/animation/PinSection";

/**
 * Pinned interlude: giant "Let's build" scales up as the user scrubs
 * through, creating a cinematic beat between hero and content.
 */
export function Statement() {
  return (
    <PinSection
      end="+=120%"
      className="flex h-svh flex-col items-center justify-center overflow-hidden"
      build={(tl, root) => {
        const big = root.querySelector("[data-big]");
        const label = root.querySelector("[data-label]");
        if (!big || !label) return;
        tl.fromTo(big, { scale: 0.75 }, { scale: 1.1, ease: "none", duration: 1 })
          .fromTo(label, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.35)
          .to(root, { autoAlpha: 0, duration: 0.2 }, 0.8);
      }}
    >
      <h2 data-big className="display-xl text-center will-change-transform">
        Let&apos;s <span className="text-lime">build</span>
      </h2>
      <p data-label className="label-mono mt-10 text-white/50">
        ( Where ambition meets execution )
      </p>
    </PinSection>
  );
}
