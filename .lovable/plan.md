
# Architectural Hero & First Transition

Rebuild the hero's signature object as a real 3D fused-glass monolith and replace the Hero→Showcase handoff with a single cinematic camera reveal. No other sections change. The existing typography, color, badge, headline, CTAs and Showcase content stay intact.

## 1. Hero — strip and breathe

File: `src/components/site/Hero.tsx`

Keep:
- Nav (already separate)
- Availability badge
- Headline ("Premium websites, delivered in days.")
- Supporting line
- Primary + secondary CTA
- One architectural object (new, see §2)

Remove:
- Background video and its scroll-tied parallax/opacity/scale
- Ambient vignette layer driven by cursor
- Grid + scrim stack
- All decorative motion on text container

Whitespace pass:
- `min-h-[100vh]` → `min-h-[110vh]`
- Section padding: `pt-40 pb-40` → `pt-48 pb-56`
- Headline → object spacing: `mt-28` → `mt-40`
- Headline max-width unchanged; tighten supporting copy column to `max-w-[30ch]`
- Background becomes a single near-white wash with one extremely soft sage radial bloom (≤8% opacity) centered low-mid. No grid, no noise, no video.

## 2. The architectural object — fused crystal monolith

New file: `src/components/site/hero/Monolith.tsx`

Hybrid render. R3F owns the object. CSS owns the camera/transition wrapper.

Geometry — three ultra-thin planes fused into one slab:
- Plane A (front):  0.020 thick, full size, centered z = 0
- Plane B (core):   0.024 thick, full size, z = −0.018
- Plane B (back):   0.020 thick, full size, z = −0.036
- Slight bevel on each plane edge (RoundedBox, radius 0.04, smoothness 6)
- Proportion: 1 × 1.55 × 0.08 (golden-ratio-ish vertical slab)

Material — `MeshPhysicalMaterial`:
- transmission 1.0, ior 1.45, thickness 0.6
- roughness 0.05, metalness 0
- attenuationColor `#e8efe9` (faint sage), attenuationDistance 1.8
- clearcoat 1, clearcoatRoughness 0.08
- envMapIntensity 0.7

Lighting & env:
- `<Environment preset="studio" />` from drei (no visible background)
- One directional key light, soft warm fill, subtle rim from behind
- Tone mapping ACES, exposure ~1.0

Ambient motion (calm, almost imperceptible, all on the object group):
- rotation.y: sine ±0.04 rad over 14s
- rotation.x: sine ±0.015 rad over 18s (offset phase)
- position.y: sine ±0.012 over 9s
- No idle plane separation. Idle state reads as one slab.

Cursor parallax:
- Normalized pointer → spring (stiffness 40, damping 22)
- Adds rotation.y ±0.06, rotation.x ±0.04, group.x ±0.05
- Lighting key light position lerps with pointer for a slow specular shift

Plane separation (driven by scroll, not idle):
- `separation` uniform 0→1
- Plane A translates +z by 0.10·s
- Plane B (back) translates −z by 0.10·s
- All three rotate.y diverge by ±0.06·s
- At s=0 they read as one slab; at s≈0.35 depth is visible; at s=1 they form the portal (see §3)

Canvas:
- `<Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 3.2], fov: 32 }}>`
- Transparent background; the section's CSS wash shows through
- Sized via wrapper, default ~520×640 in hero, escalates during transition (see §3)
- `frameloop="always"` while in view, `"demand"` when offscreen (IntersectionObserver)

Floor contact:
- Soft elliptical shadow rendered in CSS under the canvas (not in 3D), tied to scroll so it stretches as the object lifts

## 3. The transition — Hero into Showcase as one camera move

This replaces the current "section scrolls underneath an enlarging card" handoff. There is no second section sliding up. The visitor is moved through the object into the Showcase room.

New wrapper file: `src/components/site/Portal.tsx`
Edits: `src/routes/index.tsx` (wrap Hero + Showcase in a single `PortalStage`), `src/components/site/Showcase.tsx` (reveal-from-glass entry, no own intro animation).

Architecture:

```text
<PortalStage>           ← position: relative, height = 220vh
  <StickyViewport>      ← position: sticky, top:0, h:100vh, overflow:hidden
    <HeroLayer/>        ← opacity & blur tied to scroll
    <MonolithStage/>    ← R3F canvas, scales + camera dollies via scroll
    <ShowcaseLayer/>    ← initially hidden behind the glass
  </StickyViewport>
  <Spacer 220vh/>       ← provides the scroll distance
</PortalStage>
```

