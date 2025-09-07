import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import MainSidebar from "@/components/MainSidebar";

const AppLayout = () => {
  return (
    <div className="flex h-screen min-h-screen flex-col">
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
