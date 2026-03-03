import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  email: localStorage.getItem("email")
    ? JSON.parse(localStorage.getItem("email"))
    : null,
  otp: localStorage.getItem("otp")
    ? JSON.parse(localStorage.getItem("otp"))
    : null,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("email", JSON.stringify(state.email));
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      localStorage.setItem("otp", JSON.stringify(state.otp));
    },
    removeOtp: (state, action) => {
      state.otp = action.payload;
      localStorage.removeItem("otp");
    },
    removeEmail: (state, action) => {
      state.email = action.payload;
      localStorage.removeItem("email");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);
    },
    removeToken: (state, action) => {
      localStorage.removeItem("token");
    },
    resetAuth: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("otp");
    },
  },
});

export const {
  setUser,
  setOtp,
  setEmail,
  removeEmail,
  removeOtp,
  setToken,
  removeToken,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
