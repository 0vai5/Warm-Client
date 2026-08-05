import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

const ProtectedRoute = () => {
  const { isAuthenticated, isHydrating } = useAuthStore()
  const location = useLocation()

  if (isHydrating) {
    // still checking the cookie/token on first load — don't redirect yet
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Loading…
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}

export default ProtectedRoute