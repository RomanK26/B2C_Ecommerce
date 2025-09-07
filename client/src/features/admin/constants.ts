import { Home, Package, ShoppingCart, Users, LineChart } from "lucide-react";

export const menuItems = [
  { to: "./", icon: Home, label: "Home" },
  {
    label: "Products",
    icon: Package,
    to: "./products",
  },
  {
    label: "Category",
    icon: Package,
    to: "./category",
  },
  { to: "./orders", icon: ShoppingCart, label: "Orders", badge: 6 },
  { to: "./users", icon: Users, label: "User Management" },
  { to: "./analytics", icon: LineChart, label: "Analytics" },
];
