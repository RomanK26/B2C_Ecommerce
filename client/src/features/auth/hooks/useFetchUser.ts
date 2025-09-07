import { useQuery } from "@tanstack/react-query";
import { authMe } from "../services/authService";

export const useFetchUser = () => {
  const data = useQuery({
    queryKey: ["authUser"],
    queryFn: authMe,
  });
};
