import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import MainSidebar from "@/components/MainSidebar";

const AppLayout = () => {
  // const isAuthenticated = useSelector();
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <div className="min-h-screen flex flex-col h-screen">
      <Header></Header>
      <div className="flex flex-1 overflow-auto ">
        <MainSidebar />
        <Outlet></Outlet>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AppLayout;
