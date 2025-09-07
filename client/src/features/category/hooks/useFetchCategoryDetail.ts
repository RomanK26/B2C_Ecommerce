import { useQuery } from "@tanstack/react-query";
import { fetchCategoryDetail } from "../services/categoryServices";

export const useFetchCategoryDetail = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => fetchCategoryDetail(id),
    enabled: !!id,
  });
};
