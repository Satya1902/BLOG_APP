import { createSlice } from "@reduxjs/toolkit";
import { safeParseJSON } from "../utils/helper";

const initialState = {
  allPosts: safeParseJSON(localStorage.getItem("allpost")),
  personalPosts: safeParseJSON(localStorage.getItem("personalposts")),
  singlePost: safeParseJSON(localStorage.getItem("singlepost")),
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
      localStorage.setItem("allpost", JSON.stringify(state.allPosts));
    },
    setPersonalPosts: (state, action) => {
      state.personalPosts = action.payload;
      localStorage.setItem(
        "personalposts",
        JSON.stringify(state.personalPosts),
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
      localStorage.removeItem("singlepost");
    },
  },
});

export const { setAllPosts, setPersonalPosts, setSinglePost, resetPosts } =
  postSlice.actions;

export default postSlice.reducer;
