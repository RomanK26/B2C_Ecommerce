import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/features/orders/services/orderServices";

export const useFetchAllOrders = () => {
  return useQuery({
    queryKey: ["order_items"],
    queryFn: fetchOrders,
  });
};
