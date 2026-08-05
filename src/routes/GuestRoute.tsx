import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"

const GuestRoute = () => {
  const { isAuthenticated, isHydrating } = useAuthStore()

  if (isHydrating) {
    // still checking cookie — wait before deciding, same reason as ProtectedRoute
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
          Loading…
        </p>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}

export default GuestRoute