import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#grader", label: "Grader" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 sm:top-6 z-50 -translate-x-1/2 w-[min(100%-1.5rem,68rem)]"
    >
      <div
        className={`flex items-center justify-between gap-4 rounded-full px-3 sm:px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass shadow-soft" : "bg-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2 sm:pl-3">
          <Logo />
          <span className="text-display text-lg tracking-tight">Averra</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-foreground text-background px-4 sm:px-5 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          Start a project
        </a>
      </div>
    </motion.header>
  );
}

function Logo() {
  return (
    <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg overflow-hidden">
      <span className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
      <span className="absolute inset-[2px] rounded-[6px] bg-background" />
      <span
        className="relative h-2.5 w-2.5 rounded-[2px]"
        style={{ background: "var(--gradient-brand)" }}
      />
    </span>
  );
}
