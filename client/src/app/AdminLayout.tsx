import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Link, useNavigate } from "react-router";
import { Bell, Menu, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import { menuItems } from "@/features/admin/constants";
import UserMenu from "@/features/admin/UserMenu";
import { setIsAuthenticated } from "@/features/auth/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/features/auth/services/authService";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const AdminLayout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("admin layout");

  const { isLoading } = useAuthCheck();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSettings=()=>{
    navigate("/admin/user-profile/")

  }

  const handleLogout = async () => {
    console.log("logout clicked");
    await logout();
    dispatch(setIsAuthenticated(false));
    queryClient.clear();
    navigate("/login/", { replace: true });
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="bg-muted/40 hidden border-r md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              to="/dashboard/home"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span>Ecom</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AdminSidebar menuItems={menuItems} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col">
        <header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <AdminSidebar menuItems={menuItems} />
            </SheetContent>
          </Sheet>

          {/* Search */}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="bg-background w-full pl-8 md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>

          {/* User Menu */}
          <UserMenu onLogout={handleLogout} handleSettings={handleSettings}/>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
