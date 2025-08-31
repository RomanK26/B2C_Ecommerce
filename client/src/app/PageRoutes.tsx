import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "@/pages/auth/LoginPage";
import Home from "@/pages/Home";
import SignupPage from "@/pages/auth/SignupPage";
import AppLayout from "@/app/AppLayout";
import NotFound from "@/pages/NotFound";
import About from "@/components/About";
import CheckYourMail from "@/pages/auth/CheckYourMail";
import VerifyMail from "@/pages/auth/VerifyMail";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/CartPage";
import OrdersPage from "@/pages/OrdersPage";
import CategoriesPage from "@/pages/CategoriesPage";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login/" element={<LoginPage />} />
        <Route path="signup/">
          <Route index element={<SignupPage />} />
          <Route path="check-your-mail/" element={<CheckYourMail />} />
          <Route path="verify/:uid/:token" element={<VerifyMail />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/categories/" element={<CategoriesPage />} />

          <Route path="/carts/" element={<CartPage />} />
          <Route path="/orders/" element={<OrdersPage />} />
          <Route path="about/" element={<About />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
