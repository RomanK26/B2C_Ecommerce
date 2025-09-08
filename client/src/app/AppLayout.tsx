import React, { createContext, useState } from "react";

import Header from "@/components/Header";
import { Outlet, useSearchParams } from "react-router";
import MainSidebar from "@/components/MainSidebar";
import useFetchUser from "@/features/user/hooks/useFetchUser";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "@/features/auth/authSlice";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import toast from "react-hot-toast";

export const SearchContext = createContext({
  query: "",
  setQuery: () => {},
  searchParams: null,
  setSearchParams: () => {},
});
const AppLayout = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useAuthCheck();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  if (isAuthenticated && role === "admin") {
    toast.error("Please logout");
  }
  return (
    <>
      <SearchContext.Provider
        value={{ query, setQuery, setSearchParams, searchParams }}
      >
        <div className="flex h-full min-h-screen flex-col">
          <Header></Header>
          <div className="flex flex-1">
            <MainSidebar />
            <Outlet></Outlet>
          </div>

          {/* <Footer></Footer> */}
        </div>
      </SearchContext.Provider>
    </>
  );
};

export default AppLayout;
