import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const LINES: { text: string; italic?: boolean }[] = [
  { text: "We believe a website is the most leveraged asset a company owns." },
  { text: "That it should be built by the people who design it." },
  { text: "That speed and craft are not opposites." },
  { text: "That every detail is a promise." },
  { text: "And that restraint is the highest form of confidence.", italic: true },
];

/**
 * Scene 3 — Manifesto. Question: "Why do these people exist?"
 * Five lines, revealed one at a time on the same spine. No imagery.
 */
export function Manifesto() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={ref}
      aria-label="Manifesto"
      className="relative bg-background"
    >
      <div className="relative mx-auto flex min-h-[110vh] max-w-7xl flex-col justify-center px-6 sm:px-10 lg:px-16">
        {/* Spine continues */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : undefined}
          transition={{ duration: 1.2, ease }}
          style={{ transformOrigin: "top center" }}
          className="absolute left-6 top-0 h-full w-px bg-foreground/12 sm:left-10 lg:left-16"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="ml-8 mb-16 text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted sm:ml-12 lg:ml-16"
        >
          02 · What we believe
        </motion.p>

        <ol className="ml-8 flex max-w-[32ch] flex-col gap-7 sm:ml-12 lg:ml-16 lg:max-w-[34ch]">
          {LINES.map((line, i) => (
            <li key={i}>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.85, delay: 0.55 + i * 0.22, ease }}
                className={`text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.25] tracking-[-0.01em] text-ink ${
                  line.italic ? "text-serif-italic text-ink-soft" : ""
                }`}
              >
                {line.text}
              </motion.p>
            </li>
          ))}
        </ol>

        {/* Hand-off: spine widens slightly toward the next section */}
        <motion.span
          aria-hidden
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 2.2, ease }}
          className="absolute left-[calc(1.5rem-1px)] bottom-0 h-24 w-[3px] bg-gradient-to-b from-foreground/12 to-foreground/25 sm:left-[calc(2.5rem-1px)] lg:left-[calc(4rem-1px)]"
        />
      </div>
    </section>
  );
}
