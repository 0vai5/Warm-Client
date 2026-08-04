import { Link } from "react-router-dom"

const YEAR = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link to="/" className="font-heading text-lg lowercase tracking-tight">
              warm
            </Link>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              A quiet control room for your day.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Product
              </p>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How it works
              </a>
              <a href="#compare" className="text-sm text-muted-foreground hover:text-foreground">
                Compare
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                Follow
              </p>
              <Link
                to="https://www.linkedin.com/in/0vai5"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] text-muted-foreground">
            © {YEAR} Warm. Built in public.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer