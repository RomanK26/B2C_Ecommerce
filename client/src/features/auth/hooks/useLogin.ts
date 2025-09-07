import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "@/features/auth/services/authService";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated } from "../authSlice";

export const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login Successfull", {
        duration: 2000,
      });
      console.log("isAuthenticated status in login", isAuthenticated);
      // dispatch(setIsAuthenticated(true));
      console.log("data inside success");
      if (data.role === "customer") {
        navigate("/");
      } else if (data.role === "admin") {
        navigate("/admin/");
      }
    },
    onError: (error: any) => {
      console.log("Error e", error);
      const message = error?.response?.data?.email || "Login failed";

      toast.error(message);
    },
    retry: 1,
  });
};
