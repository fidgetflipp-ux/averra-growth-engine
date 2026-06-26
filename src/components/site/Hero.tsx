import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { CtaPrimary, CtaGhost, Reveal } from "./primitives";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Background — slow drift + gentle fade as the visitor descends
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.55, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Signature object — drifts forward and slightly down as you scroll,
  // suggesting it carries you into the next section.
  const objY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const objScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const objOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.7, 0]);

  // Cursor parallax — extremely subtle
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const objTiltX = useTransform(sy, [-1, 1], [4, -4]);
  const objTiltY = useTransform(sx, [-1, 1], [-6, 6]);
  const objShiftX = useTransform(sx, [-1, 1], [-10, 10]);
  const objShiftY = useTransform(sy, [-1, 1], [-8, 8]);

  const ambientX = useTransform(sx, [-1, 1], [-14, 14]);
  const ambientY = useTransform(sy, [-1, 1], [-10, 10]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(Math.max(-1, Math.min(1, nx)));
      my.set(Math.max(-1, Math.min(1, ny)));
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-40 pb-40 min-h-[100vh]"
    >
      {/* Cinematic background video */}
      <motion.div
        aria-hidden
        style={{ y: videoY, opacity: videoOpacity, scale: videoScale }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <video
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Ambient light + readability — subtle, never freezes */}
      <motion.div
        aria-hidden
        style={{ x: ambientX, y: ambientY }}
        className="pointer-events-none absolute -inset-[10%] z-[1]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_38%,transparent_0%,oklch(from_var(--background)_l_c_h_/_0.35)_75%,transparent_100%)]" />
      </motion.div>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-transparent to-background" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto mb-14 flex w-fit items-center gap-2.5 rounded-full hairline bg-white/70 px-3.5 py-1.5 text-xs font-medium text-ink-soft backdrop-blur-md">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
            </span>
            <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-ink">
              3 slots open · Q1 production
            </span>
          </div>
        </Reveal>

        {/* Headline — the architecture of the page */}
        <h1 className="text-display relative z-10 mx-auto max-w-[16ch] text-center text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] tracking-[-0.02em]">
          <Reveal>
            <span className="block">Premium websites,</span>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="block">
              delivered in <span className="text-serif-italic">days</span>.
            </span>
          </Reveal>
        </h1>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-[32ch] text-center text-[15px] leading-[1.6] text-ink-muted">
            A senior studio shipping conversion-grade sites in 7–14 days.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
            <CtaGhost href="#work" size="lg">See recent work</CtaGhost>
          </div>
        </Reveal>

        {/* The single interactive object — visual signature of the hero */}
        <motion.div
          style={{
            y: objY,
            scale: objScale,
            opacity: objOpacity,
          }}
          className="relative z-10 mx-auto mt-28 flex justify-center [perspective:1400px]"
          aria-hidden
        >
          <motion.div
            style={{
              rotateX: objTiltX,
              rotateY: objTiltY,
              x: objShiftX,
              y: objShiftY,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative [transform-style:preserve-3d]"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Glass slab — the artifact */}
              <div
                className="relative h-[260px] w-[440px] rounded-[28px] border border-white/40 bg-white/55 backdrop-blur-2xl shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25),0_8px_24px_-12px_rgba(15,23,42,0.12)] overflow-hidden"
              >
                {/* inner light wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/20 to-transparent" />
                {/* moving reflection */}
                <motion.div
                  style={{ x: useTransform(sx, [-1, 1], [-40, 40]) }}
                  className="absolute -inset-y-10 left-1/3 w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/55 to-transparent blur-2xl"
                />
                {/* hairline grid */}
                <div
                  className="absolute inset-0 opacity-[0.18]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                    maskImage:
                      "radial-gradient(ellipse at center, black 40%, transparent 75%)",
                  }}
                />

                {/* minimal interior */}
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                      Averra / Build 026
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] text-ink-muted">
                      <span className="size-1 rounded-full bg-brand" />
                      live
                    </span>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-muted mb-2">
                      Shipping
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[44px] font-semibold leading-none tracking-tight text-ink tabular-nums">
                        09
                      </span>
                      <span className="text-[13px] text-ink-soft">days to launch</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative h-px flex-1 bg-foreground/10 overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-brand to-transparent"
                      />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                      in progress
                    </span>
                  </div>
                </div>
              </div>

              {/* soft floor shadow */}
              <div className="absolute left-1/2 top-full mt-4 h-10 w-[78%] -translate-x-1/2 rounded-[50%] bg-foreground/15 blur-2xl" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
