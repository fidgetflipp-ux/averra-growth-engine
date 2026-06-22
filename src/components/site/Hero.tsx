import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Layered background — mesh gradient + grid + grain for premium depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* sage mesh gradient — soft, contained blooms */}
        <div className="absolute left-1/2 top-[-20%] h-[760px] w-[1180px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.09),transparent_60%)] blur-3xl" />
        <div className="absolute -left-48 top-48 h-[480px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.05),transparent_65%)] blur-3xl" />
        <div className="absolute -right-48 top-16 h-[520px] w-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.05),transparent_65%)] blur-3xl" />

        {/* subtle grid — fades from center */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
          }}
        />

        {/* very faint grain — overlay blend keeps it light, not muddy */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>

        {/* bottom fade for clean transition into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto mb-9 flex w-fit items-center gap-2.5 rounded-full hairline bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur">
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
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "0.5s" }}
            className="absolute left-0 top-8 z-20 hidden w-[232px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle"
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
          </motion.div>

          {/* Card 2 — One Engagement (bottom left) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "2s" }}
            className="absolute left-4 top-[220px] z-20 hidden w-[210px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle"
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
          </motion.div>

          {/* Card 3 — Recent Result (top right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "1.2s" }}
            className="absolute right-0 top-4 z-20 hidden w-[220px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle overflow-hidden"
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
          </motion.div>

          {/* Card 4 — Client Feedback (bottom right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "2.8s" }}
            className="absolute right-4 top-[220px] z-20 hidden w-[260px] rounded-2xl border border-foreground/7 bg-white/95 p-5 shadow-card backdrop-blur-xl xl:block animate-float-subtle"
          >
            <div className="text-eyebrow mb-4">Client feedback</div>
            <p className="text-[13px] leading-relaxed text-ink-soft" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              "Delivered in 9 days. Outperformed agencies that quoted 3 months."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-px w-4 bg-foreground/15" />
              <span className="text-[11px] text-ink-muted">Founder, clinical-stage biotech</span>
            </div>
          </motion.div>

          <h1 className="text-display relative z-10 mx-auto max-w-[18ch] text-center text-[clamp(2.75rem,7.5vw,6rem)]">
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
          <p className="mx-auto mt-8 max-w-xl text-center text-[17px] leading-[1.6] text-ink-soft">
            Averra is a senior design and engineering studio for ambitious
            businesses. Choose a package, reserve a slot, and we ship a
            conversion-grade website in 7–14 days.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
            <CtaGhost href="#work" size="lg">See recent work</CtaGhost>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ink-muted">
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
