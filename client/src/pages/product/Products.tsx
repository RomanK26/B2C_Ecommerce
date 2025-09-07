import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import useFetchAllProducts from "@/features/products/hooks/useFetchAllProducts";
import { TableRecordProduct } from "@/features/admin/components/TableRecord";
import { useSelector } from "react-redux";

const Products = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log("product is authenticated", isAuthenticated);
  const navigate = useNavigate();
  const { data: productData, isLoading } = useFetchAllProducts();
  const handleAddProduct = () => {
    navigate("./add");
  };
  return (
    <>
      <div className="flex justify-between p-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link to="../">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Link to="/admin/products">Products</Link>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={handleAddProduct}>
          <Plus></Plus>Add Product
        </Button>
      </div>
      <Table>
        <TableCaption>A list of all your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S.N</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Stock Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productData?.data.length>0 ?productData?.data?.map((item, index) => {
            return (
              <TableRecordProduct
                key={item.id}
                item={item}
                index={index}
              ></TableRecordProduct>
            );
          }):"No Products"}
        </TableBody>
      </Table>
    </>
  );
};

export default Products;
