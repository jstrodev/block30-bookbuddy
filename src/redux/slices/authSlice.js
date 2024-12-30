/**
 * authSlice.js
 *
 * Purpose:
 * Handles authentication state with JWT. Manages the user's login status and
 * token storage, and provides actions for login and logout.
 */

// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/users/me",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state?.auth?.user ?? null;
export const selectCurrentToken = (state) => state?.auth?.token ?? null;

export const { useLoginMutation, useRegisterMutation, useGetMeQuery } = authApi;

export default authSlice.reducer;
