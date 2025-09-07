import { Button } from "@/components/ui/button"; // if you’re using shadcn/ui
import CartDetail from "@/features/cart/components/CartDetail";
import { useFetchAllCartItems } from "@/features/cart/hooks/useFetchAllCartItems";

import { UseAddOrder } from "@/features/orders/hooks/useAddOrder";
import { Divide, ShoppingCart } from "lucide-react";

const CartPage = () => {
  const { data, isLoading } = useFetchAllCartItems();

  const { mutate } = UseAddOrder();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleOrder = () => {
    if (!data?.data?.length) return;

    mutate({ items: data.data });
  };
  return (
    <div className="mx-auto flex w-full flex-col items-start bg-white">
      <div className="mb-6 flex w-full items-center justify-center gap-2 text-2xl leading-14 font-bold">
        <ShoppingCart></ShoppingCart> <p>My Cart</p>
      </div>

      <div className="flex w-full flex-1 flex-col gap-4 px-4">
        {data?.data?.length < 1 && (
          <p className="text-center text-gray-500">No items found.</p>
        )}

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
      <div className="mt-8 mb-6 flex items-center justify-between space-x-4 self-end border-t pt-4 pr-6 pl-4">
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
