import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default LandingLayout;
