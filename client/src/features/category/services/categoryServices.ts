import { api } from "@/services/api.config";

export const addCategory = async (data) => {
  const response = api.post("/api/category/", data);
  return response;
};

export const fetchCategory = async () => {
  return await api.get("/api/category/");
};

export const fetchCategoryDetail = async (id) => {
  return await api.get(`/api/category/${id}/`);
};

export const deleteCategory = async (id) => {
  return await api.delete(`/api/category/${id}/`);
};

export const updateCategory = async ({ id, values }) => {
  console.log("inside update", values);
  return await api.patch(`/api/category/${id}/`, values, {
    withCredentials: true,
  });
};
