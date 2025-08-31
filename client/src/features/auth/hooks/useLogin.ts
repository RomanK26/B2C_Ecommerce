import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "@/features/auth/services/authService";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Login Successfull", {
        duration: 2000,
      });
      dispatch(setIsAuthenticated(true))
      navigate("/");
    },
    onError: (error: any) => {
      console.log("Error e", error);
      const message = error?.response?.data?.email || "Login failed";

      toast.error(message);
    },
    retry: 1,
  });
};
