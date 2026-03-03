import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";

const initialState = {
  allPosts: localStorage.getItem("allpost")
    ? JSON.parse(localStorage.getItem("allpost"))
    : null,
  personalPosts: localStorage.getItem("personalposts")
    ? JSON.parse(localStorage.getItem("personalposts"))
    : null,
  singlePost: localStorage.getItem("singlepost")
    ? JSON.parse(localStorage.getItem("singlepost"))
    : null,
};

const postSlice = createSlice({
  name: "post",
  initialState: initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
      localStorage.setItem("allpost", JSON.stringify(state.allPosts));
    },
    setPersonalPosts: (state, action) => {
      state.personalPosts = action.payload;
      localStorage.setItem(
        "personalposts",
        JSON.stringify(state.personalPosts)
      );
    },
    setSinglePost: (state, action) => {
      state.singlePost = action.payload;
      localStorage.setItem("singlepost", JSON.stringify(state.singlePost));
    },
    resetPosts: (state) => {
      state.personalPosts = null;
      state.allPosts = null;
      state.singlePost = null;
      localStorage.removeItem("personalposts");
      localStorage.removeItem("allpost");
      localStorage.removeItem("post");
    },
  },
});

export const { setAllPosts, setPersonalPosts, setSinglePost, resetPosts } =
  postSlice.actions;

export default postSlice.reducer;
