import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const useUpdateUser = () => {
    const navigate = useNavigate()
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("User updated successfull.");
      navigate('/admin/')
    },
  });
};
