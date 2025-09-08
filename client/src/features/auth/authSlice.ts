import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: null,
  isLoading: true,
  userRole: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },
});

export const { logoutSuccess, setIsAuthenticated, setUserRole } = authSlice.actions;
export default authSlice.reducer;
