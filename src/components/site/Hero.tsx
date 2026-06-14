import { motion } from "framer-motion";
import { CtaPrimary, Reveal } from "./primitives";

const industries = [
  "Professional Services", "SaaS & Technology", "Healthcare & Wellness",
  "Finance & Investment", "Real Estate", "Hospitality", "Consulting",
  "Legal", "Premium Retail", "B2B Manufacturing",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-12">
      {/* soft brand glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, color-mix(in oklab, var(--brand) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="mx-auto mb-7 flex w-fit items-center gap-2 rounded-full border border-foreground/10 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            Strategy-led. Senior-only. Built for growth.
          </div>
        </Reveal>

        <h1 className="text-display mx-auto max-w-5xl text-center text-[clamp(2.75rem,8vw,6.5rem)]">
          <Reveal>
            <span className="headline-fade block">Websites that compound</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="headline-fade block">
              into <span className="text-serif-italic font-normal text-ink">measurable</span> growth.
            </span>
          </Reveal>
        </h1>

        <Reveal delay={0.18}>
          <p className="mx-auto mt-7 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
            Averra is a growth-focused digital partner for ambitious businesses.
            We combine strategy, design, and engineering to build websites that
            earn trust, win customers, and position you as the leader in your
            market.
          </p>
        </Reveal>

        <Reveal delay={0.26}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaPrimary>Get your free audit</CtaPrimary>
            <a href="#work" className="text-sm font-medium text-ink-soft hover:text-ink">
              See how we work →
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.34}>
          <div className="mt-8 flex items-center justify-center gap-x-8 gap-y-2 text-center text-xs text-ink-soft">
            <span>No subcontracted work</span>
            <span className="hidden h-3 w-px bg-foreground/15 sm:block" />
            <span className="hidden sm:inline">One accountable team — strategy to launch</span>
            <span className="hidden h-3 w-px bg-foreground/15 sm:block" />
            <span className="hidden sm:inline">Built to scale with you</span>
          </div>
        </Reveal>
      </div>

      {/* Browser mockup */}
      <Reveal delay={0.4}>
        <div className="mx-auto mt-20 max-w-6xl px-6">
          <div className="relative rounded-2xl bg-ink p-2.5 shadow-dark">
            <div className="flex items-center gap-1.5 px-3 py-2">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <div className="ml-3 flex h-6 flex-1 items-center rounded-md bg-white/8 px-3 text-[11px] font-mono text-white/50">
                yourcompany.com
              </div>
            </div>
            <div className="relative h-[420px] overflow-hidden rounded-xl bg-surface">
              <div className="absolute inset-0 bg-dotgrid-light" />
              <div className="absolute inset-0 grid grid-cols-1 gap-6 p-6 md:grid-cols-12 md:p-10">
                <div className="hidden md:block md:col-span-7 space-y-4">
                  <div className="h-3 w-24 rounded bg-foreground/10" />
                  <div className="h-12 w-5/6 rounded bg-foreground/15" />
                  <div className="h-12 w-2/3 rounded bg-foreground/10" />
                  <div className="mt-4 h-3 w-3/4 rounded bg-foreground/8" />
                  <div className="h-3 w-2/3 rounded bg-foreground/8" />
                  <div className="mt-5 flex gap-3">
                    <div className="h-10 w-36 rounded-full bg-ink" />
                    <div className="h-10 w-28 rounded-full border border-foreground/10" />
                  </div>
                </div>
                <div className="md:col-span-5">
                  <div className="relative h-full rounded-xl bg-white shadow-card">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="h-2.5 w-20 rounded bg-foreground/10" />
                        <div className="shrink-0 rounded-md bg-brand-soft px-2 py-1 text-[10px] font-semibold text-ink">+42% MoM</div>
                      </div>
                      <div className="mt-3 text-3xl font-semibold text-ink">$1.2M</div>
                      <svg viewBox="0 0 200 80" className="mt-4 w-full">
                        <motion.path
                          d="M0 65 Q 30 60 50 50 T 100 35 T 150 22 T 200 10"
                          stroke="oklch(0.78 0.21 146)"
                          strokeWidth="2.5"
                          fill="none"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.6, ease: "easeInOut", delay: 0.6 }}
                        />
                      </svg>
                      <div className="mt-3 flex justify-between text-[10px] font-mono text-ink-soft">
                        <span>JAN</span><span>FEB</span><span>MAR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Industries row */}
      <Reveal delay={0.5}>
        <div className="mx-auto mt-20 max-w-7xl px-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
            Built for ambitious businesses across
          </p>
          <div className="relative mt-7 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
            <div className="flex w-[200%] animate-marquee gap-14">
              {[...industries, ...industries].map((name, i) => (
                <span key={i} className="shrink-0 text-2xl font-semibold tracking-tight text-ink/35 transition-colors hover:text-ink/70">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
