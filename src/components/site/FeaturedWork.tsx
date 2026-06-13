import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./primitives";

const projects = [
  {
    name: "Nordhall",
    sector: "Luxury furniture",
    headline: "Editorial commerce that tripled AOV.",
    metric: "+212%",
    metricLabel: "conversion rate",
    accent: "from-amber-200/20 to-rose-300/10",
  },
  {
    name: "Halcyon Labs",
    sector: "B2B SaaS",
    headline: "A homepage that closes itself.",
    metric: "0.6s",
    metricLabel: "largest contentful paint",
    accent: "from-cyan-300/20 to-indigo-400/10",
  },
  {
    name: "Maison Olé",
    sector: "DTC beauty",
    headline: "From bounce to belief in 6 seconds.",
    metric: "4.8×",
    metricLabel: "ROAS post-relaunch",
    accent: "from-fuchsia-300/20 to-violet-400/10",
  },
];

export function FeaturedWork() {
  return (
    <section id="work" className="relative py-28 sm:py-40 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Selected work
              </div>
              <h2 className="text-display text-4xl sm:text-6xl brand-gradient-text">
                Brands that grew up <span className="text-serif-italic" style={{ color: "var(--brand)" }}>online</span>.
              </h2>
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              View all case studies
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </Reveal>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <motion.a
      href="#contact"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block rounded-3xl hairline overflow-hidden bg-surface"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[420px]">
        {/* Left: meta */}
        <div className="lg:col-span-2 p-8 sm:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground font-mono">0{index + 1} / {String(projects.length).padStart(2, "0")}</div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{project.sector}</div>
          </div>
          <div>
            <div className="text-display text-3xl sm:text-4xl mb-4">{project.name}</div>
            <h3 className="text-xl sm:text-2xl text-muted-foreground leading-snug max-w-md">
              {project.headline}
            </h3>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-display text-4xl sm:text-5xl" style={{ color: "var(--brand)" }}>
                {project.metric}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{project.metricLabel}</div>
            </div>
            <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </div>

        {/* Right: visual */}
        <div className="lg:col-span-3 relative overflow-hidden border-t lg:border-t-0 lg:border-l border-border min-h-[260px]">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.accent}`} />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, color-mix(in oklab, var(--brand) 25%, transparent), transparent 60%)",
            }}
          />
          <MockUI variant={index} />
        </div>
      </div>
    </motion.a>
  );
}

function MockUI({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <div className="absolute inset-8 sm:inset-14 rounded-2xl bg-background/40 backdrop-blur-sm hairline overflow-hidden">
        <div className="grid grid-cols-3 h-full">
          {[0, 1, 2].map((i) => (
            <div key={i} className="border-r border-border last:border-r-0 p-4 flex flex-col gap-2">
              <div className="aspect-[3/4] rounded-lg bg-white/5" />
              <div className="h-2 w-3/4 rounded-full bg-white/10" />
              <div className="h-2 w-1/2 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="absolute inset-8 sm:inset-14 rounded-2xl bg-background/40 backdrop-blur-sm hairline p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full" style={{ background: "var(--brand)" }} />
          <div className="h-2 w-24 rounded-full bg-white/15" />
        </div>
        <div className="h-3 w-3/4 rounded-full bg-white/15" />
        <div className="h-3 w-1/2 rounded-full bg-white/10" />
        <div className="mt-auto h-32 rounded-xl bg-white/5 relative overflow-hidden">
          <svg viewBox="0 0 200 60" className="absolute inset-0 h-full w-full">
            <path d="M0,40 Q40,10 80,25 T160,15 L200,5" stroke="var(--brand)" strokeWidth="1.5" fill="none" />
            <path d="M0,40 Q40,10 80,25 T160,15 L200,5 L200,60 L0,60 Z" fill="url(#grad)" opacity="0.4" />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <div className="relative w-44 sm:w-56 aspect-[9/19] rounded-[2rem] hairline bg-background/60 backdrop-blur-sm p-3 shadow-soft">
        <div className="h-full w-full rounded-[1.5rem] bg-gradient-to-b from-white/5 to-transparent overflow-hidden p-3 flex flex-col gap-2">
          <div className="h-2 w-12 rounded-full bg-white/20 mx-auto mb-2" />
          <div className="aspect-square rounded-xl bg-white/10" />
          <div className="h-2 w-3/4 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="mt-auto h-9 rounded-full" style={{ background: "var(--brand)" }} />
        </div>
      </div>
    </div>
  );
}
