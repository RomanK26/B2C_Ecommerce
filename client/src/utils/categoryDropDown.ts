import useFetchAllCategory from "@/features/category/hooks/useFetchAllCategory";

export function useCategory() {
  const { data } = useFetchAllCategory();
  let category = data
    ? data.data.map((item, index) => {
        return { id: item.id, name: item.name };
      })
    : [];

  return category;
}
