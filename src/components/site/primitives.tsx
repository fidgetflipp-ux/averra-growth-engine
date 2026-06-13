import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";

export function Reveal({ children, delay = 0, y = 24 }: { children: ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  onClick,
  className = "",
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.25);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "glass text-foreground hover:bg-surface-elevated/80";

  const Inner = (
    <motion.span style={{ x: sx, y: sy }} className={`${base} ${styles} ${className}`}>
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="inline-block"
      >
        {Inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="inline-block"
      type="button"
    >
      {Inner}
    </button>
  );
}

export function CountUp({ to, suffix = "", duration = 2 }: { to: number; suffix?: string; duration?: number }) {
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
  const formatted = to >= 100 ? Math.round(val).toLocaleString() : val.toFixed(1);
  return <span ref={ref}>{formatted}{suffix}</span>;
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  function handleMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }
  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: -300, y: -300 })}
      className={`group relative overflow-hidden rounded-3xl hairline bg-surface ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--brand) 22%, transparent), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

export function ParallaxY({ children, range = 80 }: { children: ReactNode; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}
