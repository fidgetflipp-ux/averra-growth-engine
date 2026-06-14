import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="hairline-t bg-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            A senior design and engineering studio building premium websites
            for ambitious businesses.
          </p>
          <p className="mt-8 text-eyebrow">Now booking — Q1 production</p>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <div className="text-eyebrow">Studio</div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li><a href="#work" className="hover:text-ink">Work</a></li>
              <li><a href="#services" className="hover:text-ink">Services</a></li>
              <li><a href="#process" className="hover:text-ink">Process</a></li>
              <li><a href="#packages" className="hover:text-ink">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="text-eyebrow">Contact</div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li><a href="mailto:hello@averra.studio" className="hover:text-ink">hello@averra.studio</a></li>
              <li><a href="#start" className="hover:text-ink">Start a project</a></li>
            </ul>
          </div>
          <div>
            <div className="text-eyebrow">Elsewhere</div>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li><a href="#" className="hover:text-ink">LinkedIn</a></li>
              <li><a href="#" className="hover:text-ink">Twitter / X</a></li>
              <li><a href="#" className="hover:text-ink">Dribbble</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="hairline-t">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} Averra Studio. All rights reserved.</span>
          <span>Crafted in-house.</span>
        </div>
      </div>
    </footer>
  );
}
