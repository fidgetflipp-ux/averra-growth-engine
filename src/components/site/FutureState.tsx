import { Reveal } from "./primitives";

/**
 * FutureState — editorial spread, "Warm Offset Block" direction.
 *
 * Playfair Display headline, Lato support, warm ivory paper with a soft
 * offset block behind the body copy. Original copy preserved verbatim.
 */
export function FutureState() {
  const playfair = { fontFamily: "'Playfair Display', serif" };
  const lato = { fontFamily: "'Lato', sans-serif" };

  return (
    <section
      aria-label="Future State"
      className="relative overflow-hidden bg-[#F7F6F2] hairline-t hairline-b"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 px-6 py-32 md:grid-cols-12 md:px-12 md:py-40 lg:px-24">
        {/* Editorial folio detail (left rail) */}
        <div className="hidden flex-col items-center pt-4 md:col-span-1 md:flex">
          <div className="h-32 w-px bg-[#7FB98A]" />
          <span
            className="mt-8 text-[10px] font-light uppercase tracking-[0.4em] text-[#1a1a1a] [writing-mode:vertical-rl]"
            style={lato}
          >
            Ref. Volume III / MMXXVI
          </span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-y-16 md:col-span-11 md:grid-cols-10">
          {/* Eyebrow + headline */}
          <div className="space-y-10 md:col-span-10">
            <Reveal>
              <div className="flex items-center gap-4">
                <div className="h-px w-8 bg-[#7FB98A]" />
                <h4
                  className="text-xs uppercase tracking-[0.5em] text-[#1a1a1a] md:text-sm"
                  style={lato}
                >
                  Future State
                </h4>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                className="text-[clamp(2.5rem,7vw,8.5rem)] leading-[0.95] tracking-tight text-[#1a1a1a]"
                style={playfair}
              >
                Become the company{" "}
                <br className="hidden lg:block" />
                competitors <span className="italic">benchmark</span>{" "}
                <br className="hidden lg:block" />
                themselves <span className="italic">against.</span>
              </h2>
            </Reveal>
          </div>

          {/* Supporting copy — warm offset block */}
          <div className="relative md:col-span-6 md:col-start-5">
            <Reveal delay={0.18}>
              {/* Warm offset block */}
              <div
                aria-hidden
                className="absolute -inset-8 -z-10 translate-x-4 translate-y-4 bg-[#EDE9E0]"
              />

              <div className="relative p-2 md:p-0">
                <p
                  className="text-lg font-light leading-relaxed text-[#1a1a1a]/90 md:text-xl"
                  style={lato}
                >
                  Most companies grow faster than perception. The companies
                  that dominate categories understand something earlier: how
                  they are perceived determines who trusts them, hires them,
                  invests in them, and competes with them.
                </p>

                <p
                  className="mt-6 text-lg leading-relaxed text-[#1a1a1a] md:text-xl"
                  style={lato}
                >
                  A world-class digital presence changes that.
                </p>

                <div className="mt-12 flex items-center gap-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1a1a1a]/10 text-[#7FB98A]">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]"
                    style={lato}
                  >
                    Standard Setting
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* Faint right-edge rule */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-20 h-full w-1/3 border-r border-[#EDE9E0] opacity-50"
        />
      </div>
    </section>
  );
}
