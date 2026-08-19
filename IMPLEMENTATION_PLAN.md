# Implementation Plan — Cinematic Agency Website

## Audit result

Greenfield repository, scaffolded with:

- Next.js 16 (App Router, `src/` dir, TypeScript strict)
- React 19
- Tailwind CSS v4 (CSS-first `@theme` config)
- GSAP 3.15 (+ ScrollTrigger, SplitText — all plugins are free since 3.13) via `@gsap/react`
- Lenis 1.3 for smooth scroll

No pre-existing components or features to preserve.

## Architecture

```
src/
├── animations/gsap.ts          # single GSAP registration point (plugins registered once)
├── lib/
│   ├── motion.ts               # motion tokens (durations, eases, staggers)
│   ├── scroll.ts               # shared Lenis instance handle (stop/start from anywhere)
│   ├── data.ts                 # site content (services, work, stats, process, timeline)
│   └── utils.ts                # cn, clamp helpers
├── hooks/
│   ├── useMediaQuery.ts        # SSR-safe media query hook
│   └── useReducedMotion.ts     # prefers-reduced-motion hook
├── components/
│   ├── providers/
│   │   ├── SmoothScrollProvider.tsx  # Lenis ↔ GSAP ticker ↔ ScrollTrigger sync
│   │   └── LoaderProvider.tsx        # preloader completion state (gates hero entrance)
│   ├── animation/              # reusable motion primitives
│   │   ├── Reveal.tsx  TextReveal.tsx  ImageReveal.tsx  Parallax.tsx
│   │   ├── Magnetic.tsx  Marquee.tsx  Counter.tsx
│   │   ├── HorizontalScroll.tsx  PinSection.tsx
│   ├── navigation/  Navbar.tsx  Menu.tsx  CustomCursor.tsx
│   ├── transition/  TransitionProvider.tsx  TransitionLink.tsx
│   ├── Preloader.tsx
│   └── sections/    Hero, Statement, Stats, Services, Approach, Work,
│                    Testimonial, CTA, Footer, TechMarquee …
└── app/  /  /about  /services  /contact
```

## Motion rules

- GSAP + ScrollTrigger is the only animation engine (no Framer Motion — no double engine).
- All durations/eases/staggers come from `lib/motion.ts` tokens.
- Only `transform`, `opacity`, `clip-path` are animated.
- Desktop-only effects (custom cursor, magnetic, horizontal pin) are gated with
  `gsap.matchMedia` on pointer/width/`prefers-reduced-motion`.
- Reduced motion ⇒ content stays visible, reveals collapse to simple fades or nothing.
- Every component cleans up via `useGSAP` scoped contexts (no leaked triggers/listeners).

## Phases

1. ✅ Scaffold + deps
2. ✅ Global infra: tokens, GSAP setup, Lenis provider, fonts, theme
3. ✅ Preloader → hero handoff
4. ✅ Navigation (pill navbar, fullscreen menu) + custom cursor
5. ✅ Reusable primitives (Text/Image reveal, Parallax, Marquee, Counter, Magnetic, Pin, Horizontal)
6. ✅ Home page sections, then About / Services / Contact
7. ✅ Page transitions
8. ✅ Lint + build clean, headless-browser QA (desktop + mobile + reduced motion, 0 console errors)

## Notes

- **Node ≥ 20 required** (`.nvmrc` pins 22; the shell's default Node 16 cannot build this).
  Run `nvm use` before `npm run dev` / `npm run build`.
- Dev server: `npm run dev` (port 3000 may be occupied by another local app — use `PORT=3100 npm run dev`).
- The contact form currently hands off to `mailto:`; wire it to a real endpoint later.
- Work/services "artwork" is CSS gradient placeholders — swap in real project imagery
  (via `next/image`) inside `Work.tsx` / `ServiceBlocks.tsx` when assets exist.
