import { motion } from "framer-motion";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";

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
          {/* Card 1 — Website Progress (top left) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "0.5s" }}
            className="absolute left-0 top-10 z-20 hidden w-[220px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-subtle"
          >
            <div className="text-eyebrow mb-3">Website Progress</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <svg className="size-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Strategy complete
              </div>
              <div className="flex items-center gap-2 text-[12px] text-ink-soft">
                <svg className="size-3.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Design approved
              </div>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-[10px] text-ink-muted">
                <span>Development</span>
                <span className="font-medium text-brand-ink">72%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/8">
                <div className="h-full w-[72%] rounded-full bg-brand" />
              </div>
            </div>
            <div className="mt-2.5 text-[10px] text-ink-muted">Launch target: June 26</div>
          </motion.div>

          {/* Card 2 — Included (bottom left) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "2s" }}
            className="absolute left-4 top-[230px] z-20 hidden w-[200px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-subtle"
          >
            <div className="text-eyebrow mb-3">Included</div>
            <div className="space-y-1.5">
              {[
                "Website design",
                "Development",
                "SEO setup",
                "CMS integration",
                "Analytics",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-[12px] text-ink-soft">
                  <svg className="size-3 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 3 — Conversion Impact (top right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "1.2s" }}
            className="absolute right-0 top-4 z-20 hidden w-[220px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-subtle"
          >
            <div className="text-eyebrow mb-2">Conversion Impact</div>
            <div className="mt-1 text-[28px] font-semibold leading-none text-ink">+248%</div>
            <div className="mt-1 text-[11px] text-ink-muted">Lead increase</div>
            <svg viewBox="0 0 180 40" className="mt-3 h-8 w-full">
              <path
                d="M0,35 C25,33 50,28 75,24 C100,20 125,14 180,4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand"
              />
              <path
                d="M0,35 C25,33 50,28 75,24 C100,20 125,14 180,4 L180,40 L0,40 Z"
                className="fill-brand/12"
              />
            </svg>
          </motion.div>

          {/* Card 4 — Client Testimonial (bottom right) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "2.8s" }}
            className="absolute right-6 top-[210px] z-20 hidden w-[260px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-subtle"
          >
            <div className="mb-2 flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                  <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="text-[12px] leading-snug text-ink-soft">
              "The entire website was delivered in 9 days and looked better than agencies we spoke to that quoted 3 months."
            </p>
            <div className="mt-2 text-[11px] text-ink-muted">— Founder</div>
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
