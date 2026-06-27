# Future State — Editorial Section

A single immersive editorial moment between the hero and the Showcase. No cards, no chrome, no metrics. One eyebrow, one headline, one paragraph, one monumental image, one whispered caption.

## Placement
Inserted in `src/routes/index.tsx` directly after `<PortalStage />`, before `<Showcase />`. Continues the hero's warm off-white world so the camera doesn't cut — it walks forward.

## Files
- **new** `src/components/site/FutureState.tsx` — the section.
- **new** `src/assets/future-state.jpg.asset.json` — the attached architectural reference image, uploaded via `lovable-assets` from `/mnt/user-uploads/`.
- **edit** `src/routes/index.tsx` — mount the section.
- **edit** `src/styles.css` — add one `@utility` for the horizontal mask reveal keyframes (the only new motion primitive).

## Composition (top → bottom)
```text
                    — FUTURE STATE —              ← mono eyebrow, hairlines either side

         Become the company competitors
            benchmark themselves against.          ← Fraunces display, ~clamp(2.75rem, 6vw, 5.25rem)
                                                       "against." in serif italic for one beat of emphasis

         Most companies grow faster than
         perception. The companies that
         dominate categories understand
         something earlier: how they are
         perceived determines who trusts
         them, hires them, invests in them,
         and competes with them.                   ← max-w ~58ch, ink-soft, 1.65 leading

         A world-class digital presence
         changes that.                             ← own line, ink (full weight) for closure


   ┌──────────────────────────────────────────┐
   │                                          │
   │        [architectural image]             │   ← max-w 1400px, rounded-[28px],
   │                                          │     hairline glass border, soft shadow,
   │                                          │     object-cover, 16:9
   └──────────────────────────────────────────┘


                  PERCEPTION COMPOUNDS            ← mono eyebrow

              Trust accelerates.
              Pricing power increases.            ← Fraunces, ~22px, ink-soft,
              Talent follows leaders.                line-height 1.9, centered, one per line
              Opportunities become inevitable.
```

## Visual rules
- Background: `--surface` (warm off-white already in tokens) so it inherits the hero's world.
- Top + bottom hairlines (`hairline-t`, `hairline-b`) — the only dividers.
- Vertical rhythm: section uses `py-40 md:py-56`, headline → body `mt-12`, body → image `mt-24`, image → caption `mt-20`.
- Image frame: `rounded-[28px]`, `border border-foreground/8`, `shadow-[0_40px_120px_-40px_oklch(0.14_0.005_260/0.18)]`.
- Sage accent appears only as a 1px underline beneath the eyebrow rule — restraint over decoration.

## Motion (restrained, the only effects)
- **Horizontal mask reveal** on the image when it enters viewport: `clip-path` from `inset(0 100% 0 0)` to `inset(0 0 0 0)`, 1.1s, `cubic-bezier(0.22, 1, 0.36, 1)`. Triggered with `useInView({ once: true })`.
- **Hover**: image scales to 1.02 over 700ms; a `useMotionValue` cursor parallax translates the image ≤5px on X/Y, spring-damped. Frame itself does not move.
- Headline + body + caption fade/lift via the existing `<Reveal>` primitive — no new patterns.
- Honors `prefers-reduced-motion` (already global in `styles.css`).

## Why this fits the brief
- Answers one question only: *"Who do I become if I work with them?"*
- No cards, no chips, no metrics, no video.
- Inherits the hero's off-white surface, serif system, mono eyebrow, hairlines, and sage — no hard visual reset.
- The mask reveal is the signature "architectural reveal" gesture — the image is constructed in front of the visitor rather than appearing.

## After build
Drive Playwright headless against `localhost:8080`, screenshot the section at 1280×1800 in initial, mid-reveal, and settled states; verify spacing, frame, and that the hero → Future State → Showcase transition reads as one continuous room.
