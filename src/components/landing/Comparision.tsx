const ROWS = [
  {
    dimension: "Building your list",
    typical: "You type each task manually, one by one.",
    warm: "Say your whole day in one message.",
  },
  {
    dimension: "Vague references",
    typical: "You scroll and search to find the right one.",
    warm: "Resolved by meaning — asks when it's unsure, never guesses.",
  },
  {
    dimension: "When the day's too full",
    typical: "You find out when you're already behind.",
    warm: "Flagged before it happens, with one concrete trade-off.",
  },
  {
    dimension: "Where it lives",
    typical: "Another tab. Another login. A separate habit.",
    warm: "Diffuses into how you already work.",
  },
  {
    dimension: "What AI actually did",
    typical: "No distinction from your own edits.",
    warm: "Every AI-created task is marked. Always.",
  },
];

const Comparison = () => {
  return (
    <section id="compare" className="mx-auto max-w-4xl px-6 py-24">
      <p className="text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        Compare
      </p>
      <h2 className="font-heading mx-auto mt-3 max-w-md text-center text-3xl">
        Not another list. A different relationship with your day.
      </h2>

      <div className="mt-14 overflow-hidden rounded-md border border-border">
        <div className="grid grid-cols-2 border-b border-border bg-card">
          <p className="px-5 py-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            Typical task manager
          </p>
          <p className="border-l border-border px-5 py-3 font-mono text-[11px] uppercase tracking-wide text-primary">
            Warm
          </p>
        </div>

        {ROWS.map((row) => (
          <div
            key={row.dimension}
            className="border-b border-border last:border-b-0"
          >
            <p className="px-5 pt-4 font-mono text-[10px] uppercase tracking-wide text-muted-foreground/70">
              {row.dimension}
            </p>
            <div className="grid grid-cols-2">
              <p className="px-5 pb-4 pt-1.5 text-sm text-muted-foreground">
                {row.typical}
              </p>
              <p className="border-l border-border px-5 pb-4 pt-1.5 text-sm text-foreground">
                {row.warm}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Comparison;
