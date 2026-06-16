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
import heroAsset from "@/assets/yeon-ritual-hero.png.asset.json";
import annotatedAsset from "@/assets/yeon-annotated.png.asset.json";

// ————————————————————————————————————————————————————————————————
// Inside the Averra workspace — building yeonritual.com, live.
// ————————————————————————————————————————————————————————————————

const STAGES = [
  { id: 0, label: "Wireframe",    phase: "Wireframe" },
  { id: 1, label: "Design",       phase: "Design" },
  { id: 2, label: "Review",       phase: "Review" },
  { id: 3, label: "Development",  phase: "Development" },
  { id: 4, label: "Optimization", phase: "Optimization" },
  { id: 5, label: "Launch",       phase: "Live" },
] as const;

type NoteKind = "check" | "spark" | "chart" | "rocket" | "dot";
type Note = { icon: NoteKind; title: string; time: string };

const NOTES_BY_STAGE: Record<number, Note[]> = {
  0: [],
  1: [],
  2: [
    { icon: "spark", title: "Design approved by client", time: "Day 4" },
    { icon: "check", title: "Feedback resolved",         time: "Day 4" },
  ],
  3: [],
  4: [
    { icon: "check", title: "SEO configured",              time: "Day 8" },
    { icon: "chart", title: "Analytics connected",         time: "Day 8" },
    { icon: "spark", title: "Performance score 98",        time: "Day 8" },
  ],
  5: [
    { icon: "rocket", title: "Deployed successfully", time: "Just now" },
    { icon: "check",  title: "Live on custom domain", time: "Now" },
    { icon: "dot",    title: "Launch completed",      time: "Now" },
  ],
};

function stageForProgress(p: number) {
  if (p < 0.15) return 0;
  if (p < 0.30) return 1;
  if (p < 0.45) return 2;
  if (p < 0.60) return 3;
  if (p < 0.80) return 4;
  return 5;
}

// ————————————————————————————————————————————————————————————————
// Icons
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
// Floating notifications around the website
// ————————————————————————————————————————————————————————————————

const NOTE_SLOTS = [
  "right-[-2%] top-[14%]",
  "left-[-3%] top-[42%]",
  "right-[-1%] bottom-[14%]",
] as const;

