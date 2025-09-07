import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCategory } from "../services/categoryServices";
import { useNavigate } from "react-router";

export const useAddCategory = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      navigate("/admin/category/")
      toast.success("Category Added.");
    },
    onError: () => {},
  });
};
