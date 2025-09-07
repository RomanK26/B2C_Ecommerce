import { api } from "@/services/api.config";

export const fetchProducts = async () => {
  const products = await api.get("/api/products/");
  return products;
};

export const fetchProductDetail = async (id: number) => {
  const productDetail = await api.get(`/api/products/${id}/`);
  return productDetail;
};

export const deleteProduct = async (id) => {
  return await api.delete(`/api/products/${id}/`, {
    withCredentials: true,
  });
};

export const editProduct = async ({ id, data }) => {
  return await api.patch(`/api/products/${id}/`, data, {
    withCredentials: true,
  });
};

export const addProduct = async ({ formData }: { formData: FormData }) => {
  // const payload = { ...formData, category: Number(formData.category) };
 for (let [key, value] of formData.entries()) {
  console.log(key, value);
}
  return api.post("/api/products/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
