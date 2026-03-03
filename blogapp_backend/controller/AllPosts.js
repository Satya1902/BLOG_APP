const PostModel = require("../models/PostModel");

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find({})
      .populate({
        path: "likes",
        populate: {
          path: "user",
        },
      })
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      })
      .populate("user");
    // console.log("Pring saved post : ",allPosts);

    return res.status(200).json({
      success: true,
      message: " All Posts have been fetched successully :) ",
      allPosts: allPosts,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while fetching all posts !!",
    });
  }
};

module.exports = getAllPosts;
