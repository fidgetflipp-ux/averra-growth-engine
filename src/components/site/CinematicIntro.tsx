import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { FRAMES } from "@/assets/frames/manifest";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = FRAMES.length; // 361
const EAGER_COUNT = 24;            // awaited before first paint
const BG = "#ffffff";              // matches site background, prevents flash

/**
 * Fullscreen scroll-scrubbed canvas image sequence.
 * - Pinned via a tall spacer + position:fixed canvas (no layout shift).
 * - Frame index is driven by ScrollTrigger.scrub for 1:1 sync.
 * - At the tail (~last 12%) canvas fades out and the existing Hero below
 *   is faded in concurrently so the handoff is imperceptible.
 */
export function CinematicIntro() {
  const spacerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const stride = isMobile ? 2 : 1;
    const usedFrames = FRAMES.filter((_, i) => i % stride === 0);
    const totalUsed = usedFrames.length;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;
    const images: (HTMLImageElement | null)[] = new Array(totalUsed).fill(null);
    const loadState: ("idle" | "loading" | "done" | "error")[] = new Array(totalUsed).fill("idle");
    const currentRef = { i: 0, drawn: -1 };

    // ---- sizing (HiDPI, cover math) ----
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      // re-draw current
      currentRef.drawn = -1;
      draw();
    }

    function drawImage(img: HTMLImageElement) {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, cw, ch);
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      if (!iw || !ih) return;
      // cover
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function draw() {
      const idx = currentRef.i;
      if (idx === currentRef.drawn) return;
      // find nearest loaded frame ≤ idx, fall back forward
      let useIdx = idx;
      if (!images[useIdx]) {
        for (let k = idx - 1; k >= 0; k--) {
          if (images[k]) { useIdx = k; break; }
        }
        if (!images[useIdx]) {
          for (let k = idx + 1; k < totalUsed; k++) {
            if (images[k]) { useIdx = k; break; }
          }
        }
      }
      const img = images[useIdx];
      if (img) {
        drawImage(img);
        currentRef.drawn = idx;
      }
    }

    function loadFrame(i: number): Promise<void> {
      if (loadState[i] !== "idle") return Promise.resolve();
      loadState[i] = "loading";
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => {
          // try decode for smoother first paint
          const done = () => {
            images[i] = img;
            loadState[i] = "done";
            // if this is the visible frame, draw it
            if (i === currentRef.i) {
              currentRef.drawn = -1;
              draw();
            }
            resolve();
          };
          if (img.decode) img.decode().then(done).catch(done);
          else done();
        };
        img.onerror = () => {
          loadState[i] = "error";
          resolve();
        };
        img.src = usedFrames[i];
      });
    }

    // ---- progressive loader ----
    let cancelled = false;
    async function progressiveLoad() {
      // eager first batch
      const eager = Math.min(EAGER_COUNT, totalUsed);
      await Promise.all(
        Array.from({ length: eager }, (_, i) => loadFrame(i))
      );
      if (cancelled) return;
      draw();

      // background fill remaining with concurrency limit, prioritising
      // proximity to current frame
      const CONC = 6;
      let inflight = 0;
      const tryFill = () => {
        if (cancelled) return;
        while (inflight < CONC) {
          // find nearest idle frame to current
          let pick = -1;
          let best = Infinity;
          for (let i = 0; i < totalUsed; i++) {
            if (loadState[i] !== "idle") continue;
            const d = Math.abs(i - currentRef.i);
            if (d < best) { best = d; pick = i; }
          }
          if (pick === -1) return;
          inflight++;
          loadFrame(pick).finally(() => {
            inflight--;
            tryFill();
          });
        }
      };
      tryFill();
    }

    // ---- Lenis ----
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // ---- RAF draw loop (cheap; only redraws on index change) ----
    let rafId = 0;
    const loop = () => {
      draw();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    // ---- visibility pause ----
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        rafId = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    // ---- initial sizing ----
    resize();
    window.addEventListener("resize", resize);

    // ---- reduced motion: skip the sequence ----
    if (prefersReduced) {
      // load only the last frame and fade canvas immediately
      loadFrame(totalUsed - 1).then(() => {
        currentRef.i = totalUsed - 1;
        currentRef.drawn = -1;
        draw();
        gsap.to(wrapRef.current, { autoAlpha: 0, duration: 0.6, delay: 0.4 });
      });
      // collapse spacer so the page doesn't have phantom scroll
      if (spacerRef.current) spacerRef.current.style.height = "0";
      return () => {
        cancelled = true;
        cancelAnimationFrame(rafId);
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("resize", resize);
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    }

    progressiveLoad();

    // ---- Continuous transition: hero lives BEHIND the canvas during the
    //      cinematic, then is released into the page when we leave the pin.
    const heroEl = document.getElementById("hero-anchor");
    const navEl = document.querySelector<HTMLElement>("header,[data-site-nav]");

    // Collect staged elements for the reveal sequence
    const stageEls: HTMLElement[][] = [];
    if (heroEl) {
      for (let s = 1; s <= 6; s++) {
        const nodes = Array.from(
          heroEl.querySelectorAll<HTMLElement>(`[data-hero-stage="${s}"]`)
        );
        stageEls.push(nodes);
      }
    }
    const allStaged = stageEls.flat();

    // Initial hidden state for staged elements (subtle, no overshoot)
    if (allStaged.length) {
      gsap.set(allStaged, { autoAlpha: 0, y: 20 });
    }

    // Park hero fullscreen behind canvas so the reveal happens IN PLACE.
    const fixHero = () => {
      if (!heroEl) return;
      heroEl.style.position = "fixed";
      heroEl.style.inset = "0";
      heroEl.style.zIndex = "40";
      heroEl.style.overflow = "hidden";
    };
    const unfixHero = () => {
      if (!heroEl) return;
      heroEl.style.position = "";
      heroEl.style.inset = "";
      heroEl.style.zIndex = "";
      heroEl.style.overflow = "";
    };
    fixHero();

    // Nav appears first — keep it hidden until the reveal begins.
    if (navEl) gsap.set(navEl, { autoAlpha: 0, y: -8 });

    let revealTl: gsap.core.Timeline | null = null;
    const buildRevealTimeline = () => {
      const tl = gsap.timeline({ paused: true });
      // Nav first
      if (navEl) {
        tl.to(navEl, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 0);
      }
      // Then stages 1..6, very small stagger, restrained easing
      stageEls.forEach((nodes, i) => {
        if (!nodes.length) return;
        tl.to(
          nodes,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.05,
          },
          0.12 + i * 0.09
        );
      });
      return tl;
    };

    const st = ScrollTrigger.create({
      trigger: spacerRef.current!,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
      onUpdate: (self) => {
        const p = self.progress;
        const idx = Math.min(totalUsed - 1, Math.round(p * (totalUsed - 1)));
        currentRef.i = idx;

        // Reveal window: final 15% of the pin
        const r = gsap.utils.clamp(0, 1, (p - 0.85) / 0.15);

        // Canvas fades from 1 → 0 across the reveal window
        if (wrapRef.current) {
          // Ease the fade so the world dissolves rather than wipes
          const eased = r * r * (3 - 2 * r); // smoothstep
          gsap.set(wrapRef.current, { autoAlpha: 1 - eased });
        }

        // Drive the reveal timeline by the same progress
        if (!revealTl) revealTl = buildRevealTimeline();
        revealTl.progress(r);
      },
      onLeave: () => {
        // Release hero into the page; scroll position equals top of hero's
        // natural flow position, so no jump.
        unfixHero();
        if (wrapRef.current) gsap.set(wrapRef.current, { autoAlpha: 0, pointerEvents: "none" });
      },
      onEnterBack: () => {
        // Re-park hero behind the canvas for the scrub
        fixHero();
        if (wrapRef.current) gsap.set(wrapRef.current, { autoAlpha: 1, pointerEvents: "none" });
      },
    });

    // Subtle ambient drift on the canvas while it's visible — keeps the
    // world feeling alive even when the user pauses.
    const ambient = gsap.to(wrapRef.current, {
      backgroundPositionY: "+=6",
      x: 0,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
      st.kill();
      ambient.kill();
      revealTl?.kill();
      gsap.ticker.remove(raf);
      lenis.destroy();
      unfixHero();
      if (navEl) gsap.set(navEl, { clearProps: "all" });
      if (allStaged.length) gsap.set(allStaged, { clearProps: "all" });
    };
  }, []);


  return (
    <>
      {/* Fixed full-screen canvas — sits above content during the scrub */}
      <div
        ref={wrapRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60]"
        style={{ background: BG, willChange: "opacity, transform" }}
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      {/* Tall spacer that owns the scroll distance */}
      <div ref={spacerRef} className="relative" style={{ height: "500vh" }} />
    </>
  );
}
