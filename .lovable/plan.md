# Perception Compounds — Kinetic Editorial Redesign

Right now the four lines sit centered on white. Correct typography, zero presence. We turn this closing beat into the section's emotional crescendo — the moment the visitor exhales.

## Concept: "The Compounding Stack"

Four words. Four laws. They don't just *list* — they **stack, accumulate, and lock into place** as the visitor scrolls. Each line is a *consequence* of the one above it. The design should feel that compounding mathematically, visually, kinetically.

Inspirations: Bureau Cool, Locomotive, Resn, Active Theory, Apple's "Designed by Apple in California" sequences.

## Composition

```text
                              ┌─ 01 ─┐
                              │      │ ← tiny ordinal, mono, ink-muted
                                Trust            ← Fraunces ~140px, ink, leading 0.95
                                accelerates.     ← Fraunces italic, sage-tinted underline draws on reveal
                              ─────────────────  ← hairline draws L→R, 700ms

                              ┌─ 02 ─┐  +12%   ← micro metric chip, mono, ink-muted
                                Pricing
                                power increases.
                              ─────────────────

                              ┌─ 03 ─┐  ↗
                                Talent
                                follows leaders.
                              ─────────────────

                              ┌─ 04 ─┐  ∞
                                Opportunities
                                become inevitable.   ← final word italic + sage; no hairline below

                    ╲                                     ╱
                     ╲    PERCEPTION COMPOUNDS    ╲      ╱  ← restated as a watermark
                      ╲     mono, 11px, ink/30      ╲   ╱     anchored bottom, hairlines extending
                                                              full-width L and R
```

Left-aligned, not centered. Centered felt like a tombstone. Left-aligned with a long measure feels like an essay you can't stop reading.

## Kinetic behaviour (the signature)

A single `useScroll` on the block drives every line. As the visitor scrolls through the section:

1. **Sequential reveal, not simultaneous.** Each line enters when its row crosses 70% viewport. Mask-clip from bottom (`clip-path: inset(0 0 100% 0) → inset(0 0 0 0)`), 900ms, `cubic-bezier(0.22, 1, 0.36, 1)`. Letterforms appear to *rise out of the page*.
2. **The italic word lands last** — split from the rest of its line by ~120ms, with a 6px lift and a hairline underline drawing left-to-right beneath only the italic word. This is the "beat" of each law.
3. **Ordinal counters tick** (`01 → 04`) using `useTransform` on the same progress — they're never static text, they ride the scroll.
4. **Hairlines draw between lines** — `scaleX 0 → 1` from left origin, tied to scroll progress, not entrance. Scrolling forward draws them; scrolling back un-draws. The page feels alive under the cursor.
5. **Compounding indicator on the left rail** — a thin vertical sage line grows from 0 → full height as the visitor passes each law. By line 4 it's complete. Literal visual compounding.
6. **Final word "inevitable."** gets a one-time sage gradient sweep across the glyphs (CSS background-clip text) timed to the final reveal — the only color moment in the entire section.

## Visual elements

- **Type**: Fraunces display, ~clamp(4rem, 9vw, 9rem), `opsz` 144, weight 360. Italic for the verb of each law (`accelerates`, `increases`, `leaders`, `inevitable`).
- **Ordinals**: JetBrains Mono, 11px, ink-muted, tabular-nums.
- **Side chips** (+12%, ↗, ∞): mono 11px, sit on the baseline of the ordinal row.
- **Hairlines**: 1px `--rule`, full row width.
- **Left compounding rail**: 1px, sage at 40%, positioned 24px left of the type column.
- **Watermark**: "PERCEPTION COMPOUNDS" repeated as the eyebrow at the bottom, flanked by hairlines extending to the section edges — bookends the moment.
- **Background**: stays `--surface`. Add a barely-there sage radial bloom (5% opacity) anchored bottom-center that **intensifies** as the rail fills. The page literally warms as perception compounds.

## Continuity (no hard cut)

- Inherits the hero's warm off-white.
- The architectural image above already settles into stillness — this block picks up that stillness and re-introduces motion *one line at a time*. The camera is still moving forward; we're just walking down a long corridor of laws.
- The bottom hairlines + watermark hand off cleanly into the Showcase section's frame.

## Files to change

- **edit** `src/components/site/FutureState.tsx` — replace the current caption block (lines ~58–80 in the file) with a new `<PerceptionCompounds />` subcomponent. The headline/body/image sections above are unchanged.
- **edit** `src/styles.css` — add two utilities: `@utility mask-reveal-up` (clip-path keyframe), `@utility text-sage-sweep` (background-clip gradient for the final word). No other CSS changes.
- No new dependencies. `framer-motion` is already in.

## Reduced motion

`prefers-reduced-motion` short-circuits all scroll-tied transforms and reveals. Lines appear instantly, hairlines render at full width, no rail animation. Already global in `styles.css`.

## Verification

After build, Playwright at 1280×1800: scroll the section in 25% increments, screenshot at 0 / 35 / 70 / 100 — verify each law enters in sequence, the left rail fills proportionally, the final italic word receives the sage sweep, and the watermark is present at the bottom.
