import { CtaLight, Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink p-12 text-white md:p-20">
            <div className="absolute inset-0 bg-dotgrid opacity-60" />
            <div
              className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-50"
              style={{
                background:
                  "radial-gradient(closest-side, color-mix(in oklab, var(--brand) 35%, transparent), transparent)",
              }}
            />
            <div className="relative max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-white/60">Let's talk growth</p>
              <h2 className="text-display mt-5 text-[clamp(2rem,5vw,4rem)] headline-fade-light">
                Fix what's holding your brand from scaling.
              </h2>
              <p className="mt-5 max-w-lg text-white/70">
                Book a 30-minute call. We'll audit your site live and walk away
                with three high-leverage moves — no pitch, no obligation.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaLight>Book your strategy call</CtaLight>
                <a href="#work" className="inline-flex items-center gap-2 self-center text-sm font-medium text-white/70 hover:text-white">
                  Or see recent results →
                </a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-white/50">
                <span>★ 4.9 / 5 client satisfaction</span>
                <span>• Avg response &lt; 4 hours</span>
                <span>• NDA-friendly</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
