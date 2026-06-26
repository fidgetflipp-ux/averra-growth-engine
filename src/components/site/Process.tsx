import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    n: "01",
    label: "Day 0",
    title: "Book",
    body: "Choose a package. Reserve a slot. Pay the deposit. Confirmation is instant — no sales call, no proposal cycle.",
  },
  {
    n: "02",
    label: "Day 1 – 4",
    title: "Design",
    body: "Discovery and art direction inside 72 hours. Two directions, one focused round of revisions.",
  },
  {
    n: "03",
    label: "Day 4 – 11",
    title: "Build",
    body: "Senior engineers ship pixel-honest, accessible, blisteringly fast pages on production infrastructure.",
  },
  {
    n: "04",
    label: "Day 11 – 14",
    title: "Launch",
    body: "Final QA, analytics, SEO handoff. Thirty days of care included. Then it's yours.",
  },
];

/**
 * Scene 6 — Process. Question: "Can I trust them?"
 * A sticky-left title pinned against four steps that thread down the
 * same spine that started in the hero. The active dot slides as you scroll.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const activeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-background"
    >
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:px-10 lg:px-16">
        {/* The spine */}
        <span
          aria-hidden
          className="absolute left-6 top-0 h-full w-px bg-foreground/12 sm:left-10 lg:left-16"
        />
        {/* Travelling dot — answers "where am I in the journey?" */}
        <motion.span
          aria-hidden
          style={{ top: activeY }}
          className="absolute left-[calc(1.5rem-3.5px)] size-2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(0,0,0,0.04)] sm:left-[calc(2.5rem-3.5px)] lg:left-[calc(4rem-3.5px)]"
        />

        <div className="ml-8 grid grid-cols-12 gap-x-6 sm:ml-12 lg:ml-16">
          {/* Sticky title column */}
          <div className="col-span-12 md:col-span-4">
            <div className="md:sticky md:top-28">
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, ease }}
                className="text-[10px] font-mono uppercase tracking-[0.28em] text-ink-muted"
              >
                05 · The process
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.9, delay: 0.15, ease }}
                className="mt-8 max-w-[14ch] text-[clamp(2rem,4.4vw,3.4rem)] leading-[1.04] tracking-[-0.02em] text-ink"
              >
                Four steps. Fourteen <span className="text-serif-italic">days.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.6, delay: 0.4, ease }}
                className="mt-8 max-w-[34ch] text-[14px] leading-[1.7] text-ink-soft"
              >
                Same studio, same senior team, every project. From booking to live in less time than most agencies take to send a proposal.
              </motion.p>
            </div>
          </div>

          {/* Steps column */}
          <ol className="col-span-12 mt-20 flex flex-col md:col-span-8 md:mt-0">
            {STEPS.map((s, i) => (
              <Step key={s.n} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <li
      ref={ref}
      className={`group relative py-12 ${
        index === 0 ? "" : "border-t border-foreground/10"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease }}
        className="grid grid-cols-12 gap-x-6"
      >
        <div className="col-span-3 sm:col-span-2">
          <div className="font-mono text-[11px] tracking-[0.22em] text-ink-muted">
            {step.n}
          </div>
          <div className="mt-2 font-mono text-[10px] tracking-[0.2em] text-brand-ink">
            {step.label}
          </div>
        </div>
        <div className="col-span-9 sm:col-span-10">
          <h3 className="text-[clamp(1.6rem,2.6vw,2.1rem)] leading-[1.1] tracking-[-0.015em] text-ink">
            {step.title}
          </h3>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.7] text-ink-soft">
            {step.body}
          </p>
        </div>
      </motion.div>
    </li>
  );
}
