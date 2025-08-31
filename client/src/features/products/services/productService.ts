import { api } from "@/services/api.config";

export const fetchProducts = async () => {
  const products = await api.get("/api/products/");
  return products;
};

export const fetchProductDetail = async (id: number) => {
  const productDetail = await api.get(`/api/products/${id}/`);
  return productDetail;
};


