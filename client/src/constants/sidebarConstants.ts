import {
  House,
  Box,
  Blocks,
  ShoppingCart,
  ListCheck,
  LayoutDashboard,
} from "lucide-react";

export const consumerSidebar = [
  {
    label: "Home",
    icon: House,
    path: "/",
  },
  {
    label: "Categories",
    icon: Blocks,
    path: "categories/",
  },
  {
    label: "Carts",
    icon: ShoppingCart,
    path: "carts/",
  },
  {
    label: "Orders",
    icon: ListCheck,
    path: "orders/",
  },
];

export const adminSidebar = [
  {
    label: "Home",
    icon: House,
    path: "/",
  },
  {
    label: "Products",
    icon: Box,
    path: "products/",
  },
  {
    label: "Orders",
    icon: ListCheck,
    path: "orders/",
  },
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "dashboard/",
  },
];
