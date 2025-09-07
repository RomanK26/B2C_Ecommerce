import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";

const UserMenu = ({
  onLogout,
  handleSettings,
}: {
  onLogout: () => void;
  handleSettings: () => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSettings}>Settings</DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button onClick={onLogout} className="w-full text-left">
          Logout
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserMenu;
