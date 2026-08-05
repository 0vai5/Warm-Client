import { SpinnerIcon } from "@phosphor-icons/react";

const Loader = () => {
  return (
    <div>
      <SpinnerIcon size={32} className="h-5 w-5 animate-spin" />
    </div>
  );
};

export default Loader;
