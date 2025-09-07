import {
  type LoginFormInputs,
  type SignupFormInputs,
} from "@/features/auth/schemas/authSchemas";
import { api } from "@/services/api.config";
import { useSelector } from "react-redux";

export const signup = async (data: SignupFormInputs) => {
  const res = await api.post(`/api/auth/signup/`, data);
  return res.data;
};

export const verify = async (uid: string, token: string) => {
  try {
    const res = await api.get(`/api/auth/verify/${uid}/${token}/`);
    if (res.status == 200) {
      return "User successfully verfied";
    }
  } catch (error) {}
};

export const login = async (data: LoginFormInputs) => {
  const res = await api.post(`/api/auth/login/`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const logout = async () => {
  await api.post("/api/auth/logout/", { withCredentials: true });
};

export const authMe = async () => {
  return api.get("api/auth/me");
};
