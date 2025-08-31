import { useQuery } from "@tanstack/react-query";
import {
  fetchProductDetail,
  fetchProducts,
} from "@/features/products/services/productService.ts";

const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    
  });
};

export default useProducts;

export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: [`product_${id}`, id],
    queryFn: () => fetchProductDetail(id),
  });
};
