import { useMutation } from "@tanstack/react-query";
import { addOrder } from "../services/orderServices";
import toast from "react-hot-toast";

export const UseAddOrder = () => {
  return useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      toast.success("Order placed successfull.");
    },
    onError: (e) => {
        console.log(e)
      toast.error(e.message)
    },
  });
};
