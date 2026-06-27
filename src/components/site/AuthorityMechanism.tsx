import { Reveal } from "./primitives";

const statements = [
  "Trust is established before conversations begin.",
  "Credibility shortens sales cycles.",
  "Perception increases pricing power.",
  "Exceptional companies attract exceptional people.",
  "Momentum compounds.",
  "Eventually markets stop comparing you to competitors.",
  "Competitors compare themselves to you.",
];

/**
 * AuthorityMechanism — pure-typography editorial thesis.
 * Answers exactly one question: why does presentation matter?
 * No cards, icons, images, gradients, or shadows. Type and whitespace only.
 */
export function AuthorityMechanism() {
  return (
    <section
      aria-label="How authority is built"
      className="relative flex min-h-screen flex-col items-center justify-center bg-surface hairline-t hairline-b"
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center px-6 py-40 md:py-56">
        {/* Opening eyebrow */}
        <Reveal>
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-ink-muted">
              How authority is built
            </span>
            <span className="h-px w-10 bg-foreground/20" />
          </div>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h2 className="text-display mt-16 max-w-[24ch] text-center text-[clamp(2rem,3.4vw,2.6rem)] leading-[1.15] tracking-[-0.02em]">
            Companies do not dominate markets because they are larger. They
            dominate because they are{" "}
            <span className="text-serif-italic">perceived differently.</span>
          </h2>
        </Reveal>

        {/* Body statements */}
        <div className="mt-56 flex w-full max-w-[900px] flex-col items-center gap-10 text-center">
          {statements.map((line, i) => {
            const isFinal = i === statements.length - 1;
            return (
              <Reveal key={line} delay={i * 0.14} y={12}>
                <p
                  className={`font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.4] tracking-[-0.015em] ${
                    isFinal ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {line}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Final statement */}
        <Reveal delay={0.2} y={12}>
          <p className="mt-40 max-w-[60ch] text-center text-[18px] leading-[1.6] text-ink">
            A world-class digital presence accelerates that process.
          </p>
        </Reveal>

        {/* Bridge eyebrow into next section */}
        <Reveal delay={0.3}>
          <div className="mt-32 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-foreground/20" />
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-ink-muted">
              How we build authority
            </span>
            <span className="h-px w-10 bg-foreground/20" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
