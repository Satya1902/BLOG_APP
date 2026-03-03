const PostModel = require("../models/PostModel");

async function isUserLikedThePost(req, res) {
  try {
    const { userid, postid } = req.query;

    // console.log("Printing postid and userid : ", postid, userid);

    if (!userid || !postid) {
      return res.status(404).json({
        success: false,
        message: "Please share postid and userid in params ",
      });
    }

    const post = await PostModel.findById({ _id: postid }).populate("likes");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `There is no post with the postid ${postid}`,
      });
    }

    let likes = post.likes;
    // console.log("All likes are : ", likes);

    likes.filter((like) => {
      like.user?._id === userid;
    });

    // console.log("Likes after filter : ", likes);

    if (likes && likes.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Successfull",
        liked: true,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfull",
      liked: false,
    });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching likes of particular post",
    });
  }
}

module.exports = isUserLikedThePost;