function NotificationStack({ stage }: { stage: number }) {
  const notes = NOTES_BY_STAGE[stage] ?? [];
  return (
    <AnimatePresence mode="popLayout">
      {notes.slice(0, 3).map((note, i) => (
        <motion.div
          key={`${stage}-${i}-${note.title}`}
          initial={{ opacity: 0, x: i === 1 ? -10 : 10, y: 4, scale: 0.94 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
          transition={{ duration: 0.55, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-none absolute ${NOTE_SLOTS[i]} z-40 hidden md:flex items-center gap-2 rounded-full border border-foreground/8 bg-white/95 px-3 py-2 shadow-card backdrop-blur-md`}
        >
          <span className="flex size-5 items-center justify-center rounded-full bg-brand/15">
            <NoteIcon kind={note.icon} />
          </span>
          <span className="text-[12px] font-medium text-ink leading-none">{note.title}</span>
          <span className="text-[10px] font-mono text-ink-muted leading-none">{note.time}</span>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

// ————————————————————————————————————————————————————————————————
// The yeon ritual website — one image, five fidelity layers
// ————————————————————————————————————————————————————————————————

function WireframeLayer() {
  return (
    <div className="flex h-full w-full flex-col bg-[oklch(0.97_0.002_260)] text-ink">
      {/* Nav */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-8 py-4">
        <div className="h-3 w-28 rounded bg-foreground/15" />
        <div className="flex gap-6">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-2 w-14 rounded bg-foreground/12" />
          ))}
        </div>
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-4 rounded-full bg-foreground/12" />
          ))}
        </div>
      </div>
      {/* Hero split */}
      <div className="relative grid flex-1 grid-cols-12 gap-6 px-8 py-10">
        <div className="col-span-5 flex flex-col justify-center gap-4">
          <span className="h-2 w-40 rounded bg-foreground/14" />
          <div className="space-y-2.5">
            <span className="block h-7 w-[85%] rounded bg-foreground/18" />
            <span className="block h-7 w-[60%] rounded bg-foreground/18" />
          </div>
          <span className="h-3 w-56 rounded bg-foreground/12" />
          <div className="space-y-1.5 pt-2">
            <span className="block h-2 w-[70%] rounded bg-foreground/10" />
            <span className="block h-2 w-[55%] rounded bg-foreground/10" />
          </div>
          <div className="pt-4">
            <span className="inline-block h-10 w-44 rounded-full border-2 border-dashed border-foreground/25" />
          </div>
          <div className="flex gap-4 pt-4">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-20 rounded bg-foreground/10" />
            ))}
          </div>
        </div>
        <div className="col-span-7 flex items-center justify-center">
          <div className="relative flex h-[78%] w-[78%] items-center justify-center rounded-2xl border-2 border-dashed border-foreground/20 bg-foreground/[0.04]">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">hero image</span>
            <span className="absolute right-4 top-4 size-12 rounded-full border-2 border-dashed border-foreground/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DesignLayer({ interactive = false }: { interactive?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black text-white">
      <img
        src={heroAsset.url}
        alt="Yeon Ritual — The Lumina"
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      {interactive && (
        <>
          {/* hover ring on the CTA button (which exists in the image) */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.96, 1.03, 1.03, 0.96] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 0.6, times: [0, 0.25, 0.75, 1] }}
            className="absolute bottom-[11%] left-[5%] h-[7%] w-[22%] rounded-full ring-2 ring-white/70 shadow-[0_0_40px_rgba(255,255,255,0.35)]"
          />
          {/* cursor */}
          <motion.svg
            aria-hidden
            initial={{ left: "55%", top: "62%", opacity: 0 }}
            animate={{
              left: ["55%", "12%", "12%", "55%"],
              top: ["62%", "82%", "82%", "62%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            viewBox="0 0 24 24"
            className="absolute z-20 size-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            fill="white"
          >
            <path d="M3 2l7 18 2-8 8-2L3 2z" />
          </motion.svg>
        </>
      )}
    </div>
  );
}

function AnnotatedLayer() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <img
        src={annotatedAsset.url}
        alt="Yeon Ritual — Design review annotations"
        className="absolute inset-0 h-full w-full object-cover object-center"
        draggable={false}
      />
      {/* Annotation cursor hint */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.9, 0.9, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1.2, times: [0, 0.2, 0.8, 1] }}
        className="pointer-events-none absolute left-[62%] top-[28%] z-10"
      >
        <svg viewBox="0 0 24 24" className="size-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" fill="white">
          <path d="M3 2l7 18 2-8 8-2L3 2z" />
        </svg>
      </motion.div>
      {/* Subtle review badge */}
      <div className="pointer-events-none absolute left-5 top-5 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur-md">
        <span className="size-2 rounded-full bg-[#A78BFA]" />
        <span className="text-[10px] font-medium text-white/90">Design review</span>
      </div>
    </div>
  );
}

function StageLayer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0"
      style={{ pointerEvents: active ? "auto" : "none" }}
    >
      {children}
    </motion.div>
  );
}

function WebsiteCanvas({ stage }: { stage: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-[14px] bg-black">
      <StageLayer active={stage === 0}><WireframeLayer /></StageLayer>
      <StageLayer active={stage === 1}><DesignLayer /></StageLayer>
      <StageLayer active={stage === 2}><AnnotatedLayer /></StageLayer>
      <StageLayer active={stage >= 3}><DesignLayer interactive={stage >= 3} /></StageLayer>

      {/* Optimization overlay */}
      <AnimatePresence>
        {stage === 4 && (
          <motion.div
            key="opt-overlay"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute left-6 top-6 z-20 flex items-center gap-4 rounded-full border border-white/15 bg-black/55 px-4 py-2 backdrop-blur-md"
          >
            {[
              { k: "LCP", v: "0.6s" },
              { k: "CLS", v: "0.01" },
              { k: "SEO", v: "100" },
              { k: "A11y", v: "100" },
            ].map((m) => (
              <div key={m.k} className="flex items-baseline gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/55">{m.k}</span>
                <span className="text-[12px] font-semibold text-white">{m.v}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launch glow */}
      <AnimatePresence>
        {stage === 5 && (
          <motion.div
            key="launch-glow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(127,185,138,0.18) 100%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ————————————————————————————————————————————————————————————————
// Browser frame (preview → production)
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
  const rotY = useTransform(progress, [0, 0.5, 1], [-6, 0, 6]);
  const rotX = useTransform(progress, [0, 0.5, 1], [1.5, 0, 1.5]);

  const glow = useTransform(progress, [0.78, 0.95], [0, 1]);
  const glowShadow = useTransform(
    glow,
    (g) =>
      `0 60px 120px -50px rgba(15, 23, 19, 0.45), 0 0 0 1px rgba(15,23,19,0.06), 0 0 ${
        80 * g
      }px rgba(127, 185, 138, ${0.32 * g})`,
  );

  const current = STAGES[stage];
  const launched = stage === 5;
  const url = launched ? "yeonritual.com" : "preview.averra.app/yeon-ritual";

  return (
    <motion.div
      style={{
        rotateX: rotX,
        rotateY: rotY,
        boxShadow: glowShadow,
        transformPerspective: 1800,
        transformStyle: "preserve-3d",
      }}
      className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border border-foreground/10 bg-white/80 backdrop-blur-xl will-change-transform"
    >
      {/* Browser chrome */}
      <div className="flex h-10 items-center gap-3 border-b border-foreground/10 bg-white/85 px-4 backdrop-blur">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex items-center gap-2 pl-2">
          <AverraMark />
          <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-ink-muted">averra</span>
          <span className="h-3 w-px bg-foreground/12" />
          <span className="text-[11px] font-medium text-ink">Yeon Ritual</span>
        </div>
        <div className="mx-auto flex max-w-[60%] flex-1 items-center justify-center">
          <motion.div
            key={url}
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-[11px] font-mono ${
              launched
                ? "bg-brand/12 text-brand-ink ring-1 ring-brand/30"
                : "bg-foreground/5 text-ink-muted"
            }`}
          >
            {launched ? (
              <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" strokeLinecap="round" />
              </svg>
            ) : (
              <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 018 0v3" />
              </svg>
            )}
            {url}
          </motion.div>
        </div>
        <motion.div
          key={current.phase}
          initial={{ opacity: 0, y: -3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
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

      {/* Canvas */}
      <div className="relative h-[calc(100%-2.5rem)]">
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
      style={{ height: "600vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        {/* Ambient backdrop */}
        <div aria-hidden className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[720px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,theme(colors.brand.DEFAULT/0.06),transparent_65%)] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, oklch(0.14 0.005 260 / 0.06) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.14 0.005 260 / 0.06) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, black 30%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 55% at 50% 55%, black 30%, transparent 80%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        </div>

        {/* Header */}
        <div className="relative z-30 mx-auto w-full max-w-7xl px-6 pt-24">
          <Reveal>
            <div className="flex flex-col items-center gap-3 text-center">
              <Eyebrow>Inside the Averra workspace</Eyebrow>
              <h2 className="text-display text-[clamp(1.5rem,2.8vw,2.25rem)] max-w-[24ch]">
                From concept to launch in <span className="text-serif-italic">14 days</span>.
              </h2>
            </div>
          </Reveal>
        </div>

        {/* Frame + contextual notifications */}
        <div className="relative z-20 mt-4 flex w-full flex-1 items-center justify-center px-6">
          <div className="relative mx-auto" style={{ width: "min(64vw, 1080px)", maxHeight: "62vh", perspective: 1800 }}>
            <NotificationStack stage={stage} />
            <WorkspaceFrame progress={scrollYProgress} stage={stage} />
          </div>
        </div>

        {/* Stage rail */}
        <div className="relative z-30 mb-8 mt-4 flex justify-center">
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

      {/* Overflowing annotated frame — bleeds into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-6"
        style={{ transform: "translateY(38%)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[1180px] overflow-hidden rounded-2xl border border-foreground/12 bg-black shadow-[0_60px_120px_-40px_rgba(15,23,19,0.55),0_0_0_1px_rgba(15,23,19,0.06)]"
        >
          {/* Frame chrome */}
          <div className="flex h-9 items-center gap-3 border-b border-white/8 bg-black/85 px-4 backdrop-blur">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
              <span className="size-2 rounded-full bg-white/20" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-white/45">averra · design review</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-0.5 text-[10px] font-medium text-white/70">
              <span className="size-1.5 rounded-full bg-[#A78BFA]" />
              Annotated
            </span>
          </div>
          <img
            src={annotatedAsset.url}
            alt="Annotated Yeon Ritual design review"
            className="block h-auto w-full"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
