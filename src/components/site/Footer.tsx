export function Footer() {
  return (
    <footer className="relative border-t border-border py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg overflow-hidden">
                <span className="absolute inset-0" style={{ background: "var(--gradient-brand)" }} />
                <span className="absolute inset-[2px] rounded-[6px] bg-background" />
                <span className="relative h-2.5 w-2.5 rounded-[2px]" style={{ background: "var(--gradient-brand)" }} />
              </span>
              <span className="text-display text-lg">Averra</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              A premium web studio engineering high-performing sites for ambitious brands.
              Remote-first. Booking Q1 2027.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Studio</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#work" className="hover:text-foreground text-muted-foreground transition-colors">Work</a></li>
              <li><a href="#services" className="hover:text-foreground text-muted-foreground transition-colors">Services</a></li>
              <li><a href="#process" className="hover:text-foreground text-muted-foreground transition-colors">Process</a></li>
              <li><a href="#grader" className="hover:text-foreground text-muted-foreground transition-colors">Website grader</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Contact</div>
            <ul className="space-y-2.5 text-sm">
              <li><a href="mailto:hello@averra.studio" className="hover:text-foreground text-muted-foreground transition-colors">hello@averra.studio</a></li>
              <li><a href="#contact" className="hover:text-foreground text-muted-foreground transition-colors">Start a project</a></li>
              <li className="text-muted-foreground">Remote — Europe</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: "var(--brand)" }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand)" }} />
            </span>
            Available for one new project in Q1
          </div>
          <div className="text-xs text-muted-foreground">© {new Date().getFullYear()} Averra Studio. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
