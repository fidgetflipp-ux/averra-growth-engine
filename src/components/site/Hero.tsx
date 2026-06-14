import { motion } from "framer-motion";
import heroLaptop from "@/assets/hero-laptop.jpg";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20">
      {/* Ambient background fragments — extremely low opacity, subconscious depth */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* soft radial wash */}
        <div className="absolute left-1/2 top-[-10%] h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.06),transparent_60%)] blur-2xl" />

        {/* top-left: cropped browser window */}
        <div className="absolute -left-24 top-24 hidden w-[420px] rotate-[-6deg] opacity-[0.07] blur-[1px] md:block">
          <div className="overflow-hidden rounded-2xl border border-foreground/20 bg-white shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-foreground/10 px-3 py-2">
              <span className="size-2 rounded-full bg-foreground/20" />
              <span className="size-2 rounded-full bg-foreground/20" />
              <span className="size-2 rounded-full bg-foreground/20" />
            </div>
            <div className="space-y-2.5 p-5">
              <div className="h-2 w-2/3 rounded bg-foreground/30" />
              <div className="h-2 w-1/2 rounded bg-foreground/15" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-14 rounded bg-foreground/10" />
                <div className="h-14 rounded bg-foreground/10" />
                <div className="h-14 rounded bg-foreground/10" />
              </div>
              <div className="h-2 w-3/4 rounded bg-foreground/15" />
              <div className="h-2 w-2/5 rounded bg-foreground/15" />
            </div>
          </div>
        </div>

        {/* top-right: cropped website screenshot fragment */}
        <div className="absolute -right-32 top-16 hidden w-[460px] rotate-[5deg] opacity-[0.06] blur-[1.5px] lg:block">
          <div className="overflow-hidden rounded-2xl border border-foreground/20 bg-white shadow-2xl">
            <div className="h-10 border-b border-foreground/10 bg-foreground/[0.03]" />
            <div className="p-6">
              <div className="h-3 w-1/3 rounded bg-foreground/25" />
              <div className="mt-2 h-2 w-1/2 rounded bg-foreground/15" />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="aspect-[4/3] rounded-lg bg-foreground/10" />
                <div className="aspect-[4/3] rounded-lg bg-foreground/10" />
              </div>
            </div>
          </div>
        </div>

        {/* bottom-left: minimal wireframe component */}
        <div className="absolute -left-16 bottom-20 hidden w-[300px] -rotate-3 opacity-[0.08] blur-[1px] md:block">
          <div className="rounded-2xl border border-foreground/20 bg-white p-5 shadow-xl">
            <div className="h-2 w-12 rounded bg-foreground/25" />
            <div className="mt-3 h-6 w-2/3 rounded bg-foreground/15" />
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full rounded bg-foreground/10" />
              <div className="h-2 w-5/6 rounded bg-foreground/10" />
              <div className="h-2 w-3/4 rounded bg-foreground/10" />
            </div>
            <div className="mt-4 h-8 w-24 rounded-full bg-foreground/20" />
          </div>
        </div>

        {/* bottom-right: analytics card */}
        <div className="absolute -right-20 bottom-10 hidden w-[340px] rotate-[4deg] opacity-[0.08] blur-[1px] md:block">
          <div className="rounded-2xl border border-foreground/20 bg-white p-5 shadow-xl">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="h-2 w-16 rounded bg-foreground/20" />
                <div className="mt-2 h-5 w-24 rounded bg-foreground/30" />
              </div>
              <div className="h-2 w-10 rounded bg-brand/40" />
            </div>
            <svg viewBox="0 0 200 70" className="mt-4 h-16 w-full">
              <path
                d="M0,55 C25,50 40,40 60,38 C85,35 100,48 125,30 C150,15 170,22 200,10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-brand"
              />
              <path
                d="M0,55 C25,50 40,40 60,38 C85,35 100,48 125,30 C150,15 170,22 200,10 L200,70 L0,70 Z"
                className="fill-brand/15"
              />
            </svg>
            <div className="mt-3 flex justify-between">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-1.5 w-4 rounded bg-foreground/10" />
              ))}
            </div>
          </div>
        </div>
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

        <h1 className="text-display mx-auto max-w-[18ch] text-center text-[clamp(2.75rem,7.5vw,6rem)]">
          <Reveal>
            <span className="block">Premium websites,</span>
          </Reveal>
          <Reveal delay={0.06}>
            <span className="block">
              delivered in <span className="text-serif-italic">days</span>{" "}— not months.
            </span>
          </Reveal>
        </h1>

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
