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
// Scroll-driven workspace — 5 states, centered, premium.
// ————————————————————————————————————————————————————————————————

const STAGES = [
  { id: 0, label: "Strategy",      pill: "Strategy",      progress: 18,  activity: "Positioning finalized" },
  { id: 1, label: "Design",        pill: "Design",        progress: 42,  activity: "Homepage approved" },
  { id: 2, label: "Development",   pill: "Development",   progress: 72,  activity: "Components shipped" },
  { id: 3, label: "Optimization",  pill: "Optimization",  progress: 90,  activity: "Analytics connected" },
  { id: 4, label: "Launch",        pill: "Live",          progress: 100, activity: "Deployed to production" },
] as const;

const MILESTONES = [
  "Strategy workshop completed",
  "Design approved",
  "Development in progress",
  "SEO & analytics configured",
  "Ready for launch",
];

const ACTIVITY = [
  { stage: 0, text: "Strategy workshop completed", meta: "Day 1" },
  { stage: 1, text: "Homepage approved",           meta: "2 min ago" },
  { stage: 1, text: "Brand assets uploaded",       meta: "18 min ago" },
  { stage: 2, text: "Components shipped to staging", meta: "Day 6" },
  { stage: 2, text: "Lighthouse: 98 / 100",        meta: "Day 7" },
  { stage: 3, text: "SEO configured",              meta: "Day 8" },
  { stage: 3, text: "Analytics connected",         meta: "Day 8" },
  { stage: 4, text: "Deployed to production",     meta: "Day 9" },
];

function stageForProgress(p: number) {
  if (p < 0.18) return 0;
  if (p < 0.38) return 1;
  if (p < 0.6) return 2;
  if (p < 0.8) return 3;
  return 4;
}

// ————————————————————————————————————————————————————————————————
// Floating notification — small, lightweight, secondary
// ————————————————————————————————————————————————————————————————

type NoteProps = {
  progress: MotionValue<number>;
  window: [number, number, number, number];
  position: string;
  drift: { x: [number, number]; y: [number, number] };
  icon: "check" | "dot" | "spark" | "rocket" | "chart";
  title: string;
  time: string;
};

function FloatingNote({ progress, window, position, drift, icon, title, time }: NoteProps) {
  const opacity = useTransform(progress, window, [0, 1, 1, 0]);
  const y = useTransform(progress, [window[0], window[3]], drift.y);
  const x = useTransform(progress, [window[0], window[3]], drift.x);
  const scale = useTransform(progress, window, [0.96, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, x, scale }}
      className={`pointer-events-none absolute ${position} z-40 hidden lg:flex items-center gap-2.5 rounded-xl border border-foreground/8 bg-white/95 px-3 py-2 shadow-card backdrop-blur`}
    >
      <span className="flex size-6 items-center justify-center rounded-lg bg-brand/12 text-brand-ink">
        <NoteIcon kind={icon} />
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[12px] font-medium text-ink">{title}</span>
        <span className="text-[10px] text-ink-muted">{time}</span>
      </div>
    </motion.div>
  );
}

