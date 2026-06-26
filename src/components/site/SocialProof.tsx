import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STATS = [
  { value: "11d", label: "Average production time", note: "Booking to deployment" },
  { value: "98", label: "Lighthouse, every launch", note: "Performance · Accessibility" },
  { value: "32", label: "Studios shipped", note: "From founders & operators" },
];

/**
 * Scene 5 — Proof. Question: "Are others like me already here?"
 * One pull-quote. Three verified metrics. Everything else is silence.
 */
export function SocialProof() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      aria-label="Proof"
      className="relative bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-40 sm:px-10 lg:px-16">
        {/* Spine continues */}
        <span
          aria-hidden
          className="absolute left-6 top-0 h-full w-px bg-foreground/12 sm:left-10 lg:left-16"
        />

        <div className="ml-8 sm:ml-12 lg:ml-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, ease }}
            className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted"
          >
            04 · The verdict
          </motion.p>

          <figure className="mt-14 max-w-[28ch]">
            {/* Oversized opening quote in serif italic, the page's "voice" */}
            <motion.blockquote
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.0, delay: 0.2, ease }}
              className="text-serif-italic text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1] tracking-[-0.015em] text-ink"
            >
              <span className="text-ink-muted">“</span>
              We expected a website. Averra delivered an unfair advantage.
              <span className="text-ink-muted">”</span>
            </motion.blockquote>

            <motion.figcaption
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mt-10 flex items-center gap-4 text-[12px] tracking-[0.04em] text-ink-soft"
            >
              <span className="h-px w-10 bg-foreground/25" />
              <span>
                <span className="text-ink">Helena Voss</span>
                <span className="text-ink-muted"> · Founder, Yeon Ritual</span>
              </span>
            </motion.figcaption>
          </figure>

          {/* Quiet trio of metrics — same hairline grammar as the spine */}
          <div className="mt-28 grid max-w-4xl grid-cols-1 gap-px overflow-hidden bg-foreground/12 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.12, ease }}
                className="bg-background p-8"
              >
                <div className="text-display text-[2.6rem] leading-none text-ink">
                  {s.value}
                </div>
                <div className="mt-5 text-[13px] text-ink">{s.label}</div>
                <div className="mt-1 text-[11px] text-ink-muted">{s.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
