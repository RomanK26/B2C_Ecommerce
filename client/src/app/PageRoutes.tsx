import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "@/pages/auth/LoginPage";
import Home from "@/pages/Home";
import SignupPage from "@/pages/auth/SignupPage";
import AppLayout from "@/app/AppLayout";
import NotFound from "@/pages/NotFound";
import About from "@/components/About";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login/" element={<LoginPage />} />
        <Route path="signup/" element={<SignupPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="about/" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
