import { Reveal } from "./primitives";

const logos = [
  "Northwind", "Helio", "Quanta", "Atelier 9", "Lumen & Co",
  "Vantage", "Parallel", "Folio", "Riverstone", "Mercer",
];

export function SocialProof() {
  return (
    <section className="hairline-t hairline-b bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="text-center text-eyebrow">Selected operators trust Averra</p>
        </Reveal>
        <div className="relative mt-9 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
          <div className="flex w-[200%] animate-marquee gap-16">
            {[...logos, ...logos].map((name, i) => (
              <span key={i} className="shrink-0 text-[22px] font-medium tracking-[-0.01em] text-ink/30">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
