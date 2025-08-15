import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { signup } from "@/features/auth/services/authService";
import toast from "react-hot-toast";

export const useSignup = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log(data);

      toast.success("Successfully Registered user!", {});
      navigate("/login");
    },
    onError: (error: any) => {
      console.log("Error e", error);
      const message = error?.response?.data?.email || "Signup failed";

      toast.error(message);
    },
  });
  return mutation;
};
