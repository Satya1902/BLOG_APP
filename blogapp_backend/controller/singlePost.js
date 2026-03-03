const PostModel = require("../models/PostModel");

const allLikesOfOnePost = async (req, res) => {
  try {
    const { id, name } = req.query;

    if (!id || !name) {
      return res.status(404).json({
        success: false,
        message: "Please share postid in params ",
      });
    }

    const post = await PostModel.findById({ _id: id }).populate({
      path: "likes",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `There is no post with the postid ${id}`,
      });
    }

    let likes = post.likes;
    // console.log("All likes are : ", likes);

    likes.filter((like) => {
      like.user.password = undefined;
    });

    // console.log("All likes after updates : ", likes);
    // res.body = likes;

    return res.status(200).json({
      success: true,
      message: "Successfull",
      likes,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching likes of particular post",
    });
  }
};

const allCommentsOfOnePost = async (req, res) => {
  try {
    const { id, name } = req.query;

    if (!id || !name) {
      return res.status(404).json({
        success: false,
        message: "Please share postid in params ",
      });
    }

    const post = await PostModel.findById({ _id: id }).populate({
      path: "comments",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `There is no post with the postid ${id}`,
      });
    }

    let comments = post.comments;
    // console.log("All comments are : ", comments);

    comments.filter((comment) => {
      comment.user.password = undefined;
    });

    // console.log("All likes after updates : ", likes);
    // res.body = likes;

    return res.status(200).json({
      success: true,
      message: "Successfull",
      comments,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching likes of particular post",
    });
  }
};

module.exports = { allLikesOfOnePost, allCommentsOfOnePost };
