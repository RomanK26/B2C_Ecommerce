import { consumerSidebar } from "@/constants/sidebarConstants";
import { NavLink } from "react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, User2 } from "lucide-react";

export default function MainSidebar() {
  const [collapse, setCollapse] = useState(false);
  const handleCollapse = () => setCollapse(!collapse);

  return (
    <aside
      className={`relative  h-full flex flex-col justify-between border-r bg-white shadow-sm transition-all duration-500 ease-in-out ${collapse ? "w-16" : "w-48"}`}
    >
      <div>
        {/* Header / Collapse Button */}
        <div className="flex justify-end p-3">
          <button
            onClick={handleCollapse}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-100 text-emerald-700 transition-colors hover:bg-emerald-200"
          >
            {collapse ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Body */}
        <ul className="flex-1 space-y-1 px-2">
          {consumerSidebar.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-all duration-300 ease-in-out ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-emerald-100 hover:text-emerald-800"
                  }`
                }
              >
                {/* Icon */}
                <item.icon
                  className={`transition-all duration-300 ${collapse ? "mx-auto h-6 w-6" : "h-5 w-5"}`}
                />

                {/* Label (show/hide based on collapse) */}
                {!collapse && (
                  <span className="text-sm font-medium transition-opacity duration-300">
                    {item.label}
                  </span>
                )}

                {/* Tooltip (only when collapsed) */}
                {collapse && (
                  <span className="absolute top-1/2 left-full ml-3 origin-left -translate-y-1/2 scale-90 rounded-md bg-emerald-600 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer (example: settings/logout) */}
      <div className="items-end border-t p-3">
        <button className="flex w-full items-center justify-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700 transition-colors hover:bg-emerald-100">
          <User2 className="h-8"></User2>
        </button>
      </div>
    </aside>
  );
}
