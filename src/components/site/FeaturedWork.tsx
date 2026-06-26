import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import scartec from "@/assets/scartec-hero.png.asset.json";
import yeon from "@/assets/yeon-ritual-hero.png.asset.json";

type Case = {
  index: string;
  client: string;
  sector: string;
  year: string;
  headline: string;
  body: string;
  capabilities: string[];
  metric: { value: string; label: string; period: string };
  cover: string;
  reverse?: boolean;
};

const CASES: Case[] = [
  {
    index: "01",
    client: "ScarTec Therapeutics",
    sector: "Clinical-stage biotech",
    year: "MMXXVI",
    headline: "Credibility, earned at first scroll.",
    body:
      "A homepage built to convince scientists, regulators, and investors in the same breath. Restraint where it mattered; conviction where it counted.",
    capabilities: ["Positioning", "Art direction", "Engineering", "CMS"],
    metric: { value: "+340%", label: "Investor page views", period: "90 days post-launch" },
    cover: scartec.url,
  },
  {
    index: "02",
    client: "Yeon Ritual",
    sector: "Luxury skincare",
    year: "MMXXVI",
    headline: "A quiet brand, a loud launch.",
    body:
      "From a single product to a fully realised house in fourteen days. Editorial typography, a deliberate palette, and a checkout that disappears.",
    capabilities: ["Brand system", "E-commerce", "Storytelling", "Launch"],
    metric: { value: "3.4×", label: "First-month revenue", period: "vs. legacy site" },
    cover: yeon.url,
    reverse: true,
  },
];

function CaseRow({ c }: { c: Case }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <article ref={ref} className="relative">
      {/* The shared hairline spine — continues the page rule */}
      <span
        aria-hidden
        className="absolute left-6 top-0 h-full w-px bg-foreground/12 sm:left-10 lg:left-16"
      />

      <div className="relative ml-8 grid grid-cols-12 gap-x-6 gap-y-10 px-6 pb-32 pt-24 sm:ml-12 sm:px-10 lg:ml-16 lg:px-16">
        {/* Index marker — sits ON the spine */}
        <motion.span
          aria-hidden
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{ duration: 0.5, ease }}
          className="absolute -left-[calc(2rem+3.5px)] top-24 size-2 rounded-full bg-ink sm:-left-[calc(2.5rem+3.5px)] lg:-left-[calc(4rem+3.5px)]"
        />

        {/* Text column */}
        <div className={`col-span-12 md:col-span-5 ${c.reverse ? "md:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 0.15, ease }}
            className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-muted"
          >
            <span>{c.index}</span>
            <span className="h-px w-5 bg-foreground/20" />
            <span>{c.client}</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.85, delay: 0.3, ease }}
            className="text-serif-italic mt-8 text-[clamp(1.8rem,3.6vw,2.9rem)] leading-[1.05] tracking-[-0.015em] text-ink"
          >
            {c.headline}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-7 max-w-[42ch] text-[15px] leading-[1.65] text-ink-soft"
          >
            {c.body}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.7, ease }}
            className="mt-9 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
          >
            {c.capabilities.map((cap) => (
              <li key={cap}>· {cap}</li>
            ))}
          </motion.ul>

          {/* metric — quiet, not a hero number */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.6, delay: 0.85, ease }}
            className="mt-12 flex items-baseline gap-5 border-t border-foreground/10 pt-6"
          >
            <span className="text-display text-[2.4rem] leading-none text-ink">
              {c.metric.value}
            </span>
            <span className="flex flex-col text-[12px] leading-tight text-ink-soft">
              <span>{c.metric.label}</span>
              <span className="text-ink-muted">{c.metric.period}</span>
            </span>
          </motion.div>
        </div>

        {/* Visual column — opens like a shutter, never fades */}
        <div className={`col-span-12 md:col-span-7 ${c.reverse ? "md:order-1" : ""}`}>
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={inView ? { clipPath: "inset(0 0 0% 0)" } : undefined}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="relative aspect-[4/5] w-full overflow-hidden bg-surface"
          >
            <motion.img
              src={c.cover}
              alt={`${c.client} — selected work`}
              loading="lazy"
              initial={{ scale: 1.08 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ duration: 1.6, delay: 0.2, ease }}
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute bottom-4 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/80 mix-blend-difference">
              {c.client} · {c.year}
            </span>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

/**
 * Scene 4 — Work. Question: "Can they actually do it?"
 * Two case studies. No grid of logos. No carousel. Each opens like a shutter.
 */
export function FeaturedWork() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="work" ref={ref} className="relative bg-background">
      {/* Section title sits inside the spine, like the others */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 sm:px-10 lg:px-16">
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
            03 · Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-8 max-w-[18ch] text-[clamp(2rem,5vw,4rem)] leading-[1.02] tracking-[-0.02em] text-ink"
          >
            Two pieces of evidence. That is enough.
          </motion.h2>
        </div>
      </div>

      <div className="mt-20">
        {CASES.map((c) => (
          <CaseRow key={c.client} c={c} />
        ))}
      </div>
    </section>
  );
}
