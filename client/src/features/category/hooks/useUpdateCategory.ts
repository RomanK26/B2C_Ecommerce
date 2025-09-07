import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../services/categoryServices";
import toast from "react-hot-toast";


const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]); 
    },
     onError: () => {
      toast.error("Something went wrong")
    },
  });
};

export default useUpdateCategory;
