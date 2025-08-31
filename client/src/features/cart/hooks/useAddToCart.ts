import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../services/cartServices";
import toast from "react-hot-toast";

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addProductToCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${data.data.message}`)
    },
    onError: (error) => {
      console.error("Add to cart failed:", error);
      toast.error(`${data.data.message}`)
    },
  });
};
