import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    role: string;
  } | null;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuth: (state) => {
      // Check for existing cookies
      const cookies = document.cookie.split(";");
      state.isAuthenticated = cookies.some((cookie) =>
        cookie.trim().startsWith("access_token=")
      );
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.isAuthenticated = true;
        state.user = payload.user;
      }
    );
  },
});

export const { checkAuth } = authSlice.actions;
export default authSlice.reducer;
