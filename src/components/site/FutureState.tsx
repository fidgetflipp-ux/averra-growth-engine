import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  type MotionValue,
} from "framer-motion";
import { Reveal } from "./primitives";
import futureStateImage from "@/assets/future-state.png.asset.json";

/**
 * FutureState — a single editorial moment.
 * Eyebrow → headline → body → monumental architectural image →
 * the closing kinetic crescendo: "Perception Compounds".
 */
export function FutureState() {
  return (
    <section
      aria-label="Future State"
      className="relative bg-surface hairline-t hairline-b"
    >
      <div className="mx-auto max-w-[1480px] px-6 pt-40 pb-0 md:pt-56">
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="text-eyebrow">Future State</span>
            <span className="h-px w-10 bg-foreground/20" />
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-10 max-w-[20ch] text-center text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.025em]">
            Become the company competitors benchmark themselves{" "}
            <span className="text-serif-italic">against.</span>
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 max-w-[58ch] text-center text-[17px] leading-[1.7] text-ink-soft">
            <p>
              Most companies grow faster than perception. The companies that
              dominate categories understand something earlier: how they are
              perceived determines who trusts them, hires them, invests in
              them, and competes with them.
            </p>
            <p className="mt-6 text-ink">
              A world-class digital presence changes that.
            </p>
          </div>
        </Reveal>

        {/* Image */}
        <div className="mt-24 flex justify-center">
          <FutureStateImage />
        </div>
      </div>

      {/* Closing crescendo */}
      <PerceptionCompounds />
    </section>
  );
}

function FutureStateImage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 80, damping: 20, mass: 0.6 });
  const tx = useTransform(sx, [-1, 1], [-5, 5]);
  const ty = useTransform(sy, [-1, 1], [-5, 5]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative w-full max-w-[1400px] overflow-hidden rounded-[28px] border border-foreground/8 bg-foreground/3"
      style={{
        boxShadow:
          "0 40px 120px -40px oklch(0.14 0.005 260 / 0.22), 0 8px 30px -16px oklch(0.14 0.005 260 / 0.12)",
        clipPath: inView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
        transition: "clip-path 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <motion.img
        src={futureStateImage.url}
        alt="An architectural interior — the future-state aesthetic of category-defining brands."
        loading="lazy"
        style={{ x: tx, y: ty }}
        className="block aspect-[16/9] h-auto w-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/15"
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Perception Compounds — kinetic editorial closing
   ───────────────────────────────────────────────────────────── */

type Law = {
  ordinal: string;
  chip: string;
  lead: string;
  italic: string;
};

const LAWS: Law[] = [
  { ordinal: "01", chip: "↑", lead: "Trust", italic: "accelerates." },
  { ordinal: "02", chip: "+12%", lead: "Pricing power", italic: "increases." },
  { ordinal: "03", chip: "↗", lead: "Talent follows", italic: "leaders." },
  { ordinal: "04", chip: "∞", lead: "Opportunities become", italic: "inevitable." },
];

function PerceptionCompounds() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.7,
  });

  // The compounding rail fills as the visitor moves through the laws.
  const railScale = useTransform(progress, [0, 1], [0, 1]);
  // Background sage bloom intensifies in lockstep.
  const bloomOpacity = useTransform(progress, [0, 1], [0, 0.18]);

  return (
    <div ref={ref} className="relative mt-40 md:mt-56">
      {/* Ambient sage bloom that warms as perception compounds */}
      <motion.div
        aria-hidden
        style={{ opacity: bloomOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 50% at 50% 80%, oklch(0.64 0.14 148 / 1), transparent 70%)",
          }}
        />
      </motion.div>

      {/* Top eyebrow bookend */}
      <div className="relative mx-auto flex max-w-[1480px] items-center gap-6 px-6">
        <span className="h-px flex-1 bg-foreground/15" />
        <span className="text-eyebrow">Perception Compounds</span>
        <span className="h-px flex-1 bg-foreground/15" />
      </div>

      {/* Stack */}
      <div className="relative mx-auto mt-20 max-w-[1180px] px-6 md:px-12">
        {/* Compounding rail */}
        <motion.div
          aria-hidden
          style={{ scaleY: railScale, transformOrigin: "top" }}
          className="pointer-events-none absolute left-6 top-0 hidden h-full w-px md:block"
        >
          <div className="h-full w-px bg-gradient-to-b from-foreground/0 via-[oklch(0.64_0.14_148/0.55)] to-[oklch(0.64_0.14_148/0.85)]" />
        </motion.div>

        <ol className="relative space-y-0">
          {LAWS.map((law, i) => (
            <LawRow
              key={law.ordinal}
              law={law}
              index={i}
              total={LAWS.length}
              progress={progress}
              isLast={i === LAWS.length - 1}
            />
          ))}
        </ol>
      </div>

      {/* Bottom bookend watermark */}
      <div className="relative mx-auto mt-24 flex max-w-[1480px] items-center gap-6 px-6 pb-28">
        <span className="h-px flex-1 bg-foreground/12" />
        <span className="text-eyebrow opacity-60">Perception Compounds</span>
        <span className="h-px flex-1 bg-foreground/12" />
      </div>
    </div>
  );
}

function LawRow({
  law,
  index,
  total,
  progress,
  isLast,
}: {
  law: Law;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -15% 0px" });

  // Per-row hairline draws in step with overall scroll progress.
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const lineScale = useTransform(progress, [segStart, segEnd], [0, 1]);

  return (
    <li
      ref={ref}
      className="group relative grid grid-cols-[auto_1fr] items-baseline gap-x-8 py-10 md:gap-x-14 md:py-14"
    >
      {/* Ordinal column */}
      <div className="flex w-14 flex-col items-start gap-2 pt-3 md:w-20">
        <span
          className="font-mono text-[11px] tabular-nums tracking-[0.18em] text-ink-muted"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 600ms ease, transform 700ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {law.ordinal}
        </span>
        <span
          className="font-mono text-[11px] text-ink-muted/70"
          style={{
            opacity: inView ? 0.7 : 0,
            transition: "opacity 800ms ease 200ms",
          }}
        >
          {law.chip}
        </span>
      </div>

      {/* Type column */}
      <div className="relative min-w-0">
        <h3
          className="text-display flex flex-wrap items-baseline gap-x-[0.35em] gap-y-1 text-ink"
          style={{
            fontSize: "clamp(2.75rem, 8.5vw, 8.5rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
          }}
        >
          <span
            className="inline-block overflow-hidden"
            aria-hidden={!inView}
          >
            <span
              className="inline-block"
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
                transition:
                  "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {law.lead}
            </span>
          </span>
          <span className="inline-block overflow-hidden">
            <span
              className={`text-serif-italic inline-block ${isLast ? "text-sage-sweep" : ""}`}
              style={{
                transform: inView ? "translateY(0)" : "translateY(110%)",
                transition:
                  "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1) 140ms",
              }}
            >
              {law.italic}
            </span>
          </span>
        </h3>
      </div>

      {/* Row hairline — drives forward and back with scroll */}
      <motion.div
        aria-hidden
        style={{ scaleX: lineScale, transformOrigin: "left" }}
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-foreground/15"
      />
    </li>
  );
}
