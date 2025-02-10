import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./auth";

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    email?: string;
    role?: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true;
          state.user = payload.user;
        }
      )
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.isAuthenticated = true;
          state.user = payload.user;
        }
      )
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
