import { useNavigate } from "react-router-dom"
import SignupForm from "@/components/auth/SignupForm"
import { useAuthStore } from "@/store/auth.store"
import type { SignupInput } from "@/lib/validations/auth"

const Signup = () => {
  const navigate = useNavigate()
  const { signup, isSubmitting, error, clearError } = useAuthStore()

  const handleSubmit = async (data: SignupInput) => {
    try {
      clearError()
      await signup(data)
      navigate("/auth/login", {
        state: { justSignedUp: true },
        replace: true,
      })
    } catch {
      // error already captured in store
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl">Create your account</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Free while Warm is in early access.
      </p>

      <div className="mt-8">
        <SignupForm
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          error={error}
        />
      </div>
    </div>
  )
}

export default Signup