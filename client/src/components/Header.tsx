import React, { useState } from "react";
import Logo from "/logo.png";
import { LucideShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router";

import { logout } from "@/features/auth/services/authService";
import { useQueryClient } from "@tanstack/react-query";
import { setIsAuthenticated } from "@/features/auth/authSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log("logout clicked");
    await logout();
    dispatch(setIsAuthenticated(false));
    queryClient.removeQueries();
    navigate("/login/", { replace: true });
  };

  return (
    <div className="flex h-16 items-center justify-between bg-white px-4 py-2">
      <img src={Logo} className="h-8 w-8"></img>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
        placeholder="search products"
        className="placeholder::text-white w-60 rounded-4xl border border-gray-700 pl-3"
      />

      <div className="flex space-x-20">
        

        <div className="flex gap-3 hover:cursor-pointer">
          <Link to={'carts'}><LucideShoppingCart></LucideShoppingCart></Link>
          <Link to= {'orders'}>Order</Link>
          <button className="hover:cursor-pointer" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
