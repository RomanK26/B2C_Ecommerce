import { api } from "@/services/api.config";
import { Clover } from "lucide-react";

export const fetchUser = async () => {
  return await api.get("/api/profile/");
};

export const updateUser = async ({formData}) => {
  console.log("update user");
  console.log(formData);
  return await api.patch("/api/profile/", formData);
};


export const updatePassword = async (values)=>{
  console.log('form data',values)
  return await api.patch("/api/profile/change-password/", values)
}