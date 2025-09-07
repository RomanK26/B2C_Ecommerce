import { Button } from "@/components/ui/button"; // if you’re using shadcn/ui
import CartDetail from "@/features/cart/components/CartDetail";
import { useFetchAllCartItems } from "@/features/cart/hooks/useFetchAllCartItems";

import { UseAddOrder } from "@/features/orders/hooks/useAddOrder";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { data, isLoading } = useFetchAllCartItems();
  console.log("data", data);

  const { mutate } = UseAddOrder();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOrder = () => {
    if (!data?.data?.length) return;

    mutate({ items: data.data });
  };
  return (
    <div className="flex w-full max-w-3xl flex-col justify-center bg-yellow-100 p-6">
      <h2 className="mb-6 text-2xl font-bold">
        <span>
          <ShoppingCart></ShoppingCart> My Cart
        </span>
      </h2>

      <div className="flex flex-col gap-4">
        {data?.data?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm transition hover:shadow-md"
          >
            <CartDetail data={item} />
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="mt-8 flex items-center justify-between border-t pt-4">
        <h3 className="text-lg font-semibold tracking-wider">
          Total: $
          {data?.data
            ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={handleOrder}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
