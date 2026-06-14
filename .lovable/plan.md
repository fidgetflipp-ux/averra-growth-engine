# Floating Averra Workspace Canvas

Replace the current project-dashboard card in `src/components/site/Showcase.tsx` with a single evolving website canvas housed in a custom Averra workspace frame. One website, five visible transformations. No browser chrome, no laptop frame, no page swaps.

## What changes

1. **Workspace frame** — custom Averra OS-style shell (not browser, not laptop)
2. **Website canvas** — one site that morphs through 5 build stages
3. **Notifications** — stage-based, max 2–3 visible, software-update tone
4. **Cleanup** — remove the dashboard sidebar, stats grid, milestone list, activity feed, launch banner, preview-panel-inside-card

## The frame

Ultra-minimal floating glass panel. Rounded corners (16px), thin top status bar, soft depth shadow, subtle border. Inspired by Linear / Arc / Vision Pro.

Top status bar (~36px) contains, left to right:
- Averra mark (small monogram, ~14px)
- Project name: **ScarTec Therapeutics**
- Live status dot + label
- Phase pill: Strategy → Design → Development → Optimization → Launch (animates on stage change)

No traffic-light dots. No URL bar. The canvas below occupies ~90% of frame height.

Frame keeps the current scroll-driven 3D rotation/lift and the `scale: 0.86` sizing so it doesn't overlap the headline.

## The evolving website canvas

A single site morphing in place. Same hero block, same nav, same sections — they gain fidelity each stage. Cross-fade content layers with framer-motion so the structure feels continuous, not swapped.

**Stage 0 — Strategy (wireframe)**
Grey skeleton wireframe: nav placeholder bar, hero block with two text bars + CTA rectangle, three feature placeholder cards, footer bar. Mono dashed outlines. Annotations like "H1", "CTA", "section" in faint mono.

**Stage 1 — Design (high-fidelity mock)**
Same blocks, now styled: real type for hero ("Therapeutics, reimagined."), serif-italic accent word, soft brand gradient hero background, real card layouts with image placeholders, brand color appears. Looks like a Figma comp.

**Stage 2 — Development (coded)**
Same layout, now sharper: real imagery in cards, real microcopy, a subtle code-bracket overlay fading out at top corner, a tiny "components: 12" mono tag. Pixel-perfect feel.

**Stage 3 — Optimization**
Site stays. A thin performance overlay appears at top of canvas: LCP 0.6s · CLS 0.01 · SEO 100 · A11y 100, animated in. A scanline sweep passes once.

**Stage 4 — Launch (live)**
Overlay clears. Status pill flips to "Live". A soft brand glow halos the frame. A small "scartec.com · 99.99%" badge anchors bottom-right of canvas. Subtle pulse on the live dot.

Everything is CSS/HTML mock — no real images needed beyond existing tokens and gradients.

## Notifications

Smaller, refined, OS-update tone. Max 2–3 visible at once. Each is a thin pill (~28px tall): tiny icon + one line of text + faint timestamp. Glass background, hairline border, soft shadow. Subtle fade + 4px slide in/out, no drift, no rotation.

Stage-mapped (only this stage's notes are mounted):

- Strategy: Positioning approved · Sitemap finalized
- Design: Homepage approved · Client feedback received
- Development: CMS connected · Development 72%
- Optimization: SEO configured · Analytics connected · Performance 98
- Launch: Launch scheduled · Deployed successfully · Live on custom domain

Positioned around (not on top of) the frame: two on the right edge, one on the left, staggered vertically. They appear with the stage, exit when the stage changes.

## Files

- `src/components/site/Showcase.tsx` — only file touched
  - Delete `Workspace` body (sidebar/stat/milestones/activity/launch banner) and `PreviewForStage`
  - Add `WorkspaceFrame` (custom chrome) wrapping `WebsiteCanvas`
  - Add `WebsiteCanvas` with 5 stage layers, cross-faded by `stage` prop
  - Replace 5 `FloatingNote` instances with stage-keyed notification group (2–3 per stage)
  - Keep: scroll wrapper, stage detection, 3D transform values, header, stage rail at bottom, ambient backdrop

## Out of scope

- No new dependencies
- No route, data, or backend changes
- Header copy and stage rail unchanged
- Section height (420vh) unchanged
