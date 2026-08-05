import { SpinnerIcon } from "@phosphor-icons/react";

type LoaderProps = {
  label?: string;
};

const Loader = ({ label = "Loading…" }: LoaderProps) => {
  return (
    <div role="status" aria-live="polite" className="inline-flex items-center">
      <SpinnerIcon aria-hidden="true" className="h-5 w-5 animate-spin" />
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Loader;
