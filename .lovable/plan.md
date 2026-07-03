## Goal

Transform the existing Collage section into a scroll-driven 3D unfold. The four collage tiles physically separate like architectural panels as the user scrolls past the "An art-directed system, photographed as one." headline, revealing a dark observatory environment already living underneath. Nothing fades out — the collage becomes the doorway.

## Behavior

Single sticky section (`~250vh` tall). One `useScroll` progress value (`0 → 1`) drives everything. Three stages mapped to progress ranges:

- **0 – 0.15 · Rest**: Collage sits exactly as today. Headline + eyebrow visible above.
- **0.15 – 0.30 · Activation**: `perspective: 2000px` engages on the grid. Each tile gets a tiny `translateZ` + `rotateY` lift. Shadows deepen from `0 10px 40px rgba(0,0,0,0.05)` → `0 30px 80px rgba(0,0,0,0.18)`. Gap grows 24 → 40px.
- **0.30 – 0.60 · Separation**: Tiles drift apart along authored vectors (no scale > 1.05, no spin). Gap continues 40 → 120px. Background of the section transitions from `#F7F6F2` → transparent so the observatory layer underneath starts to bleed through the widening gaps.
- **0.60 – 1.0 · Reveal**: Tiles continue outward past the viewport edges (`translate` up to ±60vw / ±60vh, `rotateY ±14°`, `rotateX ±10°`). Observatory layer becomes fully visible. At `~0.95` the section releases stickiness and the next section (`FutureState`) enters naturally.

Per-tile motion vectors (matches the brief):

| Tile | Translate (at p=1) | Rotate |
|---|---|---|
| Stationery (left large) | `x: -55vw, y: -8vh` | `rotateY: +12°` (outward) |
| Analytics (top center) | `y: -55vh` | `rotateX: -10°` |
| Monogram (top right) | `x: +38vw, y: -30vh` | `rotateY: -14°` |
| Glass / Process (bottom wide) | `y: +55vh` | `rotateX: +10°` |

All eased with `cubic-bezier(0.22, 1, 0.36, 1)` via `useTransform` (no springs — direct scroll binding).

## Reveal Environment: Dark Observatory

Rendered as an absolutely-positioned layer *behind* the collage grid inside the same sticky container, so it's already there — the tiles are literally walls in front of it.

- Base: near-black `#0A0B0F` with a soft radial from `#141826` at center.
- Slow-drifting starfield: two stacked `radial-gradient` layers (`background-size: 3px 3px` and `2px 2px`) with subtle `background-position` animation.
- One conic/radial "core" glow in sage (`oklch(...)` from the existing palette) at center, opacity tied to progress (0 at p<0.3 → 0.9 at p=1).
- Faint structural horizon line (1px, 8% white) at 62% height.
- Small caption that fades in at p>0.7: `Enter the standard.` in Fraunces italic — bridges thematically to the FutureState section that follows.

Opacity of the observatory layer: `0` until `p=0.25`, ramps to `1` by `p=0.65`. Collage `background-color` interpolates ivory → transparent across the same range so the observatory reads through.

## Structural Changes

- `src/components/site/Collage.tsx`: rewrite as a sticky scroll stage.
  - Outer wrapper: `relative` with `height: 250vh`.
  - Inner sticky: `sticky top-0 h-screen overflow-hidden`.
  - Layers (back → front): `Observatory` → headline block (also drifts up and dims slightly after p>0.4) → `CollageGrid` with per-tile `motion.div` transforms.
  - Uses `useScroll({ target: wrapperRef, offset: ["start start", "end end"] })` + `useTransform` per tile.
  - Keep existing images and grid proportions at rest (100-col grid, 24px base gap, 32px radii, 1000px maxWidth) — motion is applied on top via transforms so the resting composition is identical to today.
- New sub-component `Observatory` inside the same file (no new file — keeps scope tight).
- No changes to `src/routes/index.tsx` ordering; the section still sits between `PortalStage` and `FutureState`.
- No new deps.

## Technical Notes

- Transforms only (`translate`, `rotate`, `opacity`) — no layout thrash. `will-change: transform` on tiles during the sticky range.
- `preserve-3d` on the grid; `perspective` on its parent (interpolated 1200 → 2100px so activation feels like the room deepening).
- Respect `prefers-reduced-motion`: skip transforms, keep tiles static, still show observatory at bottom of the section so the reveal is legible.
- Mobile (`<768px`): reduce translate distances by ~50% and drop `rotateX/Y` to ±4° to avoid disorientation; keep the same 3-stage timing.
- The FutureState section that follows already has a dark aesthetic, so the observatory doubles as a visual bridge — no color clash on exit.

## Out of Scope

- No new copy on other sections. No changes to FutureState, Portal, or Services. No new assets — reuses the four existing collage PNGs.
