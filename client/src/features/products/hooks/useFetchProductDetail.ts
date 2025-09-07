import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "../services/productService";

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: [`product_${id}`, id],
    queryFn: () => fetchProductDetail(id),
  });
};