import { useNavigate, useLocation } from "react-router-dom"
import LoginForm from "@/components/auth/LoginForm"
import { useAuthStore } from "@/store/auth.store"
import type { LoginInput } from "@/lib/validations/auth"

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isSubmitting, error, clearError } = useAuthStore()

  const from = (location.state as { from?: string })?.from || "/app"

  const handleSubmit = async (data: LoginInput) => {
    try {
      clearError()
      await login(data)
      navigate(from, { replace: true })
    } catch {
      // error already captured in store, form will show it
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Sign in to get back to your day.
      </p>

      <div className="mt-8">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          error={error}
        />
      </div>
    </div>
  )
}

export default Login