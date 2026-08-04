import { Route, Routes } from "react-router-dom";
import { LandingLayout, AuthLayout, DashboardLayout } from "@/layouts";
import { DashboardHome, LandingPage, Login, NotFound, Signup } from "@/pages";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Routes — no guard needed */}
      <Route path="/" element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* Auth Routes — logged-in users bounced to dashboard */}
      {/* <Route element={<AuthLayout />}> */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      {/* </Route> */}

      {/* Dashboard Routes — logged-out users bounced to login */}
      {/* <Route element={<DashboardProtectedRoute />}> */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
      </Route>
      {/* </Route> */}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
