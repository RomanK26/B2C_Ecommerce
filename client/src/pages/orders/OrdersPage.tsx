import React from "react";
import { useFetchAllOrders } from "@/features/orders/hooks/useFetchAllOrders";
import { Loader2 } from "lucide-react";
import OrderCard from "@/features/orders/components/OrderCard";

const OrdersPage = () => {
  const { data: orders, isPending } = useFetchAllOrders();
  console.log(orders)

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">
        No orders found.
      </div>
    );
  }

  return (
    <div className="flex-1 contain-content  p-6">
      <h1 className="mb-2 text-2xl text-center font-semibold">My Orders</h1>
      <p className="mb-6 text-gray-500">Track and manage your order history</p>

      <div className="w-full space-y-6">
        {orders?.data.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
