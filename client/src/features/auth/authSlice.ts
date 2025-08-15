import type { authState } from "@/types/auth.types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { SignupFormInputs } from "@/features/auth/schemas/authSchemas";
import { signup } from "@/features/auth/services/authService";

const initialState: authState = {
  isAuthenticated:false,
  user: null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (formData: SignupFormInputs, { rejectWithValue }) => {
    console.log('signup user')
    try {
      const response = await signup(formData);
  
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Signup failed");
    }
  },
);

const signupSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default signupSlice.reducer;
