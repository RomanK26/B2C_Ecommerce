import {
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { TableRecordCategory } from "@/features/admin/components/TableRecord";
import useFetchAllCategory from "@/features/category/hooks/useFetchAllCategory";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import React from "react";
import { Link, useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminCategory = () => {
  const { data, isLoading } = useFetchAllCategory();
  console.log(data);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("./add");
  };
  return (
    <div>
      <div className="flex justify-between p-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="../">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/admin/category/">Category</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={handleAddCategory}>
          <Plus></Plus>Add Category
        </Button>
      </div>
      <Table>
        <TableCaption>A list of all your Category.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item, index) => {
            return (
              <TableRecordCategory
                key={item.id}
                item={item}
                index={index}
              ></TableRecordCategory>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCategory;
