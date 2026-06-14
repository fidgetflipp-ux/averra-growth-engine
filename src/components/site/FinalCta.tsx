import { CtaPrimary, Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-eyebrow">A senior team. A fixed price. A 14-day clock.</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mt-8 text-[clamp(2.25rem,6vw,5rem)]">
            Your next website is <span className="text-serif-italic">two weeks away.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-7 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            Reserve your slot in under two minutes. Begin production within 48 hours.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
            <a href="#work" className="text-sm font-medium text-ink-soft hover:text-ink">View recent work →</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