function NoteIcon({ kind }: { kind: NoteProps["icon"] }) {
  if (kind === "check")
    return (
      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "spark")
    return (
      <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6z" />
      </svg>
    );
  if (kind === "rocket")
    return (
      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 19l3-3m6-12s5 1 7 3-3 7-3 7l-4-4-7 5-2-2 5-7-4-4s5-5 8-5z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (kind === "chart")
    return (
      <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 17l5-5 4 4 8-8m0 0v5m0-5h-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  return <span className="size-1.5 rounded-full bg-brand" />;
}

// ————————————————————————————————————————————————————————————————
// The workspace itself
// ————————————————————————————————————————————————————————————————

function Workspace({
  progress,
  stage,
}: {
  progress: MotionValue<number>;
  stage: number;
}) {
  // Smooth progress bar driven by scroll — interpolates between stage anchors
  const progressWidth = useTransform(progress, [0, 0.18, 0.38, 0.6, 0.8, 1], [
    "8%", "22%", "48%", "78%", "95%", "100%",
  ]);

  // 3D rotation tied to scroll — visible but premium-restrained
  const rotY = useTransform(progress, [0, 0.5, 1], [-18, 0, 18]);
  const rotX = useTransform(progress, [0, 0.5, 1], [2, 0, 2]);
  const liftZ = useTransform(progress, [0, 0.5, 1], [-10, 20, -10]);

  // Subtle brighten in launch phase
  const glow = useTransform(progress, [0.78, 0.92], [0, 1]);
  const glowShadow = useTransform(
    glow,
    (g) =>
      `0 30px 80px -30px rgba(15, 23, 19, 0.22), 0 0 0 1px rgba(15,23,19,0.05), 0 0 ${
        40 * g
      }px rgba(127, 185, 138, ${0.18 * g})`,
  );

  const current = STAGES[stage];
  const launched = stage === 4;

  return (
    <motion.div
      style={{
        rotateX: rotX,
        rotateY: rotY,
        z: liftZ,
        boxShadow: glowShadow,
        transformPerspective: 1600,
        transformStyle: "preserve-3d",
      }}
      className="relative mx-auto w-[min(520px,82vw)] overflow-hidden rounded-2xl border border-foreground/10 bg-white will-change-transform"
    >
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-foreground/8 bg-[oklch(0.985_0.003_150)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="flex items-center gap-2 rounded-md bg-white/70 px-2.5 py-1 text-[10px] font-mono text-ink-muted">
          <span className="size-1.5 rounded-full bg-brand" />
          averra.app / scartec
        </div>
        <div className="w-[40px]" />
      </div>

      <div className="grid grid-cols-[148px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-foreground/8 bg-[oklch(0.988_0.003_150)] p-3 text-[11px]">
          <div className="px-2 pb-2 text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
            Project
          </div>
          {[
            { label: "Overview",   active: stage >= 0 && stage < 1 },
            { label: "Design",     active: stage === 1 },
            { label: "Build",      active: stage === 2 },
            { label: "Optimize",   active: stage === 3 },
            { label: "Launch",     active: stage === 4 },
          ].map((item) => (
            <motion.div
              key={item.label}
              animate={{
                backgroundColor: item.active ? "rgba(127,185,138,0.12)" : "rgba(0,0,0,0)",
                color: item.active ? "#1a201c" : "#5b6360",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mb-0.5 flex items-center gap-2 rounded-md px-2 py-1.5"
            >
              <span
                className={`size-1.5 rounded-full ${item.active ? "bg-brand" : "bg-foreground/20"}`}
              />
              {item.label}
            </motion.div>
          ))}
          <div className="mt-4 px-2 pb-2 text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
            Team
          </div>
          <div className="flex -space-x-1.5 px-2">
            {["#cfe6d5", "#e8d9c4", "#d6dde8", "#e0d4e8"].map((c, i) => (
              <span key={i} className="size-5 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="p-5">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
                Project
              </div>
              <div className="mt-0.5 text-[15px] font-semibold text-ink">ScarTec Therapeutics</div>
            </div>
            <motion.div
              key={current.pill}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                launched ? "bg-brand/15 text-brand-ink" : "bg-foreground/8 text-ink"
              }`}
            >
              <span className={`size-1.5 rounded-full ${launched ? "bg-brand" : "bg-ink/50"}`} />
              {current.pill}
            </motion.div>
          </div>

          {/* Stat row */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="Progress" value={`${current.progress}%`} accent />
            <Stat label="Launch" value="Jun 26" />
            <Stat label="Day" value={`${[1, 3, 7, 8, 9][stage]} / 9`} />
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/8">
              <motion.div
                className="h-full rounded-full bg-brand"
                style={{ width: progressWidth }}
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
                Milestones
              </div>
              <div className="text-[10px] text-ink-muted">{Math.min(stage + 1, 5)} / 5</div>
            </div>
            <ul className="space-y-1.5">
              {MILESTONES.map((m, i) => {
                const done = i < stage || (i === stage && stage === 4);
                const active = i === stage && stage !== 4;
                return (
                  <li key={m} className="flex items-center gap-2.5 text-[12px]">
                    <motion.span
                      animate={{
                        backgroundColor: done ? "rgb(127,185,138)" : "rgba(0,0,0,0)",
                        borderColor: done ? "rgb(127,185,138)" : active ? "rgb(127,185,138)" : "rgba(15,15,15,0.18)",
                      }}
                      transition={{ duration: 0.45 }}
                      className="flex size-3.5 items-center justify-center rounded-full border"
                    >
                      {done && (
                        <svg className="size-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                          <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {active && <span className="size-1 rounded-full bg-brand" />}
                    </motion.span>
                    <motion.span
                      animate={{
                        color: done ? "#1a201c" : active ? "#1a201c" : "#8a918d",
                        textDecoration: done && i < 2 ? "none" : "none",
                      }}
                      transition={{ duration: 0.4 }}
                      className="flex-1"
                    >
                      {m}
                    </motion.span>
                    {active && (
                      <span className="text-[9px] font-mono uppercase tracking-wider text-brand-ink">
                        In progress
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Preview / launch panel */}
          <div className="mt-5">
            <div className="mb-2 text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
              Latest preview
            </div>
            <div className="relative overflow-hidden rounded-lg border border-foreground/8 bg-[oklch(0.985_0.003_150)] p-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <PreviewForStage stage={stage} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Activity */}
          <div className="mt-5">
            <div className="mb-2 text-[9px] font-mono uppercase tracking-[0.18em] text-ink-muted">
              Activity
            </div>
            <ul className="space-y-1.5">
              <AnimatePresence initial={false}>
                {ACTIVITY.filter((a) => a.stage <= stage)
                  .slice(-4)
                  .map((a) => (
                    <motion.li
                      key={`${a.stage}-${a.text}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-center justify-between gap-3 text-[11px]"
                    >
                      <span className="flex items-center gap-2 text-ink-soft">
                        <span className="size-1 rounded-full bg-brand" />
                        {a.text}
                      </span>
                      <span className="text-[10px] text-ink-muted">{a.meta}</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Launch banner — appears in final stage */}
          <AnimatePresence>
            {launched && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 flex items-center gap-3 rounded-xl border border-brand/30 bg-brand/8 px-4 py-3"
              >
                <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-[12px] font-semibold text-ink">Ready for launch</span>
                  <span className="text-[10px] text-ink-muted">All systems green · countdown 00:00:00</span>
                </div>
                <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-brand-ink">Live</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-foreground/8 bg-[oklch(0.988_0.003_150)] px-3 py-2">
      <div className="text-[9px] font-mono uppercase tracking-[0.16em] text-ink-muted">{label}</div>
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`mt-0.5 text-[14px] font-semibold ${accent ? "text-brand-ink" : "text-ink"}`}
      >
        {value}
      </motion.div>
    </div>
  );
}

function PreviewForStage({ stage }: { stage: number }) {
  if (stage === 0) {
    return (
      <div className="grid grid-cols-3 gap-2 text-[10px]">
        {["Audience", "Goals", "Positioning"].map((t) => (
          <div key={t} className="rounded-md bg-white p-2 ring-1 ring-foreground/6">
            <div className="mb-1 text-[9px] font-mono uppercase tracking-wider text-ink-muted">{t}</div>
            <div className="h-1 w-3/4 rounded-full bg-foreground/12" />
            <div className="mt-1 h-1 w-1/2 rounded-full bg-foreground/8" />
          </div>
        ))}
      </div>
    );
  }
  if (stage === 1) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="aspect-[4/3] rounded-md bg-gradient-to-br from-[oklch(0.96_0.02_150)] to-[oklch(0.92_0.04_150)] ring-1 ring-foreground/6" />
        ))}
      </div>
    );
  }
  if (stage === 2) {
    return (
      <pre className="overflow-hidden rounded-md bg-[oklch(0.18_0.01_150)] p-3 text-[10px] leading-relaxed text-[oklch(0.92_0.02_150)] font-mono">
{`<Hero
  headline="Premium websites,"
  cta="Start your project"
  accent="brand"
/>
// ✓ 12 components shipped
// ✓ Lighthouse 98 / 100`}
      </pre>
    );
  }
  if (stage === 3) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[
          { k: "LCP", v: "0.6s" },
          { k: "CLS", v: "0.01" },
          { k: "SEO", v: "100" },
        ].map((m) => (
          <div key={m.k} className="rounded-md bg-white p-2 ring-1 ring-foreground/6">
            <div className="text-[9px] font-mono uppercase tracking-wider text-ink-muted">{m.k}</div>
            <div className="mt-0.5 text-[14px] font-semibold text-ink">{m.v}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between rounded-md bg-white p-3 ring-1 ring-foreground/6">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Production</div>
        <div className="mt-0.5 text-[12px] font-medium text-ink">scartec.com</div>
      </div>
      <div className="flex items-center gap-1.5 text-[10px] text-brand-ink">
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
        </span>
        Live · 99.99%
      </div>
    </div>
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

        {/* Workspace + floating notes */}
        <div className="relative z-20 mt-24 w-full">
          <div className="relative mx-auto" style={{ perspective: 1400 }}>
            {/* Notes */}
            <FloatingNote
              progress={scrollYProgress}
              window={[0.08, 0.18, 0.32, 0.42]}
              position="left-[6%] top-[18%]"
              drift={{ x: [-10, 0], y: [12, -10] }}
              icon="check"
              title="Design approved"
              time="2 min ago"
            />
            <FloatingNote
              progress={scrollYProgress}
              window={[0.14, 0.24, 0.4, 0.5]}
              position="right-[6%] top-[12%]"
              drift={{ x: [10, 0], y: [10, -8] }}
              icon="spark"
              title="Client feedback received"
              time="4 min ago"
            />
            <FloatingNote
              progress={scrollYProgress}
              window={[0.46, 0.55, 0.72, 0.8]}
              position="left-[4%] bottom-[14%]"
              drift={{ x: [-12, 0], y: [-14, 8] }}
              icon="chart"
              title="Analytics connected"
              time="Day 8"
            />
            <FloatingNote
              progress={scrollYProgress}
              window={[0.52, 0.6, 0.78, 0.86]}
              position="right-[5%] top-[28%]"
              drift={{ x: [12, 0], y: [-10, 8] }}
              icon="check"
              title="SEO configured"
              time="Day 8"
            />
            <FloatingNote
              progress={scrollYProgress}
              window={[0.78, 0.86, 0.98, 1]}
              position="right-[7%] bottom-[16%]"
              drift={{ x: [10, 0], y: [10, -6] }}
              icon="rocket"
              title="Launch scheduled"
              time="Jun 26"
            />

            <Workspace progress={scrollYProgress} stage={stage} />
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
