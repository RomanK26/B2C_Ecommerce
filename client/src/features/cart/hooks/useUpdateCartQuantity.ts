import { api } from "@/services/api.config";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  const updateQuantity = async (itemId: number, newQty: number) => {
    console.log("update quantity");
    queryClient.setQueryData(["cart_items"], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        data: old.data.map((item: any) =>
          item.id === itemId ? { ...item, quantity: newQty } : item,
        ),
      };
    });
    await api.patch(`/api/cart/items/${itemId}/`, { quantity: newQty },{
      withCredentials:true
    });
  };

  return updateQuantity;
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  const updateQuantity = async (itemId: number) => {
    queryClient.setQueryData(["cart_items"], (old: any) => {
      if (!old) return old;

      return {
        ...old,
        data: old.data.filter((item: any) => item.id !== itemId),
      };
    });
    await api.delete(`/api/cart/items/${itemId}/`,{
      withCredentials:true
    });
  };

  return updateQuantity;
};
