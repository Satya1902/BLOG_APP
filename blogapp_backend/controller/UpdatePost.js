const CommentModel = require("../models/CommentModel");
const LikeModel = require("../models/LikeModel");
const PostModel = require("../models/PostModel");

exports.updatePost = async (req, res) => {
  try {
    const postId = req.body.post;
    const commentId = req.body.comment;
    const likeId = req.body.like;

    // console.log("Printing post,comment and like", postId, commentId, likeId);

    const post = await PostModel.findById({ _id: postId });
    let comment;
    if (commentId) comment = await CommentModel.findById(commentId);
    let like;
    if (likeId) like = await LikeModel.findById(likeId);

    // console.log("Printing post Id and post : ", postId, post);

    let updatedPost = {};

    // if (comment && like) {
    //   console.log("Heloo inside both ");
    //   updatedPost = await PostModel.findByIdAndUpdate(
    //     { _id: post._id },
    //     { $push: { comments: comment._id } },
    //     { $push: { likes: like._id } },
    //     { new: true }
    //   ).populate([
    //     {
    //       path: "comments",
    //       model: "Comment",
    //     },
    //     {
    //       path: "likes",
    //       model: "Like",
    //     },
    //   ]);
    //   console.log("Printing updated post : ", updatedPost);
    // }
    if (comment) {
      updatedPost = await PostModel.findByIdAndUpdate(
        { _id: post._id },
        { $push: { comments: comment._id } },
        { new: true }
      ).populate("comments");
      // console.log("Printing updated post : ", updatedPost);
      return res.status(200).json({
        success: true,
        message: "Comment has been updated on post successully :) ",
        updatedPost: updatedPost,
      });
    } else if (like) {
      updatedPost = await PostModel.findByIdAndUpdate(
        { _id: post._id },
        { $push: { likes: like._id } },
        { new: true }
      ).populate("likes");
      // console.log("Printing updated post : ", updatedPost);
      return res.status(200).json({
        success: true,
        message: "Like has been updated on post successully :) ",
        updatedPost: updatedPost,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: " like or comment field is empty !!",
      });
    }

    return res.status(200).json({
      success: true,
      message: " Post has been updated successully :) ",
      updatedPost: updatedPost,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while updating post !!",
    });
  }
};
