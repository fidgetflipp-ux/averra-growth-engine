# Cinematic intro sequence → existing hero

361 frames pin to scroll, then dissolve into the existing Hero with no perceptible cut.

## Stack note
This project is **TanStack Start + Vite + React 19**, not Next.js. The motion stack you asked for works identically here — I'll install **GSAP + ScrollTrigger + Lenis** and use them as specified. Frames go to the Lovable CDN (not `/public/frames`) because that's how this project ships binaries; behavior is unchanged.

## 1. Frame pipeline
- Extract both zips → 361 WebPs to `/tmp/frames/`.
- Loop `lovable-assets create` to push every frame; pointers land in `src/assets/frames/frame_NNNN.webp.asset.json`.
- Generate `src/assets/frames/manifest.ts` exporting `FRAMES: string[]` (length 361, ordered).

## 2. Rendering engine — `src/components/site/CinematicIntro.tsx`
- Fullscreen `<canvas>` inside a `position: sticky` wrapper; outer section is **~600vh tall** so 361 frames map to a long, slow scrub (~1.6vh per frame — feels physically attached, not snappy).
- Single `Image[]` array. Strategy:
  - **Eager**: frames 1–24 awaited before fade-in (covers first paint with no stutter).
  - **Progressive**: remaining 337 frames decoded in background, concurrency = 6, prioritised by proximity to current index.
- Render loop: `requestAnimationFrame` reads a ref (`currentFrame`) updated by ScrollTrigger's `onUpdate`; only draws if index changed. Canvas sized to `devicePixelRatio`, `image-rendering: high-quality`, `object-fit: cover` math centered.
- Zero React re-renders during scrub (everything via refs).

## 3. Scroll wiring
- **Lenis** mounted once at the route level (`src/routes/index.tsx`) with `lerp: 0.1`, autoRaf driving GSAP's ticker (`gsap.ticker.add(time => lenis.raf(time*1000))`).
- **ScrollTrigger** on the intro section: `pin: true`, `scrub: 0.5` (tiny smoothing so scroll feels weighty, not laggy), `start: "top top"`, `end: "bottom bottom"`. `onUpdate` writes `Math.round(progress * 360)` to the frame ref.
- Backward scroll just decrements naturally — no special handling needed.

## 4. The handoff (the critical part)
The existing Hero **stays exactly where it is**. The intro section sits **above** it in the DOM. The illusion:

1. Frames 0–340 → canvas full opacity, Hero hidden (`opacity: 0`, still in layout below).
2. Frames 340–355 → ScrollTrigger timeline begins:
   - Canvas opacity 1 → 1 (held)
   - Hero opacity 0 → 1 with subtle 12px upward translate (nav, headline, copy, buttons — staggered 80ms, `power2.out`, no scale, no bounce)
3. Frames 355–361 → canvas opacity 1 → 0 over the last ~6 frames while the final frame is still painted. Hero is already at full opacity underneath.
4. Pin releases. User is now scrolling the real Hero with the video background — they never saw a cut.

Because the final frame's composition (centred subject, generous negative space, white-ish ground) matches the existing Hero's centred headline + subtle video bg, the eye reads it as one continuous space. No reposition of the Hero is needed.

## 5. Mobile / reduced-motion / perf
- `< 768px`: shorten pinned section to ~300vh, step by 2 frames (180 effective) to halve decode work.
- `prefers-reduced-motion`: skip the sequence entirely — render only the final frame as a static image, fade straight into Hero.
- Pause RAF + abort pending decodes on `visibilitychange`.
- Memory cap: keep `Image` references in a Map; never decode beyond what's loaded.

## 6. Out of scope
- No changes to Hero, Showcase, Services, or any other section.
- No new sections, no overlay copy on the canvas, no particles, no flares.
- No backend.

## Files touched
- **New**: `src/assets/frames/*` (361 pointers + manifest.ts), `src/components/site/CinematicIntro.tsx`, `src/hooks/use-lenis.ts`
- **Edited**: `src/routes/index.tsx` (mount Lenis + render `<CinematicIntro />` above `<Hero />`), `package.json` (add `gsap`, `lenis`)

Approve to build.
