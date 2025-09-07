import { NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";

const AdminSidebar = ({ menuItems }: any) => (
  <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
    {menuItems.map((item: any) => (
      <NavLink
        to={item.to}
        key={item.id}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2 transition ${
            isActive
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:text-primary"
          }`
        }
      >
        <item.icon className="h-4 w-4" />
        {item.label}
        {item.badge && (
          <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full">
            {item.badge}
          </Badge>
        )}
      </NavLink>
    ))}
  </nav>
);

export default AdminSidebar;
