import SignupForm from "@/components/auth/SignupForm";
import type { SignupInput } from "@/lib/validations/auth";

const Signup = () => {
  // TODO: (connection day): wire to authStore + POST /auth/signup
  const handleSubmit = async (data: SignupInput) => {
    console.log("signup submit", data);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Free while Warm is in early access.
      </p>

      <div className="mt-8">
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Signup;
