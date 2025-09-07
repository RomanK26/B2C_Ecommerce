"use client";

import { useState } from "react";
import Logo from "/logo.png";
import { LucideShoppingCart, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout, setIsAuthenticated } from "@/features/auth/authSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();
    dispatch(setIsAuthenticated(false));
    queryClient.removeQueries();
    navigate("/", { replace: true });
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

      <div className="mx-8 max-w-md flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm transition-colors focus:border-gray-300 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
        </div>
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