Scroll progress `p` ∈ [0,1] across the sticky range, driven by a single `useScroll` + `useSpring` (stiffness 60, damping 22, mass 0.8) to add inertia. All sub-animations read this one spring — no per-element scroll listeners.

Choreography:

- p 0.00 – 0.15 — Idle hero. Object as single slab. Text fully visible.
- p 0.15 – 0.35 — Detachment. Headline + CTAs fade to 0 and translate y −24px with blur(2px). Object lifts slightly (group.y +0.15), brightness of key light rises ~12%. Plane separation starts (0→0.4).
- p 0.35 – 0.60 — Camera follow. R3F camera dollies from z 3.2 → z 1.6, fov 32 → 28. Object rotates from 0 → ~0.18 rad on y, then back to 0 (a believable pan-around). Planes continue to fan to separation 0.85. Outer planes rotate to face camera; inner plane stays parallel — visually it begins to read as a portal frame.
- p 0.60 – 0.85 — Portal formation. Planes scale on x/y from 1 → ~2.4 (still within the canvas), camera z → 0.6, fov → 24. The object now fills the viewport. Material thickness lerps 0.6 → 0.15, transmission stays 1, roughness 0.05 → 0.02 — glass becomes clearer. A faint internal vignette dissolves.
- p 0.85 – 1.00 — Dissolve. Glass `opacity` (material) lerps 1 → 0 with a brief refractive caustic flash (`envMapIntensity` 0.7 → 1.4 → 0.9). ShowcaseLayer was already mounted at p≥0.55 with `opacity 0`, `scale 1.04`, `blur(8px)`. It lerps to `opacity 1`, `scale 1`, `blur 0` across 0.85–1.0. Hero DOM is fully gone by p=0.6.
- p ≥ 1.00 — Sticky releases. Normal scroll resumes inside Showcase. Showcase no longer plays its own intro (its first state is the resting state of the portal reveal).

Reverse direction is the same curve played backwards — the planes reassemble into the monolith as the user scrolls up. Nothing pops.

Golden rule compliance:
- ShowcaseLayer is mounted from p=0.55 onward, behind the glass — it always existed, it is revealed by the glass clearing.
- Hero text doesn't get unmounted with a swap; it dims and the camera leaves it behind.
- The monolith doesn't disappear at the end — its material goes to 0 opacity while the planes are already at viewport scale, so it reads as "we walked through it."

## 4. Motion + perf rules

- All easing: `cubic-bezier(0.22, 1, 0.36, 1)` or framer `useSpring` with damping ≥ 20. No bounce, no overshoot anywhere.
- One `useScroll` per `PortalStage`. All downstream values are `useTransform` off that single progress spring. No nested ScrollTriggers.
- R3F: `frameloop="demand"` outside the portal range, `"always"` inside (toggled via IntersectionObserver on `StickyViewport`).
- `Canvas` `dpr` clamped to `[1, 1.75]`; on `prefers-reduced-motion`, the portal collapses to a 250ms cross-fade and the monolith renders as a single static frame with no idle animation.
- No layout-triggering properties animated. Only `transform`, `opacity`, `filter`, and R3F uniforms.

## 5. Files

Created:
- `src/components/site/hero/Monolith.tsx` — R3F scene (planes, material, lights, ambient + cursor + separation logic)
- `src/components/site/hero/MonolithStage.tsx` — Canvas wrapper, IntersectionObserver, scroll prop fan-out
- `src/components/site/Portal.tsx` — `PortalStage` + `StickyViewport`, owns the single `useScroll`/spring, renders HeroLayer, MonolithStage, ShowcaseLayer

Edited:
- `src/components/site/Hero.tsx` — strip background/video/grid/scrim, remove existing glass-slab JSX, slim copy column, accept a `progress` motion value prop and bind text fade/blur to it. No longer renders its own section sizing — `PortalStage` owns viewport.
- `src/components/site/Showcase.tsx` — remove its own scroll-driven entry intro (the portal handles entry). Internal stage progression remains unchanged.
- `src/routes/index.tsx` — replace adjacent `<Hero />` and `<Showcase />` with `<PortalStage><Hero/><Showcase/></PortalStage>`.

No package installs needed — `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion` already in `package.json`.

## 6. Explicitly out of scope

- Services, Featured Work, Process, Packages, Booking, Footer — untouched.
- Typography, color tokens, badge, CTAs, logo — untouched.
- Showcase's internal 5-stage content — untouched.
- No new dependencies, no new assets.
