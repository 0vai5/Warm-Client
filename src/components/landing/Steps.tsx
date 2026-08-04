// src/components/landing/Steps.tsx

const STEPS = [
  {
    number: "01",
    title: "Say what's on your mind",
    copy:
      "No forms, no fields. Type your day the way you'd tell a colleague — mixed, unordered, half-finished thoughts included.",
    snippet:
      "call the electrician, finish the client deck, follow up with landlord",
  },
  {
    number: "02",
    title: "Warm structures it",
    copy:
      "Each item becomes a real task — title, priority, effort, category — inferred from what you actually said, not a generic template.",
    snippet: "→ 3 tasks created · 1 marked high priority",
  },
  {
    number: "03",
    title: "Vague references get resolved, not guessed",
    copy:
      "Say \"the call task\" later and Warm matches it by meaning. If more than one task is close, it asks — it never silently picks one.",
    snippet: "\"the call task\" → Call the electrician (91% match)",
  },
]

const Steps = () => {
  return (
    <section id="how-it-works" className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        How it works
      </p>
      <h2 className="font-heading mx-auto mt-3 max-w-md text-center text-3xl">
        From plain language to a plan you can trust
      </h2>

      <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step) => (
          <div key={step.number} className="flex flex-col gap-3">
            <span className="font-mono text-sm text-primary">
              {step.number}
            </span>
            <h3 className="font-heading text-lg">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.copy}</p>
            <div className="mt-2 rounded-md border border-border bg-card px-3 py-2.5">
              <p className="font-mono text-[11px] leading-relaxed text-foreground/70">
                {step.snippet}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Steps