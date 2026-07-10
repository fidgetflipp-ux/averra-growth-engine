import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Reveal } from "./primitives";
import corridor from "@/assets/future-corridor.jpg.asset.json";
import sitePreview from "@/assets/scartec-hero.png.asset.json";

/**
 * FutureState — an environment, not a mockup.
 *
 * A cathedral-ivory corridor recedes into a warm vanishing point. A single
 * glass frame floats at its center, holding a live preview of the site.
 * The environment tells the story: this is where the work belongs.
 */
export function FutureState() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });

  // Camera dolly: corridor drifts back, frame lifts and clarifies.
  const bgY = useTransform(p, [0, 1], ["-4%", "6%"]);
  const bgScale = useTransform(p, [0, 1], [1.06, 1.14]);
  const frameY = useTransform(p, [0, 0.5, 1], ["6%", "0%", "-4%"]);
  const frameScale = useTransform(p, [0, 0.5, 1], [0.96, 1, 1.02]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.25, 0.5, 0.35]);

  return (
    <section
      ref={ref}
      aria-label="Future State"
      className="relative bg-[#F7F6F2] hairline-t hairline-b"
    >
      <div className="mx-auto max-w-[1480px] px-6 pt-40 md:pt-56">
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
          <h2 className="text-display mx-auto mt-10 max-w-[20ch] text-center text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.02] tracking-[-0.025em]">
            Become the company competitors benchmark themselves{" "}
            <span className="text-serif-italic">against.</span>
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.18}>
          <div className="mx-auto mt-12 max-w-[58ch] text-center text-[17px] leading-[1.7] text-ink-soft">
            <p>
              Most companies grow faster than perception. The companies that
              dominate categories understand something earlier: how they are
              perceived determines who trusts them, hires them, invests in
              them, and competes with them.
            </p>
            <p className="mt-6 text-ink">
              A world-class digital presence changes that.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Environment stage */}
      <div className="relative mt-24 md:mt-32">
        <div className="relative mx-auto h-[92vh] max-h-[900px] min-h-[620px] w-full overflow-hidden">
          {/* Corridor backdrop */}
          <motion.div
            aria-hidden
            style={{ y: bgY, scale: bgScale }}
            className="absolute inset-0 will-change-transform"
          >
            <img
              src={corridor.url}
              alt=""
              loading="lazy"
              width={1920}
              height={1088}
              className="h-full w-full object-cover"
            />
            {/* Warm ivory blends into the page above and below */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#F7F6F2] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#F7F6F2] to-transparent" />
            {/* Vignette to focus attention on the frame */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 52%, transparent 40%, rgba(30,24,16,0.18) 100%)",
              }}
            />
          </motion.div>

          {/* Warm halo behind the frame — the corridor's light */}
          <motion.div
            aria-hidden
            style={{ opacity: glowOpacity }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[55%] -translate-x-1/2 -translate-y-1/2"
          >
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255,232,190,0.55), rgba(255,232,190,0) 65%)",
                filter: "blur(20px)",
              }}
            />
          </motion.div>

          {/* Floating glass frame */}
          <motion.div
            style={{ y: frameY, scale: frameScale }}
            className="absolute left-1/2 top-1/2 w-[min(78vw,1180px)] -translate-x-1/2 -translate-y-1/2 will-change-transform"
          >
            <FloatingFrame />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FloatingFrame() {
  return (
    <div className="relative">
      {/* Cast shadow on the corridor floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -bottom-10 h-16 w-[82%] -translate-x-1/2 rounded-[50%] bg-black/35 blur-3xl"
      />

      {/* Glass card */}
      <div
        className="relative overflow-hidden rounded-[22px] border border-white/40 bg-white/10 backdrop-blur-[2px]"
        style={{
          boxShadow:
            "0 60px 140px -40px rgba(30,24,16,0.55), 0 20px 50px -20px rgba(30,24,16,0.35), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Browser chrome — restrained, editorial */}
        <div className="flex items-center gap-2 border-b border-black/5 bg-white/70 px-4 py-3 backdrop-blur">
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-black/15" />
          <div className="ml-4 h-5 flex-1 rounded-full bg-black/[0.04] px-3 text-[11px] leading-5 tracking-wide text-ink-muted">
            averra.studio
          </div>
        </div>

        {/* Site preview */}
        <div className="relative">
          <img
            src={sitePreview.url}
            alt="A live preview of the Averra website, framed inside an architectural corridor."
            loading="lazy"
            className="block aspect-[16/10] h-auto w-full object-cover"
          />
          {/* Glass sheen — one long diagonal highlight */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 28%, rgba(255,255,255,0) 72%, rgba(255,255,255,0.08) 100%)",
            }}
          />
          {/* Inner ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/20"
          />
        </div>
      </div>

      {/* Caption — quiet, gallery-plaque tone */}
      <div className="mt-8 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.24em] text-ink-muted">
        <span className="h-px w-6 bg-ink-muted/40" />
        <span>The room your brand walks into</span>
        <span className="h-px w-6 bg-ink-muted/40" />
      </div>
    </div>
  );
}
