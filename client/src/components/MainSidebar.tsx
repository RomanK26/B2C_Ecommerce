import { consumerSidebar } from "@/constants/sidebarConstants";
import { NavLink } from "react-router";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import useFetchAllCategory from "@/features/category/hooks/useFetchAllCategory";

export default function MainSidebar() {
  const [collapse, setCollapse] = useState(false);
  const { data } = useFetchAllCategory();
  const handleCollapse = () => setCollapse(!collapse);
  return (
    <aside
      className={
        "relative m-3 flex h-fit w-48 flex-col border-r bg-white shadow-sm"
      }
    >
      <div
        className="flex w-full cursor-pointer items-center justify-between p-2"
        onClick={handleCollapse}
      >
        <h2 className="text-lg font-semibold tracking-wide">Category</h2>
        {collapse ? (
          <ChevronRight className="size-6" />
        ) : (
          <ChevronDown className="size-6" />
        )}
      </div>
      {!collapse && (
        <div>
          {data?.data.map((category) => (
            <div
              key={category.id}
              className="border pr-3 text-end leading-12 font-normal tracking-wider hover:bg-gray-800 hover:text-white"
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
