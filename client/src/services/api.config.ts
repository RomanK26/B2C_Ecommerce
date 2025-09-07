import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response, // For successful responses
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await api.post("/api/auth/refresh/", null, {
          withCredentials: true,
        });

        if (refreshResponse.status === 200) {
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
