import { useEffect, useState } from "react";
import { CtaPrimary } from "./primitives";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Results", href: "#results" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-foreground/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md bg-ink">
            <span className="size-2.5 rounded-sm bg-brand" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-ink">Averra</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <span className="hidden sm:inline-flex">
          <CtaPrimary>Get your free audit</CtaPrimary>
        </span>
        <a
          href="#audit"
          className="inline-flex sm:hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-medium text-white shadow-soft"
        >
          Free audit
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </header>
  );
}
