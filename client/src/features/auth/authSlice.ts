import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      state.isLoading = false;
    },
  },
});

export const { logout, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
