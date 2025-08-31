// import CartDetail from "@/features/cart/components/CartDetail";
// import { useFetchAllCartItems } from "@/features/cart/hooks/useFetchAllCartItems";
// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";

// const CartPage = () => {
//   const { data, isLoading } = useFetchAllCartItems();
//   console.log(data)
//   const navigate = useNavigate();
//   const isAuthenticated = useSelector((state) => state.auth);
//   if (!isAuthenticated) {
//     navigate("/login");
//   }
//   if (isLoading) {
//     return <div>Loading....</div>;
//   }
//   return (
//     <div className="">
//       <h2>My Carts</h2>
//       <div className="flex flex-col gap-2">
//         {
//           data?.data.map((item,index)=>{
//             return (<CartDetail data={item}/>)
//           })
//         }

//       </div>
//     </div>
//   );
// };

// export default CartPage;


import { Button } from "@/components/ui/button"; // if you’re using shadcn/ui
import { ShoppingCart, Trash2 } from "lucide-react";

const CartPage = ({ data }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6"><span><ShoppingCart></ShoppingCart> My Cart</span></h2>

      <div className="flex flex-col gap-4">
        {data?.data?.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 rounded-xl border p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4">
              {/* <img
                src={item.image || "/placeholder.png"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              /> */}
              <div>
                <h3 className="font-semibold text-lg">{item.product_name}</h3>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button className="px-2 py-1">-</button>
                <span className="px-3">{item.quantity}</span>
                <button className="px-2 py-1">+</button>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="rounded-full"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="mt-8 flex justify-between items-center border-t pt-4">
        <h3 className="text-lg font-semibold">
          Total: $
          {data?.data
            ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </h3>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage