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
  { value: "7–14", label: "Days from kickoff to launch" },
  { value: "100%", label: "Senior-led design & engineering" },
  { value: "< 24h", label: "Response time, every business day" },
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
    <span className="inline-block overflow-hidden pb-[0.22em] pr-[0.28em] align-baseline">
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

/* ---------------- Numbers Panel — editorial plaster ---------------- */

function NumbersPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: EASE }}
      className="relative mt-20 md:mt-32 overflow-hidden rounded-[22px] md:rounded-[32px]"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #EDE8DC 0%, #E4DED0 60%, #DAD3C2 100%)",
        border: "1px solid oklch(0.14 0.005 260 / 0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.55), 0 30px 80px -40px oklch(0.14 0.005 260 / 0.2)",
      }}
    >
      {/* Plaster grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      {/* Soft sculptural bloom, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* Top meta row */}
      <div className="relative flex items-center justify-between px-6 sm:px-10 md:px-14 pt-6 md:pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
          — Studio Index
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
          {new Date().getFullYear()} / Averra
        </span>
      </div>

      {/* Editorial statement */}
      <div className="relative px-6 sm:px-10 md:px-14 pt-16 md:pt-28 pb-10 md:pb-14 max-w-4xl">
        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.0, delay: 0.2, ease: EASE }}
          className="text-serif-italic text-ink text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] tracking-[-0.01em]"
        >
          A quiet studio, measured in commitments — not client-brag metrics.
        </motion.h3>
      </div>

      {/* Divider */}
      <div className="relative mx-6 sm:mx-10 md:mx-14 h-px bg-ink/15" />

      {/* Stats row — three columns, editorial */}
      <div className="relative grid grid-cols-1 md:grid-cols-3">
        {stats.map((s, i) => (
          <StatCell key={s.label} stat={s} index={i} inView={inView} isLast={i === stats.length - 1} />
        ))}
      </div>

      {/* Bottom meta */}
      <div className="relative flex items-center justify-between px-6 sm:px-10 md:px-14 pb-6 md:pb-8 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
          Fig. 01 — Delivery Standards
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/45">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/30" />
            <span className="relative inline-flex size-1.5 rounded-full bg-ink/60" />
          </span>
          Currently accepting
        </span>
      </div>
    </motion.div>
  );
}

function StatCell({
  stat,
  index,
  inView,
  isLast,
}: {
  stat: (typeof stats)[number];
  index: number;
  inView: boolean;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.0, delay: 0.35 + index * 0.14, ease: EASE }}
      className={`relative px-6 sm:px-10 md:px-14 py-10 md:py-16 ${
        !isLast ? "md:border-r border-ink/10" : ""
      } ${index !== 0 ? "border-t md:border-t-0 border-ink/10" : ""}`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
        0{index + 1}
      </span>
      <div className="mt-6 md:mt-10 flex items-baseline gap-2">
        <span
          className="text-serif-italic text-ink text-[clamp(3rem,6.5vw,5.5rem)]"
          style={{ lineHeight: 0.95, letterSpacing: "-0.02em" }}
        >
          {stat.value}
        </span>
      </div>
      <p className="mt-6 max-w-[26ch] text-[13.5px] leading-[1.55] text-ink/70">
        {stat.label}
      </p>
    </motion.div>
  );
}

