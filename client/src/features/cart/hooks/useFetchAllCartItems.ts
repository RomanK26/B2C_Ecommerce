import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAllCartItems } from "@/features/cart/services/cartServices";

export const useFetchAllCartItems = () => {
  return useQuery({
    queryKey: ["cart_items"],
    queryFn: fetchAllCartItems,
    retry: 1,
  });
};
