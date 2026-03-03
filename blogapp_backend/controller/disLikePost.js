const PostModel = require("../models/PostModel");

module.exports = async function disLikePost(req, res) {
  try {
    const postId = req.body.post;
    const likeId = req.body.like;

    // console.log("Printing postid and likeid", postId, likeId);

    const post = await PostModel.findById({ _id: postId });

    post.likes = post.likes.filter((like) => {
      like._id != likeId;
    });

    await post.save();

    // console.log("post : ", post);

    return res.status(200).json({
      success: true,
      message: " Post has been updated successully :) ",
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while updating post !!",
    });
  }
};
