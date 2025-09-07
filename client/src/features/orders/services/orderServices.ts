import { api } from "@/services/api.config";

export const addOrder = async (data) => {
  return await api.post("api/orders/", data, {
    withCredentials: true,
  });
};

export const fetchOrders = async () => {
  return await api.get("api/orders/", {
    withCredentials: true,
  });
};
