import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Eyebrow, Reveal } from "./primitives";

// ————————————————————————————————————————————————————————————————
// Inside the Averra workspace — one website, five transformations.
// ————————————————————————————————————————————————————————————————

const STAGES = [
  { id: 0, label: "Strategy",     phase: "Strategy" },
  { id: 1, label: "Design",       phase: "Design" },
  { id: 2, label: "Development",  phase: "Development" },
  { id: 3, label: "Optimization", phase: "Optimization" },
  { id: 4, label: "Launch",       phase: "Live" },
] as const;

type NoteKind = "check" | "spark" | "chart" | "rocket" | "dot";
type Note = { icon: NoteKind; title: string; time: string };

const NOTES_BY_STAGE: Record<number, Note[]> = {
  0: [
    { icon: "check", title: "Positioning approved", time: "Day 1" },
    { icon: "dot",   title: "Sitemap finalized",    time: "Day 2" },
  ],
  1: [
    { icon: "check", title: "Homepage approved",       time: "2 min ago" },
    { icon: "spark", title: "Client feedback received", time: "4 min ago" },
  ],
  2: [
    { icon: "dot",   title: "CMS connected",       time: "Day 6" },
    { icon: "chart", title: "Development 72%",     time: "Day 7" },
  ],
  3: [
    { icon: "check", title: "SEO configured",       time: "Day 8" },
    { icon: "chart", title: "Analytics connected",  time: "Day 8" },
    { icon: "spark", title: "Performance 98",       time: "Day 8" },
  ],
  4: [
    { icon: "rocket", title: "Launch scheduled",       time: "Today" },
    { icon: "check",  title: "Deployed successfully",  time: "Just now" },
    { icon: "dot",    title: "Live on custom domain",  time: "Now" },
  ],
};

function stageForProgress(p: number) {
  if (p < 0.18) return 0;
  if (p < 0.38) return 1;
  if (p < 0.6) return 2;
  if (p < 0.8) return 3;
  return 4;
}

// ————————————————————————————————————————————————————————————————
// Tiny icon set for notifications
// ————————————————————————————————————————————————————————————————

