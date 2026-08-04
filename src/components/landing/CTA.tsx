import { buttonVariants } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-heading text-3xl md:text-4xl">
          Your day, structured, not managed.
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-muted-foreground">
          Free while Warm is in early access. No card required to start.
        </p>
        <Link
          to="/signup"
          className={buttonVariants({ size: "lg", className: "mt-8" })}
        >
          Create account
        </Link>
      </div>
    </section>
  );
};

export default CTA;
