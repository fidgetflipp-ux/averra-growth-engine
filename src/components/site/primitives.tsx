import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2.5">
      <span className="h-px w-6 bg-foreground/20" />
      <span className="text-eyebrow">{children}</span>
      <span className="h-px w-6 bg-foreground/20" />
    </div>
  );
}

const arrow = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
    <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function CtaPrimary({
  children,
  href = "#start",
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-sm";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full bg-ink ${pad} font-medium text-white transition-all duration-300 hover:bg-ink/90 hover:shadow-lift`}
    >
      {children}
      {arrow}
    </a>
  );
}

export function CtaGhost({
  children,
  href = "#work",
  size = "md",
}: {
  children: ReactNode;
  href?: string;
  size?: "md" | "lg";
}) {
  const pad = size === "lg" ? "px-7 py-4 text-[15px]" : "px-5 py-3 text-sm";
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-white ${pad} font-medium text-ink transition-all duration-300 hover:border-foreground/25`}
    >
      {children}
      {arrow}
    </a>
  );
}
