import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const isAuthenticated = useSelector();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default AppLayout;
