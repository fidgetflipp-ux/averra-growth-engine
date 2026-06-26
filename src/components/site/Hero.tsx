import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-36 pb-20">
      {/* Background video — full-bleed ambient layer */}
      <motion.div
        aria-hidden
        style={{ y: videoY, opacity: videoOpacity, scale: videoScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Readability scrims + edge fades — sit above video, below content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        {/* soft top→bottom darken for text legibility, keeps video visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background" />
        {/* radial vignette focusing center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,transparent_0%,oklch(from_var(--background)_l_c_h_/_0.25)_70%,transparent_100%)]" />

        {/* very faint grain */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>

        {/* bottom fade for clean transition into next section */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div data-hero-stage="1" className="mx-auto mb-9 flex w-fit items-center gap-2.5 rounded-full hairline bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-ink">3 slots open</span>
            <span className="h-3 w-px bg-foreground/15" />
            Q1 production
          </div>
        </Reveal>


        <div className="relative">
          {/* Card 1 — Launch Roadmap (top left) */}
          <div
            className="absolute left-0 top-8 z-20 hidden w-[232px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle" data-hero-stage="6"
          >

            <div className="text-eyebrow mb-4">Launch roadmap</div>
            <div className="relative space-y-3.5">
              {/* timeline rail */}
              <div className="absolute left-[5px] top-1.5 h-[calc(100%-12px)] w-px bg-foreground/6" />

              <div className="relative flex items-start gap-3">
                <span className="relative z-10 mt-0.5 block size-[11px] rounded-full border-[1.5px] border-brand bg-white" />
                <div>
                  <div className="text-[11.5px] font-medium leading-tight text-ink-soft">Strategy complete</div>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <span className="relative z-10 mt-0.5 block size-[11px] rounded-full border-[1.5px] border-brand bg-white" />
                <div>
                  <div className="text-[11.5px] font-medium leading-tight text-ink-soft">Design approved</div>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <span className="relative z-10 mt-0.5 block size-[11px] rounded-full border-[1.5px] border-foreground/15 bg-white" />
                <div>
                  <div className="text-[11.5px] font-medium leading-tight text-ink">Development in progress</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 pt-3 border-t border-foreground/6">
              <span className="size-1 rounded-full bg-brand/60" />
              <span className="text-[10px] text-ink-muted">Launch target</span>
              <span className="ml-auto text-[11px] font-semibold tabular-nums text-ink">Jun 26</span>
            </div>
          </div>

          {/* Card 2 — One Engagement (bottom left) */}
          <div
            className="absolute left-4 top-[220px] z-20 hidden w-[210px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle" data-hero-stage="6"
          >
            <div className="text-eyebrow mb-4">One engagement</div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {[
                "Design",
                "Development",
                "CRO",
                "SEO",
                "CMS",
              ].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <svg className="size-2.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[12px] text-ink-soft">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-foreground/6">
              <span className="text-[10px] text-ink-muted">Everything required to launch</span>
            </div>
          </div>

          {/* Card 3 — Recent Result (top right) */}
          <div
            className="absolute right-0 top-4 z-20 hidden w-[220px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle overflow-hidden" data-hero-stage="6"
          >
            <div className="text-eyebrow mb-3">Recent result</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[32px] font-semibold leading-none tracking-tight text-ink">3.4×</span>
            </div>
            <div className="mt-1 text-[12px] text-ink-soft">demo bookings</div>
            <div className="mt-1 text-[10px] text-ink-muted">90 days post launch</div>

            {/* subtle background chart */}
            <svg viewBox="0 0 200 48" className="absolute -bottom-2 -right-2 h-14 w-[140px] opacity-[0.07]" aria-hidden>
              <path
                d="M0,44 C30,42 60,36 90,28 C120,20 150,12 200,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-ink"
              />
              <path
                d="M0,44 C30,42 60,36 90,28 C120,20 150,12 200,4 L200,48 L0,48 Z"
                className="fill-ink"
              />
            </svg>
          </div>

          {/* Card 4 — Client Feedback (bottom right) */}
          <div
            className="absolute right-4 top-[220px] z-20 hidden w-[260px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle" data-hero-stage="6"
          >
            <div className="text-eyebrow mb-4">Client feedback</div>
            <p className="text-[13px] leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              "Delivered in 9 days. Outperformed agencies that quoted 3 months."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-4 bg-foreground/15" />
              <span className="text-[11px] text-ink-muted">Founder, clinical-stage biotech</span>
            </div>
          </div>


          <h1 data-hero-stage="2" className="text-display relative z-10 mx-auto max-w-[18ch] text-center text-[clamp(2.75rem,7.5vw,6rem)]">
            <Reveal>
              <span className="block">Premium websites,</span>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="block">
                delivered in <span className="text-serif-italic">days</span>{" "}— not months.
              </span>
            </Reveal>
          </h1>
        </div>

        <Reveal delay={0.18}>
          <p data-hero-stage="3" className="mx-auto mt-8 max-w-xl text-center text-[17px] leading-[1.6] text-ink-soft">
            Averra is a senior design and engineering studio for ambitious
            businesses. Choose a package, reserve a slot, and we ship a
            conversion-grade website in 7–14 days.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div data-hero-stage="4" className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
            <CtaGhost href="#work" size="lg">See recent work</CtaGhost>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div data-hero-stage="5" className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-muted">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Fixed price, no hourly billing
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Live in 7–14 days
            </span>
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Senior team only
            </span>
          </div>
        </Reveal>

      </div>

    </section>
  );
}
