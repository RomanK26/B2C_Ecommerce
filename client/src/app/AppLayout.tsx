import React from "react";

import Header from "@/components/Header";
import { Outlet } from "react-router";
import MainSidebar from "@/components/MainSidebar";
import useFetchUser from "@/features/user/hooks/useFetchUser";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "@/features/auth/authSlice";

const AppLayout = () => {
  const dispatch = useDispatch();
  const { isSuccess } = useFetchUser();
  if (isSuccess) {
    // console.log("valid user");
    dispatch(setIsAuthenticated(true));
  }
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header></Header>
      <div className="flex flex-1">
        <MainSidebar />
        <Outlet></Outlet>
      </div>

      {/* <Footer></Footer> */}
    </div>
  );
};

export default AppLayout;
