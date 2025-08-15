import { type SignupFormInputs } from "@/features/auth/schemas/authSchemas";
import { api } from "@/services/api.config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";



export const signup = async (data: SignupFormInputs) => {
  const res = await api.post(`/api/auth/signup/`, data);
  return res.data;
};
