export function Footer() {
  const cols = [
    { title: "Studio", links: ["About", "Process", "Careers", "Contact"] },
    { title: "Services", links: ["Web design", "Engineering", "CRO", "Retainer"] },
    { title: "Work", links: ["Case studies", "SaaS", "DTC", "Finance"] },
    { title: "Resources", links: ["Free audit", "Playbook", "Journal", "Newsletter"] },
  ];
  return (
    <footer className="border-t border-foreground/8 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-6">
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-md bg-ink">
                <span className="size-2.5 rounded-sm bg-brand" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight text-ink">Averra</span>
            </a>
            <p className="mt-5 max-w-xs text-sm text-ink-soft">
              A senior web studio for ambitious businesses. Strategy, design, and
              engineering — one accountable team.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft">
              <span className="size-1.5 rounded-full bg-brand" /> Booking Q1 2026
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-mono uppercase tracking-widest text-ink-soft">{c.title}</div>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-ink hover:text-brand">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-foreground/8 pt-8 text-xs text-ink-soft md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Averra Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-ink">Privacy</a>
            <a href="#" className="hover:text-ink">Terms</a>
            <span>hello@averra.studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
