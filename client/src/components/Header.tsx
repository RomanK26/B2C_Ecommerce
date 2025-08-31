import React, { useState } from "react";
import Logo from "/logo.png";
import {
  Box,
  LucideShoppingCart,
  ShoppingBasketIcon,
  User,
} from "lucide-react";

const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="flex items-center justify-between bg-indigo-400 px-4 py-2 h-16">
      <img src={Logo} className="h-8 w-8"></img>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(() => e.target.value)}
        placeholder="search products"
        className="placeholder::text-white w-60 rounded-4xl border text-center border-gray-700 pl-3"
      />

      <div className="flex space-x-20">
        <LucideShoppingCart></LucideShoppingCart>

        <div className="flex gap-3 hover:cursor-pointer">
          <User>
            <button className="text-white">Login</button>
          </User>
        </div>
      </div>
    </div>
  );
};

export default Header;
