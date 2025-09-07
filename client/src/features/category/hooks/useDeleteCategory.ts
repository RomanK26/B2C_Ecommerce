import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategory } from "../services/categoryServices";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success("Category Successfully deleted.");
      queryClient.invalidateQueries(["category"]);
    },
    onError: () => {
      toast.error("Something went wrong while deleting category.");
    },
  });
};
