import { CtaPrimary } from "./primitives";
import { BlurRise, Parallax, StaggerWords, Magnetic } from "./ScrollFx";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Ambient parallax orb */}
      <Parallax amount={80} className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="h-[520px] w-[520px] rounded-full bg-gradient-to-br from-brand/15 via-brand/5 to-transparent blur-3xl" />
      </Parallax>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <BlurRise>
          <p className="text-eyebrow">A senior team. A fixed price. A 14-day clock.</p>
        </BlurRise>

        <h2 className="text-display mt-8 text-[clamp(2.25rem,6vw,5rem)]">
          <StaggerWords text="Your next website is" />{" "}
          <span className="text-serif-italic">
            <StaggerWords text="two weeks away." delay={0.15} />
          </span>
        </h2>

        <BlurRise delay={0.35}>
          <p className="mx-auto mt-7 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            Reserve your slot in under two minutes. Begin production within 48 hours.
          </p>
        </BlurRise>

        <BlurRise delay={0.5}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Magnetic strength={0.2}>
              <CtaPrimary href="#packages" size="lg">Start your website</CtaPrimary>
            </Magnetic>
            <a href="#work" className="text-sm font-medium text-ink-soft transition-colors hover:text-ink">
              View recent work →
            </a>
          </div>
        </BlurRise>
      </div>
    </section>
  );
}
