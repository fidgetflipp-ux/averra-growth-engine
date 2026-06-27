import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Reveal } from "./primitives";
import futureStateImage from "@/assets/future-state.png.asset.json";

/**
 * FutureState — a single editorial moment.
 * Eyebrow → headline → body → monumental architectural image.
 */
export function FutureState() {
  return (
    <section
      aria-label="Future State"
      className="relative bg-surface hairline-t hairline-b"
    >
      <div className="mx-auto max-w-[1480px] px-6 py-40 md:py-56">
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
          <h2 className="text-display mx-auto mt-10 max-w-[22ch] text-center text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.025em]">
            Build the company competitors compare themselves{" "}
            <span className="text-serif-italic">against.</span>
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 max-w-[60ch] text-center text-[17px] leading-[1.7] text-ink-soft">
            <p>
              Exceptional companies are perceived differently long before they
              dominate their markets. We build digital experiences that
              <span className="text-ink"> accelerate that process.</span>
            </p>
          </div>
        </Reveal>

        {/* Image */}
        <div className="mt-24 flex justify-center">
          <FutureStateImage />
        </div>
      </div>
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
