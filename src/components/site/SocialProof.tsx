import { CountUp, Reveal } from "./primitives";

const metrics = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 3.4, suffix: "×", label: "Avg. conversion lift" },
  { value: 98, suffix: "/100", label: "Avg. Lighthouse" },
  { value: 7, suffix: " yrs", label: "Building for the web" },
];

const stack = [
  "Next.js", "Shopify", "Framer", "Webflow", "Stripe", "Vercel",
  "Sanity", "Contentful", "Supabase", "Tailwind",
];

export function SocialProof() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {metrics.map((m) => (
              <div key={m.label} className="relative">
                <div className="text-display text-4xl sm:text-5xl">
                  <CountUp to={m.value} suffix={m.suffix} />
                </div>
                <div className="mt-2 text-sm text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-20">
            <div className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
              The stack we build on
            </div>
            <div className="relative overflow-hidden mask-fade">
              <div className="flex animate-marquee gap-16 whitespace-nowrap">
                {[...stack, ...stack].map((s, i) => (
                  <span key={i} className="text-xl sm:text-2xl text-display text-muted-foreground/70 hover:text-foreground transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        .mask-fade {
          mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
        }
      `}</style>
    </section>
  );
}
