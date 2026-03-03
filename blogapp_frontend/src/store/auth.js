import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") && localStorage.getItem("token") !== "undefined" 
         ? JSON.parse(localStorage.getItem("token")) 
         : null,
  user: localStorage.getItem("user") && localStorage.getItem("user") !== "undefined" 
         ? JSON.parse(localStorage.getItem("user")) 
         : null,
  loading: false,
  email: null,
  otp: null, // Added missing otp state
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },
    setUser(state, value) {
      state.user = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setEmail(state, value) {
      state.email = value.payload;
    },
    // New action to fix SignupPage and VarifyEmailPage errors
    setOtp(state, value) {
      state.otp = value.payload;
    },
    // New action to fix VarifyEmailPage error
    removeOtp(state) {
      state.otp = null;
    },
    // New action to fix SignupProfilePage error
    removeEmail(state) {
      state.email = null;
    },
    resetAuth(state) {
      state.token = null;
      state.user = null;
      state.email = null;
      state.otp = null;
    }
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
  resetAuth 
} = authSlice.actions;

export default authSlice.reducer;
