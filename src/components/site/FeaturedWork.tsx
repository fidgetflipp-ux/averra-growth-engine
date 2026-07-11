import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import silk from "@/assets/work-silk.jpg.asset.json";
import arch from "@/assets/work-arch.jpg.asset.json";
import bronze from "@/assets/work-bronze.jpg.asset.json";

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

type Work = {
  index: string;
  client: string;
  sector: string;
  kind: string;
  year: string;
  headline: string;
  cover?: string;
  url?: string;
};

const works: Work[] = [
  {
    index: "01",
    client: "ScarTec Therapeutics",
    sector: "Biotechnology",
    kind: "Web Experience",
    year: "MMXXVI",
    headline:
      "A clinical-stage homepage that earns credibility at first scroll.",
    cover: silk.url,
    url: "https://scartec.com",
  },
  {
    index: "02",
    client: "Yeon Ritual",
    sector: "Luxury skincare",
    kind: "Editorial Storefront",
    year: "MMXXVI",
    headline: "A ceremonial storefront that lifted AOV by nearly half.",
    cover: arch.url,
    url: "https://yeonritual.com",
  },
  {
    index: "03",
    client: "Northwind Capital",
    sector: "Private equity",
    kind: "Firm Narrative",
    year: "MMXXV",
    headline:
      "Repositioned to match the AUM, and the inbound followed.",
    cover: bronze.url,
    url: "https://northwind.capital",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ────────────────────────────────────────────────────────────
   Section
   ──────────────────────────────────────────────────────────── */

export function FeaturedWork() {
  return (
    <section
      id="work"
      className="relative overflow-hidden"
      style={{ background: "#E8E5DD" }}
    >
      {/* subtle grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-10 pt-32 md:pt-48 pb-32 md:pb-48">
        {/* ── Header row: mark ─ divider ── */}
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/70">
            ◍ &nbsp;Selected Work
          </span>
          <span className="h-px flex-1 bg-ink/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/45">
            MMXXVI · Vol. 01
          </span>
        </div>

        {/* ── Editorial headline ─ full width, immersive-g scale ── */}
        <div className="mt-40 md:mt-56 max-w-[1200px]">
          <h2
            className="text-ink"
            style={{
              fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
              fontWeight: 400,
              fontSize: "clamp(2.75rem, 6.4vw, 6.5rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            <RevealLine delay={0}>
              Transcend anything seen&nbsp;&nbsp;
            </RevealLine>
            <RevealLine delay={0.08}>
              or felt before by crafting&nbsp;&nbsp;
            </RevealLine>
            <RevealLine delay={0.16}>
              <span style={{ fontStyle: "italic" }} className="text-ink-soft">
                unparalleled experiences
              </span>
              &nbsp;&nbsp;
            </RevealLine>
            <RevealLine delay={0.24}>for ambitious brands.</RevealLine>
          </h2>
        </div>

        {/* ── Project blocks ── */}
        <div className="mt-40 md:mt-56 flex flex-col gap-40 md:gap-56">
          {works.map((w, i) => (
            <ProjectBlock key={w.client} work={w} align={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>

        {/* ── Footer meta ── */}
        <div className="mt-40 md:mt-56 flex items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/45">
              ⟶ &nbsp;Continue
            </div>
            <a
              href="#packages"
              className="mt-6 inline-flex items-baseline gap-3 text-ink group"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="story-link">Begin a project</span>
              <ArrowUpRight className="size-6 md:size-8 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
          <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.32em] text-ink/45">
            {String(works.length).padStart(2, "0")} · Projects
          </span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Reveal Line
   ──────────────────────────────────────────────────────────── */

function RevealLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.18em] align-baseline">
      <motion.span
        initial={{ y: "60%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   Project Block
   ──────────────────────────────────────────────────────────── */

function ProjectBlock({ work, align }: { work: Work; align: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  const isLeft = align === "left";

  return (
    <div ref={ref} className="relative">
      <div
        className={`grid grid-cols-12 gap-6 md:gap-10 items-start ${
          isLeft ? "" : "[direction:rtl]"
        }`}
      >
        {/* Media */}
        <motion.a
          href={work.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="col-span-12 md:col-span-9 relative block overflow-hidden [direction:ltr] group"
          style={{ aspectRatio: "16 / 10" }}
        >
          <motion.div
            style={{ y, scale }}
            className="absolute inset-[-6%]"
          >
            {work.cover ? (
              <img
                src={work.cover}
                alt={work.client}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-ink/80 to-ink" />
            )}
          </motion.div>

          {/* Corner index tag */}
          <div className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.32em] text-white/85 mix-blend-difference">
            {work.index} / {String(works.length).padStart(2, "0")}
          </div>

          {/* Hover hint */}
          <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white">
              View
            </span>
            <ArrowUpRight className="size-3 text-white" />
          </div>
        </motion.a>

        {/* Caption column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className={`col-span-12 md:col-span-3 [direction:ltr] ${
            isLeft ? "md:pt-8" : "md:pt-8 md:text-right"
          }`}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink/50">
            {work.sector} · {work.year}
          </div>
          <h3
            className="mt-5 text-ink"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 1.9vw, 2rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
            }}
          >
            {work.client}
          </h3>
          <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-soft">
            {work.headline}
          </p>
          <a
            href={work.url}
            target="_blank"
            rel="noreferrer"
            className={`mt-6 inline-flex items-center gap-2 border-b border-ink/40 pb-1 font-mono text-[10px] uppercase tracking-[0.32em] text-ink hover:border-ink transition-colors`}
          >
            {work.kind}
            <ArrowUpRight className="size-3" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
