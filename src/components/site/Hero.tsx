import { motion } from "framer-motion";
import heroLaptop from "@/assets/hero-laptop.jpg";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Layered background — mesh gradient + grid + grain for premium depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* sage mesh gradient — multiple soft blooms */}
        <div className="absolute left-1/2 top-[-15%] h-[820px] w-[1280px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.16),transparent_62%)] blur-3xl" />
        <div className="absolute -left-40 top-40 h-[520px] w-[620px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.10),transparent_65%)] blur-3xl" />
        <div className="absolute -right-40 top-10 h-[560px] w-[640px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.09),transparent_65%)] blur-3xl" />
        <div className="absolute left-1/3 bottom-0 h-[420px] w-[720px] rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.07),transparent_70%)] blur-3xl" />

        {/* subtle grid — fades from center */}
        <div
          className="absolute inset-0 opacity-[0.35]"
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

        {/* grain texture */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-multiply" xmlns="http://www.w3.org/2000/svg">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0" />
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
          {/* Floating proof cards flanking the headline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-10 z-20 hidden w-[210px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-slow"
          >
            <div className="flex items-center gap-2 text-eyebrow">
              <span className="size-1.5 rounded-full bg-brand" /> Live preview
            </div>
            <div className="mt-3 overflow-hidden rounded-lg border border-foreground/10">
              <div className="flex items-center gap-1 border-b border-foreground/10 bg-foreground/[0.02] px-2 py-1.5">
                <span className="size-1.5 rounded-full bg-foreground/20" />
                <span className="size-1.5 rounded-full bg-foreground/20" />
                <span className="size-1.5 rounded-full bg-foreground/20" />
              </div>
              <div className="space-y-1.5 p-2.5">
                <div className="h-1.5 w-2/3 rounded bg-foreground/25" />
                <div className="h-1.5 w-1/2 rounded bg-foreground/15" />
                <div className="mt-2 grid grid-cols-3 gap-1">
                  <div className="h-6 rounded bg-foreground/10" />
                  <div className="h-6 rounded bg-foreground/10" />
                  <div className="h-6 rounded bg-brand/30" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "1.5s" }}
            className="absolute right-0 top-4 z-20 hidden w-[220px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-slow"
          >
            <div className="flex items-center justify-between">
              <div className="text-eyebrow">Conversion</div>
              <span className="rounded-full bg-brand/12 px-1.5 py-0.5 text-[10px] font-medium text-brand-ink">+248%</span>
            </div>
            <div className="mt-2 text-[22px] font-semibold leading-none text-ink">3.4× lift</div>
            <svg viewBox="0 0 200 50" className="mt-3 h-10 w-full">
              <path d="M0,40 C30,38 55,32 85,28 C115,24 140,18 200,4" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-brand" />
              <path d="M0,40 C30,38 55,32 85,28 C115,24 140,18 200,4 L200,50 L0,50 Z" className="fill-brand/15" />
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "2.5s" }}
            className="absolute right-6 top-[210px] z-20 hidden w-[240px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-slow"
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                  <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-[12.5px] leading-snug text-ink-soft">
              "Shipped in 9 days. Booked 3 enterprise demos the week we launched."
            </p>
            <div className="mt-2 text-[11px] text-ink-muted">— Maya R., Founder</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ animationDelay: "3.5s" }}
            className="absolute left-4 top-[230px] z-20 hidden w-[200px] rounded-2xl border border-foreground/8 bg-white/95 p-4 shadow-card backdrop-blur xl:block animate-float-slow"
          >
            <div className="text-eyebrow">Avg. ship time</div>
            <div className="mt-1.5 flex items-baseline gap-1.5">
              <span className="text-[26px] font-semibold leading-none text-ink">11</span>
              <span className="text-sm text-ink-muted">days</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/8">
              <div className="h-full w-[68%] rounded-full bg-brand" />
            </div>
            <div className="mt-1.5 flex justify-between text-[10px] text-ink-muted">
              <span>0d</span><span>14d target</span>
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

      {/* Hero device — real product photography */}
      <Reveal delay={0.4}>
        <div className="mx-auto mt-24 max-w-6xl px-6">
          <div className="relative">
            <motion.img
              src={heroLaptop}
              alt="Averra premium website preview displayed on a MacBook Pro"
              width={1600}
              height={1100}
              className="relative z-10 mx-auto w-full"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* floating metric chips */}
            <motion.div
              className="absolute -left-2 top-10 z-20 hidden rounded-2xl border border-foreground/8 bg-white p-4 shadow-card md:block animate-float-slow"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
            >
              <div className="text-eyebrow">Conversion</div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-ink">+3.4×</span>
                <span className="text-xs text-brand-ink">vs. previous site</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute -right-2 top-28 z-20 hidden rounded-2xl border border-foreground/8 bg-white p-4 shadow-card md:block animate-float-slow"
              style={{ animationDelay: "2s" }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              <div className="text-eyebrow">Delivery</div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-ink">11d</span>
                <span className="text-xs text-ink-muted">average ship time</span>
              </div>
            </motion.div>
            <motion.div
              className="absolute bottom-16 left-1/2 z-20 hidden -translate-x-1/2 rounded-2xl border border-foreground/8 bg-white px-5 py-3 shadow-card md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
            >
              <div className="flex items-center gap-3 text-xs text-ink-soft">
                <span className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-ink">
                      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </span>
                <span className="font-medium text-ink">4.9</span>
                <span className="h-3 w-px bg-foreground/15" />
                <span>120+ projects shipped</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
