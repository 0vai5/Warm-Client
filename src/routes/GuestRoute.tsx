import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/auth.store"
import Loader from "@/components/Loader";

const GuestRoute = () => {
  const { isAuthenticated, isHydrating } = useAuthStore()

  if (isHydrating) {
    // still checking cookie — wait before deciding, same reason as ProtectedRoute
    return (
      <div className="flex min-h-screen items-center justify-center">
       <Loader />
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}

export default GuestRoute