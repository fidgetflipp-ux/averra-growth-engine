import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Eyebrow, Reveal } from "./primitives";
import scartec from "@/assets/scartec-hero.png.asset.json";
import yeon from "@/assets/yeon-ritual-hero.png.asset.json";

type Work = {
  client: string;
  sector: string;
  headline: string;
  metric: string;
  metricLabel: string;
  period: string;
  cover?: string;
  url?: string;
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
  },
  {
    client: "Northwind Capital",
    sector: "Private equity",
    headline: "Repositioned to match the AUM, and the inbound followed.",
    metric: "$84M",
    metricLabel: "Qualified inbound",
    period: "12 months",
    url: "northwind.capital",
  },
];

/** A single floating browser-style card, used by the 3D gallery. */
function GalleryCard({
  work,
  offset, // -1, 0, 1 (left/center/right of the active card)
  active,
  onSelect,
  parallax,
}: {
  work: Work;
  offset: number;
  active: boolean;
  onSelect: () => void;
  parallax: { x: any; y: any };
}) {
  // Lay the three cards out on an arc in 3D space.
  const x = offset * 320; // px from center
  const z = -Math.abs(offset) * 220; // depth recess for side cards
  const rotateY = offset * -22; // angle inward
  const opacity = active ? 1 : 0.55;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={false}
      animate={{ x, z, rotateY, opacity, scale: active ? 1 : 0.92 }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX: parallax.y,
        translateX: parallax.x,
      }}
      className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer outline-none"
      aria-label={`${work.client} — ${work.headline}`}
    >
      <div
        className="relative w-[clamp(320px,38vw,560px)] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0f12] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9),0_8px_32px_-16px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
        style={{ aspectRatio: "16 / 11" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 border-b border-white/8 bg-white/[0.03] px-4 py-2.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            {work.url ?? work.client.toLowerCase()}
          </span>
        </div>

        {/* Cover */}
        {work.cover ? (
          <img
            src={work.cover}
            alt={`${work.client} — website preview`}
            className="h-[calc(100%-2.6rem)] w-full object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="relative h-[calc(100%-2.6rem)] w-full overflow-hidden bg-gradient-to-br from-[#11141a] via-[#0c0f14] to-[#0a0d11]">
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
              <span className="font-serif text-4xl leading-tight text-white/85">
                {work.client}
              </span>
            </div>
            <div className="absolute right-8 top-8 h-20 w-20 rounded-full bg-gradient-to-br from-[var(--sage,#9bb39b)]/30 to-transparent blur-2xl" />
          </div>
        )}

        {/* Edge sheen */}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.08) 0%, transparent 25%, transparent 75%, rgba(255,255,255,0.04) 100%)",
          }}
        />
      </div>
    </motion.button>
  );
}

export function FeaturedWork() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Cursor parallax — extremely subtle so the gallery feels alive, not gimmicky.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.6 });
  const translateX = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = (e.clientX - rect.left) / rect.width;
      const cy = (e.clientY - rect.top) / rect.height;
      px.set(cx * 2 - 1);
      py.set(cy * 2 - 1);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [px, py]);

  // Slow auto-rotation through the gallery; pauses on hover.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || expanded) return;
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % works.length), 5200);
    return () => clearInterval(id);
  }, [paused, expanded]);

  // Close lightbox on Escape
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  // Section-level scroll: gently rotate the entire stage as the section passes.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const stageRotateY = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  const active = works[activeIdx];

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden py-32">
      {/* Ambient sage glow — sits behind the gallery, matches the dark canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, color-mix(in oklab, var(--sage, #9bb39b) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal><Eyebrow>Selected work</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Results that speak for <span className="text-serif-italic">themselves.</span>
          </h2>
        </Reveal>

        {/* 3D stage */}
        <div
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto mt-20 h-[clamp(380px,52vh,560px)] w-full"
          style={{ perspective: 1800 }}
        >
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d", rotateY: stageRotateY }}
          >
            {works.map((w, i) => {
              // signed shortest offset for a 3-card carousel
              let offset = i - activeIdx;
              if (offset > works.length / 2) offset -= works.length;
              if (offset < -works.length / 2) offset += works.length;
              return (
                <GalleryCard
                  key={w.client}
                  work={w}
                  offset={offset}
                  active={offset === 0}
                  onSelect={() => {
                    if (offset === 0) setExpanded(true);
                    else setActiveIdx(i);
                  }}
                  parallax={{ x: translateX, y: rotateX }}
                />
              );
            })}
          </motion.div>

          {/* Hint shown when hovering active card */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            Click to expand
          </div>

          {/* Reflective floor — anchors the cards in space without a literal shadow box. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-[-4%] mx-auto h-16 w-[70%] rounded-[50%] bg-black/70 blur-3xl"
          />
        </div>

        {/* Active work caption — swaps with each rotation */}
        <div className="mt-14 grid items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.div
              key={`${active.client}-meta`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 text-eyebrow text-white/55">
                <span>{active.sector}</span>
                <span className="h-px w-6 bg-white/20" />
                <span>{active.client}</span>
              </div>
              <h3 className="text-display mt-5 max-w-2xl text-[clamp(1.5rem,2.4vw,2.1rem)] text-white/92">
                {active.headline}
              </h3>
            </motion.div>
          </div>

          <motion.div
            key={`${active.client}-metric`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 md:justify-self-end"
          >
            <div className="flex items-end gap-8 border-t border-white/10 pt-6">
              <div>
                <div className="text-display text-5xl text-white/95">{active.metric}</div>
                <div className="mt-1.5 text-sm text-white/60">{active.metricLabel}</div>
                <div className="mt-0.5 text-xs text-white/40">{active.period}</div>
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
              className="group relative h-[2px] w-14 overflow-hidden rounded-full bg-white/12"
            >
              <motion.span
                initial={false}
                animate={{ scaleX: i === activeIdx ? 1 : 0 }}
                transition={{ duration: i === activeIdx && !paused ? 5.2 : 0.4, ease: "linear" }}
                className="absolute inset-0 origin-left bg-white/70"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
