import { TableCell, TableRow } from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Pencil, Trash } from "lucide-react";
import { useDeleteCategory } from "../hooks/useDeleteCategory";
import { useNavigate } from "react-router";

export const TableRecordCategory = ({ item, index }) => {
  const { mutate: deleteCategory } = useDeleteCategory();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    deleteCategory(id);
  };

  const handleEdit = (id) => {
    console.log("inside handle edit", id);
    navigate(`/admin/category/edit/${id}/`);
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{item.id}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.description}</TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="text-yellow-600 focus:bg-yellow-100 focus:text-yellow-700"
              onClick={() => handleEdit(item.id)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 focus:bg-red-100 focus:text-red-700"
              onClick={() => handleDelete(item.id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};