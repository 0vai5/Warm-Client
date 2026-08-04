// src/components/landing/Hero.tsx
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type MockTask = {
  title: string;
  priority: "low" | "medium" | "high";
  effort: "quick" | "medium" | "long";
  aiGenerated: boolean;
  due?: string;
};

const MOCK_TASKS: MockTask[] = [
  {
    title: "Ship the auth refactor",
    priority: "high",
    effort: "long",
    aiGenerated: true,
    due: "Today",
  },
  {
    title: "Review PR from Sara",
    priority: "medium",
    effort: "quick",
    aiGenerated: false,
  },
  {
    title: "Call the electrician",
    priority: "low",
    effort: "quick",
    aiGenerated: true,
  },
  {
    title: "Prep 1:1 notes",
    priority: "medium",
    effort: "medium",
    aiGenerated: false,
    due: "Today",
  },
  {
    title: "Follow up on invoice #204",
    priority: "high",
    effort: "quick",
    aiGenerated: true,
  },
];

const Hero = () => {
  return (
    <section
      id="hero"
      className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center"
    >
      <span className="inline-flex items-center rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        Built for people who already use AI
      </span>

      <h1 className="font-heading mx-auto mt-6 max-w-2xl text-4xl leading-tight md:text-5xl">
        Plan your day. Know exactly what AI touched.
      </h1>

      <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
        Say what's on your mind. Warm structures it into prioritized tasks,
        every task it created is marked, every task stays yours to edit or
        remove.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link to="/signup" className={buttonVariants({ size: "lg" })}>
          Create account
        </Link>
        <Link
          to="#how-it-works"
          className={buttonVariants({ variant: "outline", size: "lg" })}
        >
          See how it works
        </Link>
      </div>

      {/* Product visual */}
      <div className="mx-auto mt-16 max-w-3xl rounded-md border border-border bg-card text-left">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Today
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {MOCK_TASKS.length} tasks
          </p>
        </div>

        <div className="divide-y divide-border">
          {MOCK_TASKS.map((task) => (
            <MockTaskRow key={task.title} task={task} />
          ))}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-5 py-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-0.5 bg-primary" />
            Structured by Warm
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-0.5 bg-border" />
            Added by you
          </span>
        </div>
      </div>
    </section>
  );
};

const MockTaskRow = ({ task }: { task: MockTask }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-5 py-3",
        task.aiGenerated && "border-l-2 border-primary",
      )}
    >
      <p className="text-sm text-foreground">{task.title}</p>
      <div className="flex shrink-0 items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        <span>{task.priority}</span>
        <span>{task.effort}</span>
        {task.due && <span className="text-primary">{task.due}</span>}
      </div>
    </div>
  );
};

export default Hero;
