import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Safely decode JWT
const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("user");
    return null;
  }
};

const tokenFromStorage = localStorage.getItem("token");
const userToken = localStorage.getItem("user");

const initialState = {
  token:
    tokenFromStorage && tokenFromStorage !== "undefined"
      ? tokenFromStorage
      : null,
  user:
    userToken && userToken !== "undefined" ? getUserFromToken(userToken) : null,
  loading: false,
  email: null,
  otp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", action.payload?._id || "");
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setOtp(state, action) {
      state.otp = action.payload;
    },
    removeOtp(state) {
      state.otp = null;
    },
    removeEmail(state) {
      state.email = null;
    },
    resetAuth(state) {
      state.token = null;
      state.user = null;
      state.email = null;
      state.otp = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const {
  setToken,
  setUser,
  setLoading,
  setEmail,
  setOtp,
  removeOtp,
  removeEmail,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;
