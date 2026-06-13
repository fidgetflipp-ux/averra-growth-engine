
# Averra — Premium Web Agency Site

A single-page (with sub-routes for legal/work) dark-mode site benchmarked against convertt.co, Linear, Vercel, Stripe, Framer. Built on the existing TanStack Start + Tailwind v4 stack.

## Design system

- **Mode:** Dark only. Near-black canvas (`oklch(0.14 0.01 270)`), elevated surfaces, hairline borders at ~8% white.
- **Accent:** Single restrained accent — soft electric violet/indigo `oklch(0.72 0.18 285)` with a paired glow token for gradients and rings. (No purple-on-white gradient slop — used sparingly as light, not fill.)
- **Type:** Display — Geist or Instrument Serif for one editorial accent; UI — Inter Tight / Geist Sans. Tight tracking on display (-0.04em), generous line-height on body.
- **Scale:** Big — hero headline clamps from 56px to 128px. Section headings 40–72px.
- **Surfaces:** Subtle radial/linear gradients, 1px borders, tasteful glass only on floating elements (nav pill, grader card).
- **Motion:** Framer Motion. Scroll-triggered reveals (y+opacity, 600ms, custom easing), magnetic buttons, marquee for logos, parallax on hero visual, number count-ups, cursor-follow glow on service cards.
- All tokens defined in `src/styles.css` under `@theme` + `:root`. No hardcoded colors in components.

## Page structure (`src/routes/index.tsx` + section components)

1. **Floating nav** — glass pill, centered, links: Work, Services, Process, Grader, Contact + primary CTA.
2. **Hero** — Massive headline "Web experiences engineered for growth.", subhead, two CTAs (Start your project / Book a consultation). Centerpiece: animated 3D-feeling gradient orb + drifting grid + parallax layers (CSS + Framer Motion, no Three.js).
3. **Social proof strip** — Real, honest metrics only (projects shipped, avg conversion lift, avg page-speed score, years in business). Marquee of *tech stack* logos (Next, Shopify, Webflow, Framer, Stripe, Vercel) instead of fake client logos.
4. **Services** — 4 cards (Web Design, Web Development, Conversion Optimization, Brand Positioning) in a bento layout. Cursor-tracked spotlight, animated border-beam on hover, micro-icons.
5. **Featured work** — Large luxury showcase cards with full-bleed mockups, outcome-first copy ("+212% conversion", "2.1s → 0.6s LCP"). Horizontal scroll on desktop, stacked on mobile.
6. **Process** — Discover → Design → Develop → Launch. Vertical timeline on desktop with a scroll-progress line, animated numerals.
7. **Results** — Large stat block (count-up on scroll) with ambient glow card treatment.
8. **Website grader (lead magnet)** — Glassmorphic input card: paste URL → scores across Design / Trust / Performance / Conversion as animated radial gauges + overall score. Email gate to send full report. (Implementation detail below.)
9. **Final CTA** — Editorial centered block: "Your website should be your best salesperson." + two buttons.
10. **Footer** — Minimal: wordmark, three columns (Studio / Work / Contact), legal row, tiny status dot ("Booking Q1 2027").

## Website grader — technical approach

- Frontend form posts URL to a server function `gradeWebsite` (`src/lib/grader.functions.ts`).
- Server fn fetches the URL, runs heuristics in pure JS (no headless browser — workerd can't run it):
  - **Performance:** HTML size, image count, render-blocking tags, response time, gzip header.
  - **Trust:** HTTPS, valid SSL header, presence of meta description, OG tags, favicon, contact info.
  - **Design:** Viewport meta, responsive hints, font count, inline-style ratio, semantic HTML ratio.
  - **Conversion:** CTA detection (button/anchor copy heuristics), form presence, above-fold text density.
- Returns 4 scores 0–100 + overall. Email capture stored only if Lovable Cloud is enabled later — for v1, render result inline and offer "Email me the full report" as a mailto fallback.
- Lead magnet does NOT require backend on day one; everything is computed in the server fn from the fetched HTML.

## Files to create

```text
src/routes/index.tsx                 (compose sections, set head/meta + JSON-LD)
src/routes/work.$slug.tsx            (case study placeholder route)
src/components/site/Nav.tsx
src/components/site/Hero.tsx
src/components/site/SocialProof.tsx
src/components/site/Services.tsx
src/components/site/FeaturedWork.tsx
src/components/site/Process.tsx
src/components/site/Results.tsx
src/components/site/Grader.tsx
src/components/site/FinalCta.tsx
src/components/site/Footer.tsx
src/components/site/primitives/      (MagneticButton, RevealOnScroll, CountUp, SpotlightCard, Marquee, GradientOrb)
src/lib/grader.functions.ts          (createServerFn — fetch + heuristics)
src/styles.css                       (tokens, fonts via <link> in __root)
```

Dependencies to add: `framer-motion`, `lucide-react` (already common), `zod` (for grader input).

## SEO & polish

- Per-route `head()` with title <60ch, description <160ch, OG/Twitter, JSON-LD `Organization` + `ProfessionalService`.
- Single H1 per page. Semantic sectioning. `prefers-reduced-motion` respected on all animations.
- Lazy-load heavy visuals, `loading="lazy"` on below-fold images, preconnect to font origin.

## Out of scope (v1)

- Real CMS / case study content (use 3 polished placeholder case studies with generated visuals).
- Auth, payments, persistent lead storage (no Cloud yet — can add later if you want lead capture stored).

## Quality bar

When done, the homepage should feel like a €15k+ studio's own site: restrained motion, oversized typography, generous whitespace, one accent color used like a spotlight, zero generic-agency tropes.
