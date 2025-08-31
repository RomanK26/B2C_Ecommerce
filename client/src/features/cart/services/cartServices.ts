import { api } from "@/services/api.config";
import { CloudLightning } from "lucide-react";

export const addProductToCart = async (data) => {
  // console.log('data',data)
  const cart = await api.post(`api/cart/items/`, data, {
    withCredentials: true,
  });
  console.log("cart response", cart);
  return cart;
};

export const fetchAllCartItems = async () => {
  console.log("fetchcartItems");
  const cartItems = await api.get(`api/cart/items/`, {
    withCredentials: true,
  });
  return cartItems;
};
