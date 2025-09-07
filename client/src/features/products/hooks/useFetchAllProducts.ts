import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/features/products/services/productService.ts";

const useFetchAllProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
};

export default useFetchAllProducts;
