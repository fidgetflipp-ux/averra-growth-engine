import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({ children, delay = 0, y = 20 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = "", prefix = "", duration = 1.8, decimals = 0 }: { to: number; suffix?: string; prefix?: string; duration?: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  const formatted = decimals === 0 ? Math.round(val).toLocaleString() : val.toFixed(decimals);
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-surface px-3.5 py-1.5 text-xs font-medium tracking-wide text-ink-soft uppercase">
      <span className="size-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function CtaPrimary({ children, href = "#audit", className = "" }: { children: ReactNode; href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-20px_oklch(0.16_0.01_260/0.45)] ${className}`}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function CtaLight({ children, href = "#audit", className = "" }: { children: ReactNode; href?: string; className?: string }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 ${className}`}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
      {children}
    </p>
  );
}
