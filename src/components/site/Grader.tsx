import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader2, Sparkles } from "lucide-react";
import { Reveal } from "./primitives";
import { gradeWebsite } from "@/lib/grader.functions";

type Result = Awaited<ReturnType<typeof gradeWebsite>>;

const categoryLabels: Array<{ key: keyof Result["scores"]; label: string; desc: string }> = [
  { key: "design", label: "Design", desc: "Visual polish, hierarchy, semantic markup" },
  { key: "trust", label: "Trust", desc: "HTTPS, metadata, social signals, contact" },
  { key: "performance", label: "Performance", desc: "Page weight, render path, compression" },
  { key: "conversion", label: "Conversion", desc: "Clear CTAs, forms, above-fold density" },
];

export function Grader() {
  const grade = useServerFn(gradeWebsite);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const r = await grade({ data: { url } });
      setResult(r);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not grade that site. Try another URL.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="grader" className="relative py-28 sm:py-40 border-t border-border">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full hairline glass px-3.5 py-1.5 text-xs text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--brand)" }} />
              Free instant audit
            </div>
            <h2 className="text-display text-4xl sm:text-6xl brand-gradient-text">
              Grade your <span className="text-serif-italic" style={{ color: "var(--brand)" }}>website</span> in seconds.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg">
              Paste a URL. We'll score it on design, trust, performance, and conversion — and tell you exactly what's costing you revenue.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative overflow-hidden rounded-3xl hairline p-6 sm:p-10"
            style={{
              background:
                "radial-gradient(ellipse at top, color-mix(in oklab, var(--brand) 12%, transparent), transparent 55%), var(--surface)",
            }}
          >
            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://yourbrand.com"
                className="flex-1 rounded-full hairline bg-background/60 px-6 py-4 text-base outline-none focus:ring-2 focus:ring-ring/40 placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" />}
                {loading ? "Auditing…" : "Grade my site"}
              </button>
            </form>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Overall score</div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-display text-6xl sm:text-7xl" style={{ color: "var(--brand)" }}>
                        {result.overall}
                      </span>
                      <span className="text-muted-foreground text-xl">/ 100</span>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground font-mono">{result.url}</div>
                  </div>
                  <a
                    href="#contact"
                    className="rounded-full bg-foreground text-background px-5 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors inline-flex items-center gap-2"
                  >
                    Get the full report <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categoryLabels.map((c) => (
                    <ScoreBar key={c.key} label={c.label} desc={c.desc} score={result.scores[c.key]} />
                  ))}
                </div>

                {result.notes.length > 0 && (
                  <div className="mt-8 rounded-2xl hairline bg-background/40 p-5">
                    <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Top findings</div>
                    <ul className="space-y-2 text-sm">
                      {result.notes.slice(0, 5).map((n, i) => (
                        <li key={i} className="flex gap-3 text-muted-foreground">
                          <span style={{ color: "var(--brand)" }}>—</span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ScoreBar({ label, desc, score }: { label: string; desc: string; score: number }) {
  return (
    <div className="rounded-2xl hairline bg-background/40 p-5">
      <div className="flex items-baseline justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-display text-2xl" style={{ color: "var(--brand)" }}>{score}</div>
      </div>
      <div className="text-xs text-muted-foreground mb-3">{desc}</div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-brand)" }}
        />
      </div>
    </div>
  );
}
