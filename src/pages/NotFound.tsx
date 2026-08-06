import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 bg-background px-6 text-center">
        <Logo className="h-8" />

        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            404
          </p>
          <h1 className="font-heading mt-2 text-3xl">This page went quiet.</h1>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Nothing lives here. It might have moved, or never existed.
          </p>
        </div>

        <Link to="/" className={buttonVariants({ size: "lg" })}>
          Back to safety
        </Link>
      </div>
    </>
  );
};

export default NotFound;
