import { useMutation } from "@tanstack/react-query";
import React from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { addProduct } from "../services/productService";

const UseAddProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      console.log("added");
      navigate("/admin/products/");
      toast.success("Product successfully added");
    },
    onError: (e) => {
      console.log(`error`, e);
    },
  });
};

export default UseAddProduct;
