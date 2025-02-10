import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface AuthCredentials {
  email: string;
  password: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: "include", // This is important for handling cookies
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthCredentials>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
