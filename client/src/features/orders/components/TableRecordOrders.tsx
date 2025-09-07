import { TableCell, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";

import { useNavigate } from "react-router";

import { useDeleteProduct } from "@/features/products/hooks/useDeleteProduct";

export const TableRecordOrders = ({ item, index }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.user}</TableCell>
      <TableCell>{item.items.length}</TableCell>
      <TableCell>{new Date(item.created_at).toLocaleString().split("T")[0]}</TableCell>
      <TableCell>{item.total_price}</TableCell>
    </TableRow>
  );
};

export default TableRecordOrders;
