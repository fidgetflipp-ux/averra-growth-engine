import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import svcDesign from "@/assets/svc-design.jpg";
import svcDev from "@/assets/svc-dev.jpg";
import svcBrand from "@/assets/svc-brand.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const pillars = [
  {
    code: "01",
    title: "Senior craft, only.",
    caption: "Every pixel touched by principal-level designers and engineers — no juniors, no handoffs.",
    img: svcDesign,
  },
  {
    code: "02",
    title: "Shipped in 7–14 days.",
    caption: "A calm, choreographed sprint. Scope is fixed, cadence is daily, delivery is on the calendar.",
    img: svcDev,
  },
  {
    code: "03",
    title: "One flat rate. No surprises.",
    caption: "Transparent packages, milestone billing, and a written guarantee — priced like a product.",
    img: svcBrand,
  },
];

const stats = [
  { value: "$180M+", label: "Client revenue influenced" },
  { value: "3.4×", label: "Average conversion uplift" },
  { value: "120+", label: "Premium sites shipped worldwide" },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ambientY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative px-4 sm:px-6 pt-24 md:pt-32 pb-24 md:pb-32"
    >
      {/* Warm cream capsule with a whisper of sage */}
      <div
        className="relative mx-auto max-w-[1360px] overflow-hidden rounded-[28px] md:rounded-[42px]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #F4F1EA 0%, #EEEAE1 55%, #E8E3D6 100%)",
          border: "1px solid oklch(0.14 0.005 260 / 0.08)",
          boxShadow:
            "0 40px 120px -50px oklch(0.14 0.005 260 / 0.22), inset 0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        {/* Very subtle sage aura */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            y: ambientY,
            background:
              "radial-gradient(60% 40% at 50% 5%, oklch(0.64 0.14 148 / 0.10) 0%, transparent 65%), radial-gradient(50% 40% at 85% 88%, oklch(0.64 0.14 148 / 0.07) 0%, transparent 70%)",
          }}
        />

        {/* Grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative px-5 sm:px-8 md:px-14 pt-14 md:pt-20 pb-14 md:pb-20">
          <Header />

          {/* Feature cards row */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {pillars.map((p, i) => (
              <FeatureCard key={p.code} pillar={p} index={i} />
            ))}
          </div>

          {/* Numbers panel */}
          <NumbersPanel />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Header ---------------- */

function Header() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="inline-flex items-center gap-3"
      >
        <span className="h-px w-8 bg-ink/20" />
        <span className="text-eyebrow">The Operating System</span>
        <span className="h-px w-8 bg-ink/20" />
      </motion.div>

      <h2 className="text-display mt-6 text-ink text-[clamp(2.5rem,6vw,5.25rem)]">
        {["Everything", "your", "company", "needs", "to"].map((w, i) => (
          <WordReveal key={i} delay={i * 0.06}>{w}</WordReveal>
        ))}
        <WordReveal delay={0.36} className="text-serif-italic text-ink-soft">
          dominate.
        </WordReveal>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
        className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.65] text-ink-soft"
      >
        A senior studio disguised as a subscription. Design, engineering, and growth —
        wired into one calm delivery system.
      </motion.p>
    </div>
  );
}

