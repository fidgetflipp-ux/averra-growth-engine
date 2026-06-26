import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Scene 2 — The Problem. Question: "Is this about me?"
 * One spread. One sentence. The hairline from the hero continues down
 * the left edge and becomes the only graphic element on screen.
 */
export function Problem() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      aria-label="The problem"
      className="relative bg-background"
    >
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-6 sm:px-10 lg:px-16">
        {/* Continuing hairline from the hero — the spine of the page */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 1.1, ease }}
          style={{ transformOrigin: "top center" }}
          className="absolute left-6 top-0 h-full w-px bg-foreground/12 sm:left-10 lg:left-16"
        />

        <div className="ml-8 max-w-[24ch] sm:ml-12 lg:ml-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.6, ease }}
            className="mb-10 text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted"
          >
            01 · The problem
          </motion.p>

          <h2 className="text-serif-italic text-[clamp(2rem,5.4vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-ink">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.8, ease }}
              className="block"
            >
              Your website is the first
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 1.0, ease }}
              className="block"
            >
              employee every customer meets.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 1.4, ease }}
              className="mt-6 block text-ink-soft"
            >
              Most companies hire the wrong one.
            </motion.span>
          </h2>
        </div>
      </div>
    </section>
  );
}
