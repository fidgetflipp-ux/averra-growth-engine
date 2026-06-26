import { motion, useTransform, type MotionValue } from "framer-motion";
import { CtaPrimary, Reveal, LineUnmask } from "./primitives";

type Props = {
  progress: MotionValue<number>;
};

/**
 * Hero — Scene 1. Question: "Why should I care?"
 * One headline. One CTA. One quiet meta line. The headline does not fade in —
 * a thin sage line draws across and the type unmasks behind it.
 */
export function Hero({ progress }: Props) {
  const opacity = useTransform(progress, [0, 0.12, 0.32], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.32], [0, -28]);
  const blur = useTransform(progress, [0, 0.32], ["0px", "3px"]);
  const filter = useTransform(blur, (b) => `blur(${b})`);

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="pointer-events-auto relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6 text-center"
    >
      {/* Quiet status line — no pill, no pulse theater */}
      <Reveal>
        <div className="mb-14 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-ink-muted">
          <span className="size-1 rounded-full bg-brand/80" />
          <span>Averra Studio · Three slots open for Q1</span>
        </div>
      </Reveal>

      <h1 className="text-display mx-auto max-w-[16ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
        <span className="block">
          <LineUnmask delay={0.15} duration={0.95}>Premium websites,</LineUnmask>
        </span>
        <span className="block">
          <LineUnmask delay={0.55} duration={0.95}>
            delivered in <span className="text-serif-italic">days</span>.
          </LineUnmask>
        </span>
      </h1>

      <Reveal delay={1.25}>
        <p className="mx-auto mt-10 max-w-[34ch] text-[15px] leading-[1.6] text-ink-muted">
          A senior studio for founders who refuse to compromise on craft.
        </p>
      </Reveal>

      <Reveal delay={1.45}>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <span className="relative">
              See selected work
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 bg-foreground/25 transition-transform duration-500 group-hover:bg-ink" />
            </span>
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </Reveal>

      {/* Editorial corner meta — the one Awwwards detail */}
      <div className="pointer-events-none absolute inset-x-0 top-6 flex items-start justify-between px-2 text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted/70 sm:px-6">
        <span>Averra</span>
        <span>Studio · MMXXVI</span>
      </div>
    </motion.div>
  );
}
