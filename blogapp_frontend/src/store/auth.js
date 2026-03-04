// src/store/auth.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

/**
 * Safely decode a JWT token
 * @param {string} token JWT token string
 * @returns decoded payload or null
 */
const getUserFromToken = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error.message);
    localStorage.removeItem("token"); // remove bad token
    localStorage.removeItem("user"); // remove associated user
    return null;
  }
};

/**
 * Safely parse user JSON from localStorage
 */
const getUserFromStorage = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr || userStr === "undefined") return null;

  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Invalid user in localStorage:", error.message);
    localStorage.removeItem("user");
    return null;
  }
};

/**
 * Initialize auth state safely from localStorage
 */
const tokenFromStorage =
  localStorage.getItem("token") && localStorage.getItem("token") !== "undefined"
    ? localStorage.getItem("token")
    : null;

const initialState = {
  token: tokenFromStorage,
  user: getUserFromStorage(), // <-- safe initialization
  loading: false,
  email: null,
  otp: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Save token to Redux and localStorage
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    // Save user object to Redux and localStorage
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log("User has been set to localStorage:", action.payload);
    },

    // Loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },

    // Email for OTP flow
    setEmail(state, action) {
      state.email = action.payload;
    },

    // OTP
    setOtp(state, action) {
      state.otp = action.payload;
    },

    removeOtp(state) {
      state.otp = null;
    },

    removeEmail(state) {
      state.email = null;
    },

    // Reset auth completely
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
