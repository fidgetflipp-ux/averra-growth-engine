import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { MagneticButton } from "./primitives";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 sm:pt-48 pb-24 sm:pb-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-0 h-[900px] w-[1400px] -translate-x-1/2 opacity-80"
          style={{ background: "var(--gradient-radial)" }}
        />
        <Grid />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full hairline glass px-3.5 py-1.5 text-xs text-muted-foreground"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--brand)" }} />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
          </span>
          Now booking Q1 2027
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="text-display text-center brand-gradient-text mx-auto max-w-5xl"
          style={{ fontSize: "clamp(2.75rem, 8vw, 7.5rem)" }}
        >
          Web experiences <span className="text-serif-italic" style={{ color: "var(--brand)" }}>engineered</span> for growth.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-center text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          We design and develop high-performing websites that help ambitious businesses
          attract clients, build trust, and scale.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <MagneticButton href="#contact" variant="primary">
            Start your project <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <Calendar className="h-4 w-4" /> Book a consultation
          </MagneticButton>
        </motion.div>

        {/* Centerpiece visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-24 max-w-5xl"
        >
          <Showcase />
        </motion.div>
      </div>
    </section>
  );
}

function Grid() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="g" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M 56 0 L 0 0 0 56" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="m"><rect width="100%" height="100%" fill="url(#fade)" /></mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" mask="url(#m)" />
    </svg>
  );
}

function Showcase() {
  return (
    <div className="relative">
      {/* Glow */}
      <div
        className="absolute -inset-20 -z-10 rounded-full blur-3xl opacity-60 animate-pulse-glow"
        style={{ background: "var(--gradient-brand)" }}
      />
      {/* Browser frame mockup */}
      <div className="relative rounded-3xl hairline overflow-hidden bg-surface shadow-soft">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 bg-surface-elevated/60">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="ml-4 text-xs text-muted-foreground font-mono">averra.studio/showcase</span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--brand) 35%, transparent), transparent 55%), radial-gradient(ellipse at 80% 80%, color-mix(in oklab, var(--brand-glow) 30%, transparent), transparent 55%), var(--surface)",
            }}
          />
          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-8 top-10 sm:left-16 sm:top-14 w-44 sm:w-56 rounded-2xl glass p-4 shadow-soft"
          >
            <div className="text-xs text-muted-foreground">Conversion rate</div>
            <div className="mt-2 text-2xl sm:text-3xl text-display">4.49%</div>
            <div className="mt-1 text-xs" style={{ color: "var(--brand)" }}>↑ 212% vs. prior</div>
            <div className="mt-3 flex items-end gap-1 h-8">
              {[20, 35, 28, 50, 42, 60, 70].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: "var(--brand)" }} />
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute right-6 bottom-8 sm:right-14 sm:bottom-14 w-48 sm:w-60 rounded-2xl glass p-4 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">LCP</div>
              <div className="text-[10px] rounded-full px-2 py-0.5" style={{ background: "color-mix(in oklab, var(--brand) 25%, transparent)", color: "var(--brand)" }}>
                Excellent
              </div>
            </div>
            <div className="mt-2 text-2xl sm:text-3xl text-display">0.6s</div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "92%" }}
                transition={{ duration: 1.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: "var(--gradient-brand)" }}
              />
            </div>
          </motion.div>

          {/* Central orb */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="relative h-48 w-48 sm:h-64 sm:w-64"
            >
              <div className="absolute inset-0 rounded-full blur-2xl opacity-70" style={{ background: "var(--gradient-brand)" }} />
              <div className="absolute inset-4 rounded-full border border-white/20" />
              <div className="absolute inset-10 rounded-full border border-white/10" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
