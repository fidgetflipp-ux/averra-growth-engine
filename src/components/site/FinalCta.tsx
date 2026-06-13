import { ArrowUpRight, Calendar } from "lucide-react";
import { MagneticButton, Reveal } from "./primitives";

export function FinalCta() {
  return (
    <section id="contact" className="relative py-32 sm:py-48 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in oklab, var(--brand) 18%, transparent), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2
            className="text-display brand-gradient-text mx-auto max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            Your website should be your <span className="text-serif-italic" style={{ color: "var(--brand)" }}>best</span> salesperson.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 text-muted-foreground text-lg max-w-xl mx-auto">
            Let's make sure yours is. Tell us about your brand and we'll respond within 24 hours.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <MagneticButton href="mailto:hello@averra.studio" variant="primary">
              Start your project <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href="mailto:hello@averra.studio?subject=Consultation" variant="ghost">
              <Calendar className="h-4 w-4" /> Schedule a consultation
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
