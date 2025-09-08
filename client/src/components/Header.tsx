import { useContext, useState } from "react";
import Logo from "/logo.png";
import { LucideShoppingCart, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "@/features/auth/authSlice";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { SearchContext } from "@/app/AppLayout";
import { logout } from "@/features/auth/services/authService";

const Header = () => {
  const { query, setQuery, setSearchParams } = useContext(SearchContext);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    console.log("logout");
    dispatch(setIsAuthenticated(false));
    queryClient.removeQueries();
    navigate("/", { replace: true });
  };

  const handleQuery = () => {
    setSearchParams({ q: query });
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-100 bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={Logo || "/placeholder.svg"}
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
        </Link>
      </div>

      <div className="mx-8 flex max-w-md flex-1 gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm transition-colors focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
        </div>
        <Button
          variant={"ghost"}
          className="rounded-3xl bg-green-300 text-black"
          onClick={handleQuery}
        >
          Search
        </Button>
      </div>

      <nav className="flex items-center space-x-6">
        <Link
          to="/carts"
          className="flex h-full items-center space-x-1 text-gray-600 transition-colors hover:text-orange-300"
        >
          <LucideShoppingCart className="h-5 w-5" />
          <span className="hidden text-sm font-medium sm:inline">Cart</span>
        </Link>

        <Link
          to="/orders"
          className="text-sm font-medium text-gray-600 transition-colors hover:text-orange-300"
        >
          Orders
        </Link>

        <div className="flex items-center space-x-2">
          <User className="h-4 w-4 text-gray-400" />
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-600 transition-colors hover:text-red-600"
          >
            {isAuthenticated ? "Logout" : "Login"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
