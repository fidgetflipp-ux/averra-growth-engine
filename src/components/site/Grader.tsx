import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { gradeWebsite } from "@/lib/grader.functions";
import { Eyebrow, Reveal } from "./primitives";

type Result = Awaited<ReturnType<typeof gradeWebsite>>;

export function Grader() {
  const grade = useServerFn(gradeWebsite);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await grade({ data: { url } });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="audit" className="py-28">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal><Eyebrow>Free 60-second audit</Eyebrow></Reveal>
        <Reveal delay={0.08}>
          <h2 className="text-display mx-auto mt-5 max-w-3xl text-center text-[clamp(2rem,4.5vw,3.25rem)] headline-fade">
            See what's holding your site back from converting.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-5 max-w-xl text-center text-ink-soft">
            Drop in your URL. We score performance, trust, design, and conversion
            — and tell you exactly where to focus first.
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-10 flex max-w-2xl items-center gap-2 rounded-full border border-foreground/10 bg-white p-2 shadow-card"
          >
            <input
              type="url"
              required
              placeholder="https://yourcompany.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-[15px] text-ink placeholder:text-ink-soft/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Auditing…" : "Run free audit"}
            </button>
          </form>
        </Reveal>

        {error && (
          <p className="mt-6 text-center text-sm text-destructive">{error}</p>
        )}

        {result && (
          <Reveal>
            <div className="mt-10 rounded-2xl border border-foreground/8 bg-white p-8 shadow-card">
              <div className="flex flex-col items-center gap-3 border-b border-foreground/8 pb-8 text-center">
                <span className="text-xs font-mono uppercase tracking-widest text-ink-soft">Overall score</span>
                <div className="text-display text-7xl text-ink">{result.overall}<span className="text-ink-soft text-3xl">/100</span></div>
              </div>
              <div className="mt-8 grid gap-6 md:grid-cols-4">
                {(Object.entries(result.scores) as [string, number][]).map(([name, score]) => (
                  <div key={name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-ink capitalize">{name}</span>
                      <span className="font-mono text-ink-soft">{score}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/8">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              {result.notes.length > 0 && (
                <ul className="mt-8 space-y-2 border-t border-foreground/8 pt-6 text-sm text-ink-soft">
                  {result.notes.slice(0, 5).map((n, i) => (
                    <li key={i} className="flex gap-2"><span className="text-brand">→</span>{n}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
