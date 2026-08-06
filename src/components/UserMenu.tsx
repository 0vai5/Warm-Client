import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SquaresFourIcon, SignOutIcon } from "@phosphor-icons/react";

const UserMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const initial = user.name.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
        <Avatar size="sm">
          <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        <span className="font-mono text-xs text-muted-foreground">
          {user.name}
        </span>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {location.pathname !== "/app" && (
            <DropdownMenuItem onClick={() => navigate("/app")}>
              <SquaresFourIcon size={14} />
              Dashboard
            </DropdownMenuItem>
          )}

          <DropdownMenuItem variant="destructive" onClick={handleLogout}>
            <SignOutIcon size={14} />
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
