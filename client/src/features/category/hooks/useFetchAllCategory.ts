import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "@/features/category/services/categoryServices";

const useFetchAllCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
};

export default useFetchAllCategory;
