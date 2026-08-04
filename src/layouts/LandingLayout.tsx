import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "@/components/landing/Footer";

const LandingLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default LandingLayout;
