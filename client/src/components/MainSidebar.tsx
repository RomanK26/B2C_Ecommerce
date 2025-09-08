// import { consumerSidebar } from "@/constants/sidebarConstants";
import { NavLink } from "react-router";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import useFetchAllCategory from "@/features/category/hooks/useFetchAllCategory";

export default function MainSidebar() {
  const [collapse, setCollapse] = useState(false);
  const { data, isLoading, error } = useFetchAllCategory();

  const categories = Array.isArray(data?.data) ? data.data : [];

  const handleCollapse = () => setCollapse(!collapse);

  return (
    <aside className="relative m-3 flex h-fit w-48 flex-col border-r bg-white shadow-sm">
      <div
        className="flex w-full cursor-pointer items-center justify-between p-2"
        onClick={handleCollapse}
      >
        <h2 className="text-lg font-semibold tracking-wide">Category</h2>
        {collapse ? <ChevronRight className="size-6" /> : <ChevronDown className="size-6" />}
      </div>

      {!collapse && (
        <div>
          {isLoading ? (
            <div className="p-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="p-2 text-red-500">Failed to load categories</div>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="border pr-3 text-end leading-12 font-normal tracking-wider hover:bg-gray-800 hover:text-white"
              >
                {category.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No categories found</div>
          )}
        </div>
      )}
    </aside>
  );
}