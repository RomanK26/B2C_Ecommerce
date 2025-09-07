import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password changed.");
      navigate(-1);
    },
    onError: (e) => {
      toast.error(e.response.data.old_password[0]);
    },
  });
};
