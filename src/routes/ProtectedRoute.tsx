import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import Loader from "@/components/Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, isHydrating } = useAuthStore();
  const location = useLocation();

  if (isHydrating) {
    // still checking the cookie/token on first load — don't redirect yet
    return (
      <div className="flex min-h-screen items-center justify-center">
       <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname + location.search + location.hash }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
