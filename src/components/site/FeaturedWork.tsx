import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";
import scartec from "@/assets/scartec-hero.png.asset.json";
import yeon from "@/assets/yeon-ritual-hero.png.asset.json";

/* ────────────────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────────────────── */

type Stat = { value: string; label: string };
type Work = {
  client: string;
  sector: string;
  headline: string;
  metric: string;
  metricLabel: string;
  period: string;
  cover?: string;
  url?: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  stats: Stat[];
  gallery: { src?: string; caption: string }[];
};

const works: Work[] = [
  {
    client: "ScarTec Therapeutics",
    sector: "Biotechnology",
    headline: "A clinical-stage homepage that earns credibility at first scroll.",
    metric: "+340%",
    metricLabel: "Investor page views",
    period: "90 days post-launch",
    cover: scartec.url,
    url: "scartec.com",
    overview:
      "ScarTec is a clinical-stage biotech developing a first-in-class therapy for fibrotic scarring. Their previous site read like a brochure — we rebuilt it as an investor-grade narrative.",
    challenge:
      "Translate dense translational science into a homepage that holds the attention of investors, partners, and KOLs in under sixty seconds — without diluting the rigor.",
    approach: [
      "Restructured the IA around the asset, the science, and the team — in that order.",
      "Designed a quiet, monochrome system with editorial typography to signal seriousness.",
      "Built a custom mechanism-of-action explainer using scroll-tied SVG.",
      "Engineered for sub-1s LCP on investor mobile devices.",
    ],
    outcome:
      "Within 90 days of launch, investor page views grew 3.4×, average session time more than doubled, and three Tier 1 funds initiated contact directly through the site.",
    stats: [
      { value: "+340%", label: "Investor page views" },
      { value: "2.6×", label: "Avg. session time" },
      { value: "0.9s", label: "LCP, mobile" },
    ],
    gallery: [
      { src: scartec.url, caption: "Homepage — above the fold" },
      { src: scartec.url, caption: "Mechanism of action — scroll module" },
      { src: scartec.url, caption: "Pipeline & milestones" },
    ],
  },
  {
    client: "Yeon Ritual",
    sector: "Luxury skincare",
    headline: "A ceremonial storefront that lifted AOV by nearly half.",
    metric: "+47%",
    metricLabel: "Average order value",
    period: "60 days post-launch",
    cover: yeon.url,
    url: "yeonritual.com",
    overview:
      "Yeon Ritual is a Seoul-born luxury skincare house. We rebuilt their storefront as a ceremony — slower, more deliberate, and priced like the product deserves.",
    challenge:
      "Move the brand out of the mass-prestige tier on Shopify defaults and stage it like a $400 ritual that customers actively look forward to performing.",
    approach: [
      "Replaced the product grid with a guided ritual sequence.",
      "Commissioned new photography, art-directed by our team.",
      "Custom Shopify Hydrogen build with editorial PDP and bundle logic.",
      "Subscription flow rewritten to feel like membership, not auto-renew.",
    ],
    outcome:
      "AOV climbed 47% in the first 60 days, repeat purchase rate jumped, and the brand was picked up by two flagship department stores within the quarter.",
    stats: [
      { value: "+47%", label: "Average order value" },
      { value: "+62%", label: "Repeat purchase rate" },
      { value: "2", label: "Flagship retail pickups" },
    ],
    gallery: [
      { src: yeon.url, caption: "Storefront — ritual sequence" },
      { src: yeon.url, caption: "Editorial PDP" },
      { src: yeon.url, caption: "Membership flow" },
    ],
  },
  {
    client: "Northwind Capital",
    sector: "Private equity",
    headline: "Repositioned to match the AUM, and the inbound followed.",
    metric: "$84M",
    metricLabel: "Qualified inbound",
    period: "12 months",
    url: "northwind.capital",
    overview:
      "Northwind manages $1.8B across lower middle-market industrials. Their site looked like a 2014 boutique advisor — not a fund founders pitch to first.",
    challenge:
      "Reposition the firm to match its actual AUM and operator network, while staying conservative enough for LP scrutiny.",
    approach: [
      "Re-wrote the firm narrative around operator-led value creation.",
      "Built a portfolio system that surfaces case studies, not just logos.",
      "Designed an LP-only data room behind a quiet, secure auth flow.",
      "Established a content cadence to compound search authority.",
    ],
    outcome:
      "Over twelve months, the site sourced $84M in qualified inbound deal flow and became the firm's #1 origination channel.",
    stats: [
      { value: "$84M", label: "Qualified inbound" },
      { value: "#1", label: "Origination channel" },
      { value: "12mo", label: "Window" },
    ],
    gallery: [
      { caption: "Firm narrative — hero" },
      { caption: "Portfolio case studies" },
      { caption: "LP data room — gated" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const serif = { fontFamily: "'Playfair Display', serif" };
const sans = { fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" };

const headingLines: { words: { t: string; italic?: boolean }[] }[] = [
  { words: [{ t: "Results" }, { t: "that" }, { t: "speak" }] },
  {
    words: [
      { t: "for" },
      { t: "themselves.", italic: true },
    ],
  },
];

/* ────────────────────────────────────────────────────────────
   Section
   ──────────────────────────────────────────────────────────── */

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);

  // Cursor parallax across the whole scene
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.7 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const onLeave = () => {
      mx.set(0);
      my.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [mx, my]);

  // Scroll-driven ambience
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const stageTilt = useTransform(scrollYProgress, [0, 1], [4, -4]);
  const spotlightY = useTransform(scrollYProgress, [0, 1], ["42%", "58%"]);

  // Auto-rotate the showcase
  useEffect(() => {
    if (paused || expanded) return;
    const id = setInterval(
      () => setActiveIdx((i) => (i + 1) % works.length),
      6200
    );
    return () => clearInterval(id);
  }, [paused, expanded]);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowRight") setActiveIdx((i) => (i + 1) % works.length);
      if (e.key === "ArrowLeft")
        setActiveIdx((i) => (i - 1 + works.length) % works.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const active = works[activeIdx];

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 40%, #1a1614 0%, #0e0c0b 55%, #060505 100%)",
      }}
    >
      {/* ── Atmosphere ─────────────────────────────────────── */}
      <Atmosphere spotlightY={spotlightY} mx={sx} my={sy} />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-40 pt-32 md:pb-48 md:pt-40">
        {/* Floating monogram / hero object */}
        <FloatingMonogram
          mx={sx}
          my={sy}
          scrollRotate={scrollRotate}
        />

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-10 flex items-center gap-3"
          style={sans}
        >
          <span className="h-px w-8 bg-white/25" />
          <span className="text-[10px] uppercase tracking-[0.42em] text-white/55">
            Selected Work · MMXXVI
          </span>
          <span className="h-px w-8 bg-white/25" />
        </motion.div>

        {/* Editorial headline */}
        <h2
          className="mt-8 text-center text-white"
          style={{
            ...serif,
            fontSize: "clamp(2.75rem, 8.4vw, 8rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
          }}
        >
          {headingLines.map((line, li) => (
            <span key={li} className="block">
              {line.words.map((w, wi) => (
                <WordReveal
                  key={`${li}-${wi}`}
                  delay={0.55 + (li * line.words.length + wi) * 0.11}
                  italic={w.italic}
                >
                  {w.t}
                </WordReveal>
              ))}
            </span>
          ))}
        </h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, delay: 1.15, ease: EASE }}
          className="mt-9 max-w-xl text-center text-[15px] leading-[1.7] text-white/70"
          style={sans}
        >
          Strategy, brand, engineering and AI systems — orchestrated into
          one operating environment for market leaders.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, delay: 1.35, ease: EASE }}
          className="mt-12"
        >
          <MagneticCta href="#packages">Begin a project</MagneticCta>
        </motion.div>

        {/* ── Floating showcase cards ─────────────────────── */}
        <div
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mt-32 h-[clamp(440px,60vh,640px)] w-full"
          style={{ perspective: 2400, perspectiveOrigin: "50% 40%" }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{
              transformStyle: "preserve-3d",
              rotateX: stageTilt,
            }}
          >
            {works.map((w, i) => {
              let offset = i - activeIdx;
              if (offset > works.length / 2) offset -= works.length;
              if (offset < -works.length / 2) offset += works.length;
              return (
                <ShowcaseCard
                  key={w.client}
                  work={w}
                  offset={offset}
                  onSelect={() => {
                    if (offset === 0) setExpanded(true);
                    else setActiveIdx(i);
                  }}
                  mx={sx}
                  my={sy}
                />
              );
            })}
          </motion.div>

          {/* Nav controls */}
          <button
            type="button"
            onClick={() =>
              setActiveIdx((i) => (i - 1 + works.length) % works.length)
            }
            aria-label="Previous project"
            className="absolute left-2 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 backdrop-blur-md transition hover:scale-[1.06] hover:border-white/25 hover:text-white md:left-6"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIdx((i) => (i + 1) % works.length)}
            aria-label="Next project"
            className="absolute right-2 top-1/2 z-30 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/80 backdrop-blur-md transition hover:scale-[1.06] hover:border-white/25 hover:text-white md:right-6"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Active meta */}
        <div className="mt-14 grid w-full items-end gap-10 md:grid-cols-12">
          <motion.div
            key={`${active.client}-meta`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="md:col-span-7"
          >
            <div
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/50"
              style={sans}
            >
              <span>{active.sector}</span>
              <span className="h-px w-6 bg-white/20" />
              <span>{active.client}</span>
            </div>
            <h3
              className="mt-5 max-w-2xl text-white/95"
              style={{
                ...serif,
                fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {active.headline}
            </h3>
          </motion.div>

          <motion.div
            key={`${active.client}-metric`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
            className="md:col-span-5 md:justify-self-end"
          >
            <div className="flex items-end gap-8 border-t border-white/10 pt-6">
              <div>
                <div
                  className="text-5xl text-white"
                  style={{ ...serif, letterSpacing: "-0.03em" }}
                >
                  {active.metric}
                </div>
                <div
                  className="mt-1.5 text-sm text-white/70"
                  style={sans}
                >
                  {active.metricLabel}
                </div>
                <div
                  className="mt-0.5 text-xs text-white/45"
                  style={sans}
                >
                  {active.period}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Indicator rail */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {works.map((w, i) => (
            <button
              key={w.client}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`Show ${w.client}`}
              className="group relative h-[2px] w-14 overflow-hidden rounded-full bg-white/15"
            >
              <motion.span
                initial={false}
                animate={{ scaleX: i === activeIdx ? 1 : 0 }}
                transition={{
                  duration: i === activeIdx && !paused ? 6.2 : 0.4,
                  ease: "linear",
                }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-white/80 to-[#c9a475]"
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Expanded lightbox (unchanged behavior) ────────── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-xl"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.96, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.97, y: 20, opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto my-6 w-[min(96vw,1280px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0b0d10] shadow-[0_60px_180px_-30px_rgba(0,0,0,0.95)] md:my-12"
            >
              <div className="sticky top-0 z-10 flex items-center gap-1.5 border-b border-white/8 bg-[#0b0d10]/95 px-5 py-3 backdrop-blur">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  {active.url ?? active.client.toLowerCase()}
                </span>
                <div className="ml-auto flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIdx((i) => (i - 1 + works.length) % works.length)
                    }
                    aria-label="Previous case study"
                    className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/85"
                  >
                    <ChevronLeft className="size-4" /> Prev
                  </button>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                    {String(activeIdx + 1).padStart(2, "0")} /{" "}
                    {String(works.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIdx((i) => (i + 1) % works.length)
                    }
                    aria-label="Next case study"
                    className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/85"
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpanded(false)}
                    aria-label="Close"
                    className="ml-1 flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/85"
                  >
                    <X className="size-4" /> Close
                  </button>
                </div>
              </div>

              {active.cover ? (
                <img
                  src={active.cover}
                  alt={`${active.client} — hero`}
                  className="max-h-[70vh] w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-[44vh] items-center justify-center bg-gradient-to-br from-[#11141a] to-[#0a0d11] text-white/40">
                  {active.client}
                </div>
              )}

              <div className="border-b border-white/8 px-8 py-10 md:px-14 md:py-14">
                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/55">
                  <span>{active.sector}</span>
                  <span className="h-px w-6 bg-white/20" />
                  <span>{active.client}</span>
                  <span className="h-px w-6 bg-white/20" />
                  <span>{active.period}</span>
                </div>
                <h3
                  className="mt-5 max-w-3xl text-white/95"
                  style={{
                    ...serif,
                    fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {active.headline}
                </h3>
                <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/65 md:text-lg">
                  {active.overview}
                </p>

                <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
                  {active.stats.map((s) => (
                    <div key={s.label}>
                      <div
                        className="text-4xl text-white/95"
                        style={serif}
                      >
                        {s.value}
                      </div>
                      <div className="mt-1.5 text-sm text-white/55">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-12 px-8 py-12 md:grid-cols-12 md:px-14 md:py-16">
                <div className="md:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                    The challenge
                  </div>
                  <p className="mt-4 text-white/75 leading-relaxed">
                    {active.challenge}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                    Our approach
                  </div>
                  <ul className="mt-4 space-y-3 text-white/75 leading-relaxed">
                    {active.approach.map((a) => (
                      <li key={a} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-[#c9a475]" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-4">
                  <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                    Outcome
                  </div>
                  <p className="mt-4 text-white/75 leading-relaxed">
                    {active.outcome}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/8 bg-white/[0.015] px-8 py-12 md:px-14 md:py-16">
                <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
                  Selected screens
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {active.gallery.map((g, idx) => (
                    <figure
                      key={idx}
                      className={`overflow-hidden rounded-xl border border-white/10 bg-[#0d0f12] ${
                        idx === 0 ? "md:col-span-2" : ""
                      }`}
                    >
                      {g.src ? (
                        <img
                          src={g.src}
                          alt={g.caption}
                          className="w-full object-cover object-top"
                          style={{ aspectRatio: idx === 0 ? "16 / 9" : "4 / 3" }}
                        />
                      ) : (
                        <div
                          className="flex w-full items-center justify-center bg-gradient-to-br from-[#11141a] to-[#0a0d11] text-sm text-white/40"
                          style={{ aspectRatio: idx === 0 ? "16 / 9" : "4 / 3" }}
                        >
                          {g.caption}
                        </div>
                      )}
                      <figcaption className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/45">
                        {String(idx + 1).padStart(2, "0")} — {g.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-8 py-8 md:px-14">
                <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                  {active.client} · {active.sector}
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  Close case study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Atmosphere — cinematic layered background
   ──────────────────────────────────────────────────────────── */

function Atmosphere({
  spotlightY,
  mx,
  my,
}: {
  spotlightY: MotionValue<string>;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const lightX = useTransform(mx, [-1, 1], ["44%", "56%"]);
  const lightY = useTransform(my, [-1, 1], ["44%", "56%"]);

  return (
    <>
      {/* Deep vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 90% at 50% 50%, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Cinematic spotlight follows scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% var(--sy, 50%), rgba(255,235,205,0.14) 0%, rgba(255,235,205,0.05) 30%, transparent 65%)`,
          // @ts-expect-error CSS var
          "--sy": spotlightY,
        }}
      />

      {/* Cursor-following soft bloom */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle 620px at var(--lx) var(--ly), rgba(201,164,117,0.12), transparent 60%)`,
          // @ts-expect-error CSS var
          "--lx": lightX,
          "--ly": lightY,
        }}
      />

      {/* Ambient conic rays */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35], rotate: [0, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "conic-gradient(from 220deg at 50% 45%, transparent 0deg, rgba(255,220,180,0.06) 40deg, transparent 110deg, rgba(255,255,255,0.03) 200deg, transparent 300deg)",
          filter: "blur(50px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.9 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "260px 260px",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Top & bottom fades to blend with neighbors */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, #060505 0%, rgba(6,5,5,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(0deg, #060505 0%, rgba(6,5,5,0) 100%)",
        }}
      />
    </>
  );
}

function Particles() {
  const dots = Array.from({ length: 26 });
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {dots.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 1 + (i % 3);
        const dur = 16 + (i % 7) * 2.4;
        const delay = (i % 5) * 1.6;
        const isGold = i % 4 === 0;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              background: isGold
                ? "rgba(201,164,117,0.6)"
                : "rgba(255,245,230,0.35)",
              boxShadow: isGold
                ? "0 0 8px rgba(201,164,117,0.4)"
                : "0 0 6px rgba(255,245,230,0.25)",
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.15, 0.5, 0.15] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Floating Monogram — abstract glass emblem
   ──────────────────────────────────────────────────────────── */

function FloatingMonogram({
  mx,
  my,
  scrollRotate,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  scrollRotate: MotionValue<number>;
}) {
  const tiltX = useTransform(my, [-1, 1], [10, -10]);
  const tiltY = useTransform(mx, [-1, 1], [-14, 14]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
      className="relative"
      style={{ perspective: 1200 }}
    >
      {/* Ambient glow bed */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,164,117,0.35) 0%, rgba(201,164,117,0) 60%)",
          filter: "blur(30px)",
          transform: "scale(2.6)",
        }}
      />

      <motion.div
        style={{
          rotateX: tiltX,
          rotateY: useTransform(
            [tiltY, scrollRotate] as unknown as MotionValue<number>[],
            (arr) => (arr as unknown as number[])[0] + (arr as unknown as number[])[1]
          ),
          transformStyle: "preserve-3d",
        }}
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex size-[128px] items-center justify-center md:size-[148px]"
      >
        {/* Glass disc */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 210deg, rgba(255,240,220,0.35), rgba(120,100,80,0.15), rgba(255,240,220,0.4), rgba(60,50,40,0.2), rgba(255,240,220,0.35))",
            filter: "blur(0.3px)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.9), 0 10px 30px -10px rgba(201,164,117,0.35), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.4)",
          }}
        />
        {/* Inner ring */}
        <div
          className="absolute inset-[10px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,245,230,0.6) 0%, rgba(255,245,230,0) 40%), linear-gradient(160deg, #1a1512 0%, #0a0807 100%)",
            boxShadow:
              "inset 0 2px 6px rgba(255,240,220,0.15), inset 0 -8px 20px rgba(0,0,0,0.6)",
          }}
        />
        {/* Monogram */}
        <span
          className="relative z-10 select-none text-white"
          style={{
            ...serif,
            fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
            letterSpacing: "-0.04em",
            textShadow:
              "0 2px 12px rgba(201,164,117,0.55), 0 0 30px rgba(201,164,117,0.25)",
          }}
        >
          <span className="italic">A</span>
        </span>
        {/* Specular highlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(150deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 35%, rgba(255,255,255,0) 65%, rgba(255,255,255,0.08) 100%)",
            mixBlendMode: "screen",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────
   Magnetic CTA
   ──────────────────────────────────────────────────────────── */

function MagneticCta({
  children,
  href = "#packages",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 });
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = e.clientX - r.left - r.width / 2;
    const cy = e.clientY - r.top - r.height / 2;
    x.set(cx * 0.25);
    y.set(cy * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
    setHover(false);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.97 }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-9 py-5 text-[14px] uppercase tracking-[0.24em] text-white"
    >
      {/* Base pill */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.03) 55%, rgba(201,164,117,0.18) 100%)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(16px) saturate(140%)",
          boxShadow:
            "0 20px 60px -20px rgba(0,0,0,0.8), 0 8px 30px -10px rgba(201,164,117,0.25), inset 0 1px 0 rgba(255,255,255,0.25)",
          transition: "box-shadow .5s ease, transform .5s ease",
        }}
      />
      {/* Hover glow */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full"
        initial={false}
        animate={{ opacity: hover ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201,164,117,0.35), transparent 65%)",
          filter: "blur(14px)",
        }}
      />
      {/* Sheen */}
      <motion.span
        aria-hidden
        className="absolute inset-0 overflow-hidden rounded-full"
      >
        <motion.span
          className="absolute inset-y-0 -left-1/3 w-1/2"
          initial={{ x: "-120%" }}
          animate={{ x: hover ? "260%" : "-120%" }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{
            background:
              "linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
          }}
        />
      </motion.span>

      <span
        className="relative z-10"
        style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 }}
      >
        {children}
      </span>
      <motion.span
        className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/10"
        animate={{ x: hover ? 4 : 0, rotate: hover ? 45 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <ArrowUpRight className="size-3.5" />
      </motion.span>
    </motion.a>
  );
}

/* ────────────────────────────────────────────────────────────
   WordReveal
   ──────────────────────────────────────────────────────────── */

function WordReveal({
  children,
  delay,
  italic,
}: {
  children: string;
  delay: number;
  italic?: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] pr-[0.28em] align-baseline">
      <motion.span
        initial={{ y: "70%", opacity: 0, filter: "blur(14px)" }}
        whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.1, delay, ease: EASE }}
        className={`inline-block ${italic ? "italic" : ""}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ────────────────────────────────────────────────────────────
   ShowcaseCard — floating premium project window
   ──────────────────────────────────────────────────────────── */

function ShowcaseCard({
  work,
  offset,
  onSelect,
  mx,
  my,
}: {
  work: Work;
  offset: number;
  onSelect: () => void;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const active = offset === 0;
  const [hover, setHover] = useState(false);

  // Base 3D layout
  const x = offset * 340;
  const z = -Math.abs(offset) * 260;
  const rotateY = offset * -22;
  const yOffset = Math.abs(offset) * 18; // staggered heights

  // Cursor parallax (subtle drift, stronger on active)
  const parallaxX = useTransform(mx, [-1, 1], active ? [-18, 18] : [-8, 8]);
  const parallaxY = useTransform(my, [-1, 1], active ? [8, -8] : [3, -3]);

  // Local hover tilt
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);
  const shx = useSpring(hx, { stiffness: 160, damping: 18 });
  const shy = useSpring(hy, { stiffness: 160, damping: 18 });
  const tiltRX = useTransform(shy, [-1, 1], [8, -8]);
  const tiltRY = useTransform(shx, [-1, 1], [-10, 10]);

  const onCardMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    hx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    hy.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onCardLeave = () => {
    hx.set(0);
    hy.set(0);
    setHover(false);
  };

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      onMouseMove={onCardMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onCardLeave}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      animate={{
        x,
        z,
        rotateY,
        y: yOffset,
        scale: active ? 1 : 0.9,
        opacity: Math.abs(offset) >= 2 ? 0 : active ? 1 : 0.5,
      }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 22,
        mass: 0.95,
      }}
      style={{
        transformStyle: "preserve-3d",
        translateX: parallaxX,
        translateY: parallaxY,
        rotateX: active ? tiltRX : 0,
      }}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
      aria-label={`${work.client} — ${work.headline}`}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateY: active ? tiltRY : 0,
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 6 + Math.abs(offset),
          repeat: Infinity,
          ease: "easeInOut",
          delay: offset * 0.4,
        }}
      >
        {/* Ambient glow for active card */}
        {active && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-10 rounded-[44px]"
            animate={{ opacity: hover ? 0.9 : 0.55 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(201,164,117,0.35) 0%, rgba(201,164,117,0) 65%)",
              filter: "blur(30px)",
            }}
          />
        )}

        {/* Card body */}
        <div
          className="relative w-[clamp(320px,40vw,580px)] overflow-hidden rounded-[22px]"
          style={{
            aspectRatio: "16 / 11",
            background:
              "linear-gradient(180deg, rgba(24,20,18,0.9) 0%, rgba(14,12,11,0.95) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            backdropFilter: "blur(20px) saturate(140%)",
            boxShadow: active
              ? "0 60px 140px -30px rgba(0,0,0,0.95), 0 30px 70px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.12)"
              : "0 40px 100px -30px rgba(0,0,0,0.85), 0 20px 50px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
            filter: active ? "none" : "saturate(0.85) brightness(0.85)",
            transition: "filter .6s ease",
          }}
        >
          {/* Chrome */}
          <div
            className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.02] px-4 py-2.5"
            style={sans}
          >
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="size-2 rounded-full bg-white/15" />
            <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
              {work.url ?? work.client.toLowerCase()}
            </span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
              {work.sector}
            </span>
          </div>

          {/* Cover */}
          {work.cover ? (
            <div className="relative h-[calc(100%-2.6rem)] w-full overflow-hidden">
              <img
                src={work.cover}
                alt={`${work.client} — website preview`}
                className="h-full w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              {/* Tonal grade */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60" />
            </div>
          ) : (
            <div className="relative h-[calc(100%-2.6rem)] w-full overflow-hidden bg-gradient-to-br from-[#1a1614] via-[#0f0d0b] to-[#080706]">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "44px 44px",
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-end gap-3 p-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {work.sector}
                </span>
                <span
                  className="text-white/85"
                  style={{ ...serif, fontSize: "2rem", lineHeight: 1.05 }}
                >
                  {work.client}
                </span>
              </div>
              <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-gradient-to-br from-[#c9a475]/40 to-transparent blur-2xl" />
            </div>
          )}

          {/* Bottom info bar — reveals on hover */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5"
            initial={false}
            animate={{ opacity: hover && active ? 1 : 0.75 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60"
                style={sans}
              >
                {work.client}
              </div>
              <div
                className="mt-1 text-white"
                style={{
                  ...serif,
                  fontSize: "1.35rem",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                }}
              >
                {work.metric}{" "}
                <span
                  className="text-white/60"
                  style={{ ...sans, fontSize: "0.72rem" }}
                >
                  {work.metricLabel}
                </span>
              </div>
            </div>
            <motion.div
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur"
              animate={{ rotate: hover && active ? 45 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <ArrowUpRight className="size-4" />
            </motion.div>
          </motion.div>

          {/* Moving reflection sheen */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: offset * 1.4,
            }}
            style={{
              background:
                "linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.10) 50%, transparent 70%)",
            }}
          />

          {/* Edge lighting */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[22px]"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 40px 60px -50px rgba(255,255,255,0.35)",
            }}
          />
        </div>
      </motion.div>
    </motion.button>
  );
}
