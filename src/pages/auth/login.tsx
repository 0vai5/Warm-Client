import LoginForm from "@/components/auth/LoginForm"
import type { LoginInput } from "@/lib/validations/auth"

const Login = () => {
  // TODO: (connection day): wire to authStore + POST /auth/login
  const handleSubmit = async (data: LoginInput) => {
    console.log("login submit", data)
  }

  return (
    <div>
      <h1 className="font-heading text-2xl">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Sign in to get back to your day.
      </p>

      <div className="mt-8">
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Login