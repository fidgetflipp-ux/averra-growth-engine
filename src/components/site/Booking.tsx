import { useState } from "react";
import { Eyebrow, Reveal } from "./primitives";

/**
 * Booking — Phase 1 visual scaffold of the 6-step flow.
 * Wired to Stripe checkout in Phase 2 (next turn).
 */
const steps = [
  "Package",
  "Timeline",
  "Brief",
  "Inspiration",
  "Project slot",
  "Payment",
];

const packages = [
  { id: "essential", name: "Essential", price: 6500, deposit: 2000, delivery: "7 days" },
  { id: "signature", name: "Signature", price: 14000, deposit: 4000, delivery: "10 days" },
  { id: "flagship", name: "Flagship", price: 32000, deposit: 8000, delivery: "14 days" },
];

const slots = [
  { id: "w1", label: "Week of Mar 24", left: 1 },
  { id: "w2", label: "Week of Mar 31", left: 2 },
  { id: "w3", label: "Week of Apr 07", left: 3 },
];

export function Booking() {
  const [step, setStep] = useState(0);
  const [pkg, setPkg] = useState("signature");
  const [slot, setSlot] = useState("w2");
  const [payMode, setPayMode] = useState<"deposit" | "full">("deposit");
  const [brief, setBrief] = useState("");
  const [inspo, setInspo] = useState("");

  const selectedPkg = packages.find((p) => p.id === pkg)!;

  return (
    <section id="start" className="bg-surface py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal><Eyebrow>Start your project</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mx-auto mt-6 max-w-3xl text-center text-[clamp(2rem,5vw,4rem)]">
            Book your website in <span className="text-serif-italic">six steps.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-16 overflow-hidden rounded-2xl hairline bg-white shadow-card">
            {/* Stepper */}
            <div className="flex items-center justify-between gap-2 border-b border-foreground/8 px-6 py-4 md:px-10">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStep(i)}
                  className="flex min-w-0 flex-1 items-center gap-2.5 text-left"
                >
                  <span
                    className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-mono transition-colors ${
                      i <= step ? "bg-ink text-white" : "bg-foreground/8 text-ink-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={`hidden truncate text-xs md:inline ${
                      i === step ? "text-ink font-medium" : "text-ink-muted"
                    }`}
                  >
                    {s}
                  </span>
                </button>
              ))}
            </div>

            <div className="grid gap-10 p-8 md:grid-cols-5 md:p-12">
              {/* Active step */}
              <div className="md:col-span-3">
                {step === 0 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Choose your package</h3>
                    <p className="text-sm text-ink-soft">Fixed-scope engagements, fixed pricing.</p>
                    <div className="mt-6 space-y-3">
                      {packages.map((p) => (
                        <label
                          key={p.id}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                            pkg === p.id ? "border-ink bg-ink/[0.02]" : "border-foreground/10 hover:border-foreground/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`grid size-4 place-items-center rounded-full border ${pkg === p.id ? "border-ink" : "border-foreground/30"}`}>
                              {pkg === p.id && <span className="size-2 rounded-full bg-ink" />}
                            </span>
                            <input type="radio" name="pkg" className="sr-only" checked={pkg === p.id} onChange={() => setPkg(p.id)} />
                            <div>
                              <div className="text-[15px] font-medium text-ink">{p.name}</div>
                              <div className="text-xs text-ink-muted">Live in {p.delivery}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[15px] font-medium text-ink">${p.price.toLocaleString()}</div>
                            <div className="text-xs text-ink-muted">${p.deposit.toLocaleString()} deposit</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Pick your delivery timeline</h3>
                    <p className="text-sm text-ink-soft">All packages ship within their default window. Rush available on request.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {["Standard — included", "Rush (+30%) — 5 days"].map((o) => (
                        <button key={o} className="rounded-xl border border-foreground/10 p-4 text-left text-sm text-ink-soft hover:border-foreground/25">
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Tell us about your business</h3>
                    <p className="text-sm text-ink-soft">A short brief — what you sell, who you sell to, and what success looks like.</p>
                    <textarea
                      value={brief}
                      onChange={(e) => setBrief(e.target.value)}
                      rows={8}
                      placeholder="We're a B2B SaaS helping fintech teams ship faster…"
                      className="mt-6 w-full resize-none rounded-xl border border-foreground/10 bg-white p-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-ink focus:outline-none"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Share inspiration</h3>
                    <p className="text-sm text-ink-soft">Links to sites, brands, or moodboards you admire. We'll align quickly.</p>
                    <textarea
                      value={inspo}
                      onChange={(e) => setInspo(e.target.value)}
                      rows={5}
                      placeholder="https://linear.app, https://stripe.com…"
                      className="mt-6 w-full resize-none rounded-xl border border-foreground/10 bg-white p-4 text-sm text-ink placeholder:text-ink-muted/70 focus:border-ink focus:outline-none"
                    />
                    <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-dashed border-foreground/20 px-4 py-2.5 text-xs text-ink-soft hover:border-foreground/40">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                      Upload files (added next step)
                    </button>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Reserve your project slot</h3>
                    <p className="text-sm text-ink-soft">Slots fill on a first-deposit basis. We cap at 3 active builds per week.</p>
                    <div className="mt-6 space-y-3">
                      {slots.map((s) => (
                        <label
                          key={s.id}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                            slot === s.id ? "border-ink bg-ink/[0.02]" : "border-foreground/10 hover:border-foreground/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`grid size-4 place-items-center rounded-full border ${slot === s.id ? "border-ink" : "border-foreground/30"}`}>
                              {slot === s.id && <span className="size-2 rounded-full bg-ink" />}
                            </span>
                            <input type="radio" name="slot" className="sr-only" checked={slot === s.id} onChange={() => setSlot(s.id)} />
                            <span className="text-[15px] font-medium text-ink">{s.label}</span>
                          </div>
                          <span className="text-xs text-ink-muted">{s.left} slot{s.left > 1 ? "s" : ""} left</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-3">
                    <h3 className="text-display text-2xl text-ink">Payment</h3>
                    <p className="text-sm text-ink-soft">Pay a deposit to lock your slot, or pay in full and skip checkout later.</p>
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => setPayMode("deposit")}
                        className={`rounded-xl border p-5 text-left transition-colors ${payMode === "deposit" ? "border-ink bg-ink/[0.02]" : "border-foreground/10"}`}
                      >
                        <div className="text-xs text-ink-muted">Deposit</div>
                        <div className="mt-2 text-display text-2xl text-ink">${selectedPkg.deposit.toLocaleString()}</div>
                        <div className="mt-1 text-xs text-ink-soft">Balance due at launch</div>
                      </button>
                      <button
                        onClick={() => setPayMode("full")}
                        className={`rounded-xl border p-5 text-left transition-colors ${payMode === "full" ? "border-ink bg-ink/[0.02]" : "border-foreground/10"}`}
                      >
                        <div className="text-xs text-ink-muted">Pay in full <span className="text-brand-ink">— save 5%</span></div>
                        <div className="mt-2 text-display text-2xl text-ink">${Math.round(selectedPkg.price * 0.95).toLocaleString()}</div>
                        <div className="mt-1 text-xs text-ink-soft">Nothing more to pay</div>
                      </button>
                    </div>
                    <p className="mt-6 text-xs text-ink-muted">
                      Secure checkout powered by Stripe. Project dashboard access sent immediately on confirmation.
                    </p>
                  </div>
                )}

                {/* Step nav */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="text-sm text-ink-soft disabled:opacity-30"
                  >
                    ← Back
                  </button>
                  {step < steps.length - 1 ? (
                    <button
                      onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white hover:bg-ink/90"
                    >
                      Continue
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-white opacity-70"
                      title="Stripe checkout wires up next"
                    >
                      Pay & secure slot
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Summary */}
              <aside className="md:col-span-2">
                <div className="rounded-xl bg-surface p-6">
                  <div className="text-eyebrow">Order summary</div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-ink-soft"><span>Package</span><span className="text-ink">{selectedPkg.name}</span></div>
                    <div className="flex justify-between text-ink-soft"><span>Delivery</span><span className="text-ink">{selectedPkg.delivery}</span></div>
                    <div className="flex justify-between text-ink-soft"><span>Slot</span><span className="text-ink">{slots.find((s) => s.id === slot)?.label}</span></div>
                    <div className="mt-5 border-t border-foreground/10 pt-5 flex justify-between text-ink-soft"><span>Project total</span><span className="text-ink">${selectedPkg.price.toLocaleString()}</span></div>
                    <div className="flex justify-between text-ink-soft"><span>Due today</span>
                      <span className="text-display text-ink text-xl">
                        ${payMode === "deposit" ? selectedPkg.deposit.toLocaleString() : Math.round(selectedPkg.price * 0.95).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 text-xs text-ink-muted">
                    <div className="flex items-center gap-2"><span className="size-1 rounded-full bg-brand" /> Refundable within 7 days</div>
                    <div className="flex items-center gap-2"><span className="size-1 rounded-full bg-brand" /> Project dashboard on confirmation</div>
                    <div className="flex items-center gap-2"><span className="size-1 rounded-full bg-brand" /> NDA available on request</div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
