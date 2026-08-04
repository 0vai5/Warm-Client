const STACK = [
  "Gemini",
  "MongoDB",
  "Node.js",
  "Express",
  "TypeScript",
  "React",
  "Zod",
]

// Duplicated once so the track can loop seamlessly at -50%.
const TRACK = [...STACK, ...STACK]

const TrustedByMarquee = () => {
  return (
    <section className="border-y border-border py-8">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          Built with
        </p>

        <div
          className="group relative mt-5 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max gap-12 group-hover:[animation-play-state:paused]">
            {TRACK.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="font-heading shrink-0 text-lg text-muted-foreground/70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustedByMarquee