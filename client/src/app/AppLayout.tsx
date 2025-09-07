import React, { createContext, useState } from "react";

import Header from "@/components/Header";
import { Outlet, useSearchParams } from "react-router";
import MainSidebar from "@/components/MainSidebar";
import useFetchUser from "@/features/user/hooks/useFetchUser";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "@/features/auth/authSlice";

export const SearchContext = createContext();
const AppLayout = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { isSuccess } = useFetchUser();
  const [searchParams, setSearchParams] = useSearchParams();
  if (isSuccess) {
    // console.log("valid user");
    dispatch(setIsAuthenticated(true));
  }
  return (
    <SearchContext.Provider value={{ query, setQuery, setSearchParams,searchParams }}>
      <div className="flex h-full min-h-screen flex-col">
        <Header></Header>
        <div className="flex flex-1">
          <MainSidebar />
          <Outlet></Outlet>
        </div>

        {/* <Footer></Footer> */}
      </div>
    </SearchContext.Provider>
  );
};

export default AppLayout;
