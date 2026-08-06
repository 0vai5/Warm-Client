import Logo from "@/components/Logo";
import UserMenu from "@/components/UserMenu";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background md:h-screen">
      <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <Logo />
        <UserMenu />
      </header> 

      <Outlet />
    </div>
  );
};

export default DashboardLayout;
