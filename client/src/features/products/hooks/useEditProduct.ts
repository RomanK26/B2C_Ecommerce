import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { editProduct } from "../services/productService";
import toast from "react-hot-toast";

export const useEditProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => {
      console.log("Product edited");
      toast.success("Product Edited successfully.");
      navigate("/admin/products/");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};