function WordReveal({
  children,
  delay,
  className = "",
}: {
  children: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.28em] align-baseline">
      <motion.span
        initial={{ y: "70%", opacity: 0, filter: "blur(12px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.0, delay, ease: EASE }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ---------------- Feature Cards ---------------- */

function FeatureCard({ pillar, index }: { pillar: (typeof pillars)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(useTransform(my, [-1, 1], [5, -5]), { stiffness: 120, damping: 14 });
  const rY = useSpring(useTransform(mx, [-1, 1], [-5, 5]), { stiffness: 120, damping: 14 });

  const handleMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
      style={{ perspective: 1200 }}
      className="group relative"
    >
      <motion.article
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[22px] md:rounded-[28px]"
      >
        {/* Image */}
        <img
          src={pillar.img}
          alt={pillar.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Warm ink gradient — no green tint */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(20,18,14,0.10) 0%, rgba(20,18,14,0.25) 45%, rgba(14,12,10,0.88) 100%)",
          }}
        />

        {/* Cursor spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(240px 240px at 50% 30%, rgba(255,244,220,0.14), transparent 70%)",
          }}
        />

        {/* Sheen sweep on hover */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-8 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-[1400ms] ease-out" />
        </div>

        {/* Top meta */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between px-5 md:px-6 pt-5 md:pt-6">
          <span className="rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/85">
            {pillar.code}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
            Pillar
          </span>
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 px-5 md:px-7 pb-6 md:pb-7">
          <h3
            className="text-display text-white text-[clamp(1.5rem,2.2vw,2rem)]"
            style={{ letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            {pillar.title}
          </h3>
          <p className="mt-3 max-w-[36ch] text-[13.5px] leading-[1.6] text-white/72">
            {pillar.caption}
          </p>
        </div>

        {/* Edge */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] md:rounded-[28px]"
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.05)",
          }}
        />
      </motion.article>
    </motion.div>
  );
}

/* ---------------- Numbers Panel ---------------- */

function NumbersPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, ease: EASE }}
      className="relative mt-16 md:mt-24 overflow-hidden rounded-[22px] md:rounded-[32px] p-6 sm:p-8 md:p-12"
      style={{
        background:
          "linear-gradient(180deg, #14140F 0%, #0E0E0B 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow:
          "0 40px 100px -40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Sage corona — restrained */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.64 0.14 148 / 0.28) 0%, oklch(0.64 0.14 148 / 0) 65%)",
          filter: "blur(20px)",
        }}
      />
      {/* Dot pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(90deg, transparent 0%, black 25%, black 100%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] gap-10 md:gap-14 items-center">
        {/* Left copy */}
        <div>
          <h3 className="text-display text-white text-[clamp(2.1rem,3.8vw,3.5rem)]">
            <WordReveal delay={0}>Numbers</WordReveal>
            <WordReveal delay={0.08}>we&apos;re</WordReveal>
            <br className="hidden sm:block" />
            <WordReveal delay={0.16} className="text-serif-italic text-white/85">genuinely</WordReveal>
            <WordReveal delay={0.24}>proud of.</WordReveal>
          </h3>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 0.72, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="mt-5 max-w-sm text-[14px] leading-[1.65] text-white/72"
          >
            Maximum conversion. Maximum revenue. Numbers we happen to think matter more than adjectives.
          </motion.p>
        </div>

        {/* Right stats */}
        <div className="flex flex-col gap-4">
          {stats.map((s, i) => (
            <StatBar key={s.label} stat={s} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatBar({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[number];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl md:rounded-[20px] px-5 sm:px-7 py-5 sm:py-6"
      style={{
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Soft sage bloom on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-y-4 left-1/3 right-0"
        style={{
          background:
            "radial-gradient(60% 90% at 55% 50%, oklch(0.64 0.14 148 / 0.22) 0%, transparent 70%)",
          filter: "blur(6px)",
        }}
      />

      <div className="relative grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-3">
          <span
            className="text-display text-white text-[clamp(2rem,3.2vw,2.9rem)]"
            style={{ lineHeight: 1 }}
          >
            {stat.value}
          </span>
          <ArrowBadge delay={0.6 + index * 0.15} inView={inView} />
        </div>
        <span className="text-white/85 text-[15px] sm:text-[17px] tracking-[-0.005em]">
          {stat.label}
        </span>
      </div>
    </motion.div>
  );
}

function ArrowBadge({ delay, inView }: { delay: number; inView: boolean }) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={inView ? { scale: 1, rotate: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="relative -mt-4 inline-flex h-5 w-5 items-center justify-center rounded-full"
      style={{
        background: "oklch(0.64 0.14 148)",
        boxShadow:
          "0 0 0 3px oklch(0.64 0.14 148 / 0.18), 0 6px 20px -4px oklch(0.64 0.14 148 / 0.55)",
      }}
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none">
        <path
          d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
          stroke="#0E1A10"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}
