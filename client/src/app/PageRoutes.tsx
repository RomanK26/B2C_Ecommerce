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
import ProductDetail from "@/pages/product/ProductDetail";
import CartPage from "@/pages/cart/CartPage";
import OrdersPage from "@/pages/orders/OrdersPage";

import Dashboard from "@/pages/admin/Dashboard";
import AdminLayout from "./AdminLayout";
import AddProduct from "@/pages/product/AddProduct";

import EditProduct from "@/pages/product/EditProduct";
import AdminCategory from "@/pages/category/AdminCategory";
import CategoriesPage from "@/pages/category/CategoriesPage";

import EditCategory from "@/pages/category/EditCategory";
import Products from "@/pages/product/Products";
import AddCategory from "@/pages/category/AddCategory";
import AdminOrdersPage from "@/pages/orders/AdminOrdersPage";
import Customers from "@/pages/Customers";
import EditProfile from "@/pages/user/EditProfile";
import ChangePassword from "@/pages/user/ChangePassword";

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
        <Route path="/admin/" element={<AdminLayout />}>
          <Route index element={<Dashboard />}></Route>
          <Route path="products/" element={<Products />}></Route>
          <Route path="products/add/" element={<AddProduct />}></Route>
          <Route path="products/:id/" element={<EditProduct />}></Route>
          <Route path="category/" element={<AdminCategory />}></Route>
          <Route path="category/edit/:id/" element={<EditCategory />}></Route>
          <Route path="category/add/" element={<AddCategory />}></Route>
          <Route path="orders/" element={<AdminOrdersPage />}></Route>
          <Route path="customers/" element={<Customers />}></Route>
          <Route path="user-profile/">
            <Route index element={<EditProfile />}></Route>
            <Route path="change-password/" element={<ChangePassword />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
