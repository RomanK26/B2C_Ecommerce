import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import {
  useDeleteCartItem,
  useUpdateCartQuantity,
} from "../hooks/useUpdateCartQuantity";

const CartDetail = ({ data }) => {
  const updateQuantity = useUpdateCartQuantity();
  const deleteCartItem = useDeleteCartItem();
  const handleQuantity = (id, qty) => {
    // console.log('handle quantity')
    updateQuantity(id, qty);
  };

  const handleRemove = (id) => {
    deleteCartItem(id);
  };
  return (
    <div>
      {/* Product Info */}
      <div className="flex items-center gap-4">
        {/* <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              /> */}
        <div>
          <h3 className="text-lg font-semibold">{data.product_name}</h3>
          <p className="text-sm text-gray-500">Price: ${data.price}</p>
        </div>
      </div>

      {/* Quantity + Actions */}
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border">
          <button
            className="px-2 py-1"
            onClick={() => handleQuantity(data.id, data.quantity - 1)}
          >
            -
          </button>
          <span className="px-3">{data.quantity}</span>
          <button
            className="px-2 py-1"
            onClick={() => handleQuantity(data.id, data.quantity + 1)}
          >
            +
          </button>
        </div>
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => handleRemove(data.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CartDetail;
