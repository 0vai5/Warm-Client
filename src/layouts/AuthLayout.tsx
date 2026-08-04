// src/layouts/AuthLayout.tsx
import { Outlet, Link } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="grid min-h-svh md:grid-cols-2">
      {/* Brand panel — hidden on mobile, shown on md+ */}
      <div className="relative hidden flex-col justify-between border-r border-border bg-card p-10 md:flex">
        <Link to="/" className="font-heading text-lg lowercase tracking-tight">
          warm
        </Link>

        <div className="max-w-sm">
          <p className="font-heading text-2xl leading-snug text-foreground">
            "Say it once. Warm structures the rest."
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">
            A quiet control room for your day
          </p>
        </div>

        <p className="font-mono text-[11px] text-muted-foreground">
          Built for people who already use AI
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col justify-center px-6 py-12 md:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="font-heading mb-10 block text-lg lowercase tracking-tight md:hidden"
          >
            warm
          </Link>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout