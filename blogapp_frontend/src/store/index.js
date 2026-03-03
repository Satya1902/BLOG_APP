import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import postReducer from "./post";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
