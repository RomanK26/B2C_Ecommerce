import { useFetchAllOrders } from "@/features/orders/hooks/useFetchAllOrders";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TableRecordOrders } from "@/features/orders/components/TableRecordOrders";

const AdminOrdersPage = () => {
  const { data, isLoading } = useFetchAllOrders();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2 className="antialiased">Orders</h2>
      <div>
        {" "}
        <Table>
          <TableCaption>A list of all your orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S.N</TableHead>
              <TableHead>Order Id</TableHead>
              <TableHead>User</TableHead>
              <TableHead>No of products</TableHead>
              <TableHead>Ordered at</TableHead>
              <TableHead>Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item, index) => {
              return (
                <TableRecordOrders
                  key={item.id}
                  item={item}
                  index={index}
                ></TableRecordOrders>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
