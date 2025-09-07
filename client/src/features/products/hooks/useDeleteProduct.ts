import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../services/productService";
import toast from "react-hot-toast";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["products"] });
      toast.success("Product deleted.");
    },
    onError: () => {},
  });
};