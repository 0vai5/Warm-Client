import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <Link
            to="/"
            className="font-heading text-lg lowercase tracking-tight"
          >
            warm
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/auth/login"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              Sign in
            </Link>
            <Link to="/auth/signup" className={buttonVariants({ size: "sm" })}>
              Get started
            </Link>
          </div>

          <Button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </Button>
        </div>

        <div
          className={cn(
            "grid overflow-hidden border-border transition-[grid-template-rows] duration-200 md:hidden",
            open ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0">
            <nav className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-border pt-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className={buttonVariants()}
                >
                  Get started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
