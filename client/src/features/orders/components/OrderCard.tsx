import React from "react";
import { Calendar, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderCard = ({ order }) => {
  return (
    <div className="border rounded-xl bg-white shadow-sm p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Order #{order.id}</h2>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            statusStyles[order.status] || "bg-gray-100 text-gray-600"
          }`}
        >
          {order.status || "Pending"}
        </span>
      </div>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 space-y-1 mb-3">
        <p className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          {new Date(order.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </p>
        <p className="flex items-center gap-2">
          <Package className="w-4 h-4" />
          {order.items.length} item(s)
        </p>
        <p className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />${order.total_price}
        </p>
      </div>

      {/* Items */}
      <div className="mb-4">
        <p className="font-medium mb-2">Items:</p>
        <div className="flex flex-wrap gap-2">
          {order.items.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-sm rounded-lg"
            >
              {item.product} (x{item.quantity})
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">
          ${order.total_price.toFixed(2)}
          <span className="text-gray-500 text-sm ml-1">Total</span>
        </p>
        <Button className="rounded-lg">View Details</Button>
      </div>
    </div>
  );
};

export default OrderCard;
