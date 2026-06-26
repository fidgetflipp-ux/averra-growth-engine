import { motion, useTransform, type MotionValue } from "framer-motion";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";

type Props = {
  progress: MotionValue<number>;
};

/**
 * Hero text + CTAs. Strip of content only — no background, no object.
 * The PortalStage owns the viewport sizing; the MonolithStage owns the object.
 * Text fades and lifts away as the camera moves through the monolith.
 */
export function Hero({ progress }: Props) {
  const opacity = useTransform(progress, [0, 0.25, 0.5], [1, 1, 0]);
  const y = useTransform(progress, [0, 0.5], [0, -40]);
  const blur = useTransform(progress, [0, 0.5], ["0px", "4px"]);
  const filter = useTransform(blur, (b) => `blur(${b})`);

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="pointer-events-auto relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-6 text-center"
    >
      <Reveal>
        <div className="mb-12 flex w-fit items-center gap-2.5 rounded-full hairline bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur-md">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-ink">
            3 slots open · Q1 production
          </span>
        </div>
      </Reveal>

      <h1 className="text-display mx-auto max-w-[16ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
        <Reveal>
          <span className="block">Premium websites,</span>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="block">
            delivered in <span className="text-serif-italic">days</span>.
          </span>
        </Reveal>
      </h1>

      <Reveal delay={0.2}>
        <p className="mx-auto mt-8 max-w-[30ch] text-[15px] leading-[1.6] text-ink-muted">
          A senior studio shipping conversion-grade sites in 7–14 days.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
          <CtaGhost href="#work" size="lg">See recent work</CtaGhost>
        </div>
      </Reveal>
    </motion.div>
  );
}
