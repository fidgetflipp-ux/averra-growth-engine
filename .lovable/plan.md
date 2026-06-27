# Authority Mechanism — Editorial Thesis Section

A pure-typography section placed directly below `<FutureState />` and above `<Showcase />`. No cards, icons, images, gradients, or shadows. Type and whitespace carry it.

## Placement
`src/routes/index.tsx` — insert `<AuthorityMechanism />` between `<FutureState />` and `<Showcase />`. Inherits the same warm `--surface` background so the camera keeps walking forward — no hard reset.

## Files
- **new** `src/components/site/AuthorityMechanism.tsx`
- **edit** `src/routes/index.tsx` — mount the section

No CSS additions — uses existing `text-eyebrow`, `text-display`, `text-serif-italic`, `hairline-t/b`, and the existing `Reveal` primitive's motion vocabulary (opacity + 12px y, 700ms, `cubic-bezier(0.22,1,0.36,1)`).

## Composition

```text
                 ── HOW AUTHORITY IS BUILT ──        ← 11px mono, tracking 0.35em, hairlines either side


           Companies do not dominate markets
              because they are larger.
           They dominate because they are
             perceived differently.                  ← Fraunces, clamp(2rem, 3.4vw, 2.6rem),
                                                       leading 1.15, centered, max-w ~22ch
                                                       "perceived differently." in serif italic


            (large vertical breath — ~14rem)


             Trust is established before
              conversations begin.                   ← Fraunces, clamp(1.6rem, 2.4vw, 2.1rem),
                                                       leading 1.4, max-w 900px, centered
            Credibility shortens sales cycles.
             Perception increases pricing power.
            Exceptional companies attract
              exceptional people.
                  Momentum compounds.
            Eventually markets stop comparing
                  you to competitors.
              Competitors compare themselves
                      to you.                        ← final line — slightly heavier weight


              (vertical breath — ~10rem)


          A world-class digital presence
          accelerates that process.                  ← 18px Inter Tight, ink (full weight),
                                                       centered, max-w 60ch


             ── HOW WE BUILD AUTHORITY ──            ← closing eyebrow, transitions to next section
```

## Motion
- Each body line is its own `<Reveal>`: opacity 0 → 1, translateY 12px → 0, duration 700ms, ease `cubic-bezier(0.22,1,0.36,1)`, `once: true`, staggered ~140ms by index.
- Headline and final statement use the same primitive — no new motion patterns.
- Honors `prefers-reduced-motion` (already global).

## Visual rules
- Background `bg-surface`, `hairline-t hairline-b`, `min-h-screen` flex column centered.
- Section padding `py-40 md:py-56`, content max-w `1100px`.
- Body line color `text-ink-soft`; the "Competitors compare themselves to you." line uses `text-ink` for closure.
- Closing eyebrow doubles as the bridge into Showcase — same hairline treatment as the opening eyebrow.

## Why this fits the brief
- Answers exactly one question: *why does presentation matter?*
- No imagery, no chrome, no decoration — typography and whitespace only.
- Inherits Future State's surface, serif system, mono eyebrow, hairlines.
- The closing "HOW WE BUILD AUTHORITY" eyebrow hands the visitor off to the Showcase/process world without a visual cut.

## After build
Drive Playwright at 1280×1800 against `localhost:8080`, screenshot the section in initial, mid-scroll (lines mid-fade), and settled states. Verify spacing reads cinematic and the Future State → Authority Mechanism → Showcase sequence reads as one continuous room.
