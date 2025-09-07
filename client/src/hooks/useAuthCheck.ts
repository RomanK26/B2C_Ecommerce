import { setIsAuthenticated } from "@/features/auth/authSlice";
import { api } from "@/services/api.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const useAuthCheck = () => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      console.log("inside verifyAuth");
      try {
        const res = await api.get("/api/auth/me/");
        dispatch(setIsAuthenticated(true));
      } catch (err) {
        dispatch(setIsAuthenticated(false));
        navigate("/login/", { replace: true });
      }
    };

    if (isAuthenticated !== true) {
      verifyAuth();
    }
  }, [isAuthenticated, dispatch, navigate]);

  return { isAuthenticated, isLoading };
};