function NoteIcon({ kind }: { kind: NoteKind }) {
  if (kind === "check")
    return (
      <svg className="size-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg className="size-3 text-brand-ink" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6L12 2z" />
      </svg>
    );
  if (kind === "chart")
    return (
      <svg className="size-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M4 19V5M4 19h16M8 15l3-4 3 2 4-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "rocket")
    return (
      <svg className="size-3 text-brand-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M5 15c-1 3 1 5 4 4M14.5 4.5c3-1 5 1 4 4l-7 7-4-4 7-7zM9 14l-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return <span className="size-1.5 rounded-full bg-brand" />;
}

// ————————————————————————————————————————————————————————————————
// Contextual notifications — stage-scoped, OS update tone
// ————————————————————————————————————————————————————————————————

const NOTE_SLOTS = [
  "right-[2%] top-[18%]",
  "right-[4%] top-[44%]",
  "left-[2%] top-[60%]",
] as const;

function NotificationStack({ stage }: { stage: number }) {
  const notes = NOTES_BY_STAGE[stage] ?? [];
  return (
    <>
      {notes.slice(0, 3).map((note, i) => (
        <AnimatePresence key={`${stage}-${i}`} mode="wait">
          <motion.div
            initial={{ opacity: 0, x: i === 2 ? -6 : 6, y: 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: i === 2 ? -4 : 4 }}
            transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-none absolute ${NOTE_SLOTS[i]} z-40 hidden md:flex items-center gap-2 rounded-full border border-foreground/8 bg-white/85 px-2.5 py-1.5 shadow-card backdrop-blur-md`}
          >
            <span className="flex size-5 items-center justify-center rounded-full bg-brand/12">
              <NoteIcon kind={note.icon} />
            </span>
            <span className="text-[11px] font-medium text-ink leading-none">{note.title}</span>
            <span className="text-[10px] font-mono text-ink-muted leading-none">{note.time}</span>
          </motion.div>
        </AnimatePresence>
      ))}
    </>
  );
}

// ————————————————————————————————————————————————————————————————
// The evolving website canvas — one site, five fidelity layers
// ————————————————————————————————————————————————————————————————

function StageLayer({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

function WireframeLayer() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      {/* Nav */}
      <div className="flex items-center justify-between rounded-md border border-dashed border-foreground/18 px-3 py-2">
        <span className="h-1.5 w-14 rounded-full bg-foreground/14" />
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-1 w-6 rounded-full bg-foreground/12" />
          ))}
        </div>
        <span className="h-3 w-14 rounded-sm bg-foreground/14" />
      </div>
      {/* Hero */}
      <div className="relative flex flex-1 flex-col items-start justify-center gap-2 rounded-md border border-dashed border-foreground/18 px-5">
        <span className="absolute left-2 top-2 text-[8px] font-mono uppercase tracking-wider text-ink-muted">section · hero</span>
        <span className="h-2.5 w-3/5 rounded-full bg-foreground/16" />
        <span className="h-2.5 w-2/5 rounded-full bg-foreground/16" />
        <span className="mt-1 h-1.5 w-1/2 rounded-full bg-foreground/10" />
        <span className="mt-3 h-6 w-24 rounded-md border border-dashed border-foreground/22" />
        <span className="absolute bottom-2 right-2 text-[8px] font-mono uppercase tracking-wider text-ink-muted">cta</span>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-md border border-dashed border-foreground/18 p-2">
            <span className="block h-1.5 w-2/3 rounded-full bg-foreground/14" />
            <span className="mt-1 block h-1 w-1/2 rounded-full bg-foreground/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignLayer() {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 ring-1 ring-foreground/6">
        <span className="text-[10px] font-semibold text-ink">ScarTec</span>
        <div className="flex gap-3 text-[9px] text-ink-soft">
          <span>Science</span><span>Pipeline</span><span>About</span><span>Contact</span>
        </div>
        <span className="rounded-full bg-brand/15 px-2 py-0.5 text-[9px] font-medium text-brand-ink">Trial</span>
      </div>
      <div className="relative flex flex-1 flex-col items-start justify-center gap-1.5 overflow-hidden rounded-md bg-gradient-to-br from-[oklch(0.96_0.03_150)] via-[oklch(0.98_0.01_150)] to-[oklch(0.94_0.04_150)] px-5 ring-1 ring-foreground/6">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(127,185,138,0.18),transparent_60%)]" />
        <span className="relative text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">therapeutics</span>
        <h3 className="relative text-[18px] font-semibold leading-tight text-ink">
          Therapeutics, <span className="italic font-serif text-brand-ink">reimagined</span>.
        </h3>
        <p className="relative max-w-[80%] text-[10px] leading-snug text-ink-soft">
          Precision scar therapy backed by a decade of clinical research.
        </p>
        <span className="relative mt-2 inline-flex h-6 items-center rounded-md bg-ink px-3 text-[10px] font-medium text-white">Explore pipeline</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { t: "Discovery", c: "from-[oklch(0.95_0.03_150)] to-[oklch(0.9_0.05_150)]" },
          { t: "Trials",    c: "from-[oklch(0.95_0.02_180)] to-[oklch(0.9_0.04_180)]" },
          { t: "Care",      c: "from-[oklch(0.95_0.03_120)] to-[oklch(0.9_0.05_120)]" },
        ].map((card) => (
          <div key={card.t} className={`aspect-[4/3] rounded-md bg-gradient-to-br ${card.c} p-2 ring-1 ring-foreground/6`}>
            <span className="text-[8px] font-mono uppercase tracking-wider text-ink-muted">{card.t}</span>
            <div className="mt-1 h-1.5 w-3/4 rounded-full bg-white/60" />
            <div className="mt-1 h-1 w-1/2 rounded-full bg-white/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DevelopmentLayer() {
  return (
    <div className="relative flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between rounded-md bg-white px-3 py-2 ring-1 ring-foreground/8 shadow-sm">
        <span className="text-[10px] font-semibold text-ink">ScarTec</span>
        <div className="flex gap-3 text-[9px] text-ink">
          <span>Science</span><span>Pipeline</span><span>About</span><span>Contact</span>
        </div>
        <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-medium text-white">Start trial</span>
      </div>
      <div className="relative flex flex-1 flex-col items-start justify-center gap-1.5 overflow-hidden rounded-md bg-gradient-to-br from-[oklch(0.96_0.03_150)] via-[oklch(0.98_0.01_150)] to-[oklch(0.94_0.04_150)] px-5 ring-1 ring-foreground/8 shadow-sm">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(127,185,138,0.22),transparent_60%)]" />
        <span className="relative text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">therapeutics</span>
        <h3 className="relative text-[18px] font-semibold leading-tight text-ink">
          Therapeutics, <span className="italic font-serif text-brand-ink">reimagined</span>.
        </h3>
        <p className="relative max-w-[80%] text-[10px] leading-snug text-ink-soft">
          Precision scar therapy backed by a decade of clinical research.
        </p>
        <div className="relative mt-2 flex items-center gap-2">
          <span className="inline-flex h-6 items-center rounded-md bg-ink px-3 text-[10px] font-medium text-white">Explore pipeline</span>
          <span className="text-[10px] text-ink-soft">→ Talk to research</span>
        </div>
        <span className="absolute right-2 top-2 rounded bg-white/70 px-1.5 py-0.5 font-mono text-[8px] text-ink-muted">components · 12</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { t: "Discovery", n: "12 programs", c: "from-[oklch(0.95_0.03_150)] to-[oklch(0.88_0.06_150)]" },
          { t: "Trials",    n: "Phase II",    c: "from-[oklch(0.95_0.02_180)] to-[oklch(0.88_0.05_180)]" },
          { t: "Care",      n: "47 clinics",  c: "from-[oklch(0.95_0.03_120)] to-[oklch(0.88_0.06_120)]" },
        ].map((card) => (
          <div key={card.t} className={`aspect-[4/3] rounded-md bg-gradient-to-br ${card.c} p-2 ring-1 ring-foreground/8 shadow-sm`}>
            <span className="text-[8px] font-mono uppercase tracking-wider text-ink-muted">{card.t}</span>
            <div className="mt-0.5 text-[11px] font-semibold text-ink">{card.n}</div>
            <div className="mt-1 h-1 w-2/3 rounded-full bg-white/50" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OptimizationLayer() {
  return (
    <div className="relative h-full">
      {/* Same as dev */}
      <DevelopmentLayer />
      {/* Performance overlay */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute left-5 right-5 top-3 z-10 flex items-center justify-between rounded-md border border-foreground/10 bg-white/95 px-3 py-1.5 shadow-card backdrop-blur"
      >
        {[
          { k: "LCP", v: "0.6s" },
          { k: "CLS", v: "0.01" },
          { k: "SEO", v: "100" },
          { k: "A11y", v: "100" },
        ].map((m) => (
          <div key={m.k} className="flex items-baseline gap-1">
            <span className="text-[8px] font-mono uppercase tracking-wider text-ink-muted">{m.k}</span>
            <span className="text-[11px] font-semibold text-brand-ink">{m.v}</span>
          </div>
        ))}
      </motion.div>
      {/* Scanline sweep */}
      <motion.div
        aria-hidden
        initial={{ y: "-10%", opacity: 0 }}
        animate={{ y: "110%", opacity: [0, 0.5, 0] }}
        transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-x-0 z-10 h-12 bg-gradient-to-b from-transparent via-brand/15 to-transparent"
      />
    </div>
  );
}

function LaunchLayer() {
  return (
    <div className="relative h-full">
      <DevelopmentLayer />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute bottom-3 right-5 z-10 flex items-center gap-2 rounded-full border border-brand/30 bg-white/95 px-3 py-1.5 shadow-card backdrop-blur"
      >
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        <span className="text-[10px] font-medium text-ink">scartec.com</span>
        <span className="text-[10px] font-mono text-ink-muted">99.99%</span>
      </motion.div>
    </div>
  );
}

function WebsiteCanvas({ stage }: { stage: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-[14px] bg-[oklch(0.985_0.003_150)]">
      <StageLayer active={stage === 0}><WireframeLayer /></StageLayer>
      <StageLayer active={stage === 1}><DesignLayer /></StageLayer>
      <StageLayer active={stage === 2}><DevelopmentLayer /></StageLayer>
      <StageLayer active={stage === 3}><OptimizationLayer /></StageLayer>
      <StageLayer active={stage === 4}><LaunchLayer /></StageLayer>
    </div>
  );
}

// ————————————————————————————————————————————————————————————————
// The Averra workspace frame — custom OS-style chrome, not a browser
// ————————————————————————————————————————————————————————————————

function AverraMark() {
  return (
    <span className="flex size-4 items-center justify-center rounded-[4px] bg-ink text-white">
      <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M2 10L6 2l4 8M3.5 7h5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function WorkspaceFrame({
  progress,
  stage,
}: {
  progress: MotionValue<number>;
  stage: number;
}) {
  const rotY = useTransform(progress, [0, 0.5, 1], [-18, 0, 18]);
  const rotX = useTransform(progress, [0, 0.5, 1], [2, 0, 2]);
  const liftZ = useTransform(progress, [0, 0.5, 1], [-10, 20, -10]);

  const glow = useTransform(progress, [0.78, 0.92], [0, 1]);
  const glowShadow = useTransform(
    glow,
    (g) =>
      `0 40px 90px -40px rgba(15, 23, 19, 0.28), 0 0 0 1px rgba(15,23,19,0.05), 0 0 ${
        60 * g
      }px rgba(127, 185, 138, ${0.22 * g})`,
  );

  const current = STAGES[stage];
  const launched = stage === 4;

  return (
    <motion.div
      style={{
        rotateX: rotX,
        rotateY: rotY,
        z: liftZ,
        scale: 0.86,
        boxShadow: glowShadow,
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
      }}
      className="relative mx-auto h-[460px] w-[min(560px,84vw)] overflow-hidden rounded-2xl border border-foreground/10 bg-white/70 backdrop-blur-xl will-change-transform"
    >
      {/* Status bar */}
      <div className="flex h-9 items-center justify-between border-b border-foreground/8 bg-white/60 px-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <AverraMark />
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted">averra</span>
          <span className="h-3 w-px bg-foreground/12" />
          <span className="text-[11px] font-medium text-ink">ScarTec Therapeutics</span>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            key={current.phase}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              launched ? "bg-brand/15 text-brand-ink" : "bg-foreground/6 text-ink-soft"
            }`}
          >
            <span className="relative flex size-1.5">
              {launched && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              )}
              <span className={`relative inline-flex size-1.5 rounded-full ${launched ? "bg-brand" : "bg-ink/40"}`} />
            </span>
            {current.phase}
          </motion.div>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative h-[calc(100%-2.25rem)]">
        <WebsiteCanvas stage={stage} />
      </div>
    </motion.div>
  );
}

// ————————————————————————————————————————————————————————————————
// Section
// ————————————————————————————————————————————————————————————————

export function Showcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = stageForProgress(p);
    setStage((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      ref={wrapRef}
      id="showcase"
      aria-label="Inside the Averra workspace"
      className="relative bg-background"
      style={{ height: "420vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Ambient backdrop */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[680px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.06),transparent_65%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.14 0.005 260 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 55% 50% at 50% 55%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 55%, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        </div>

        {/* Header */}
        <div className="absolute inset-x-0 top-16 z-30 mx-auto max-w-7xl px-6">
          <Reveal>
            <div className="flex flex-col items-center gap-4 text-center">
              <Eyebrow>Inside the Averra workspace</Eyebrow>
              <h2 className="text-display text-[clamp(2rem,4.2vw,3.25rem)] max-w-[20ch]">
                Watch your website <span className="text-serif-italic">come to life</span>.
              </h2>
              <p className="max-w-md text-[14px] leading-[1.55] text-ink-soft">
                Every milestone. Every update. Every approval. Visible from day one.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Frame + contextual notifications */}
        <div className="relative z-20 mt-56 w-full">
          <div className="relative mx-auto" style={{ perspective: 1400 }}>
            <NotificationStack stage={stage} />
            <WorkspaceFrame progress={scrollYProgress} stage={stage} />
          </div>
        </div>

        {/* Stage rail */}
        <div className="absolute inset-x-0 bottom-10 z-30 flex justify-center">
          <div className="flex items-center gap-3 rounded-full border border-foreground/8 bg-white/85 px-3 py-1.5 shadow-card backdrop-blur">
            {STAGES.map((s) => (
              <span key={s.id} className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em]">
                <motion.span
                  animate={{
                    backgroundColor: stage >= s.id ? "rgb(127,185,138)" : "rgba(15,15,15,0.18)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="size-1.5 rounded-full"
                />
                <span className={stage === s.id ? "text-ink" : "text-ink-muted"}>{s.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
