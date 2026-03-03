const LikeModel = require("../models/LikeModel");

exports.deleteLike = async function (req, res, next) {
  try {
    const { post, user } = req.body;
    // const likeObject = new LikeModel({ post: post, user: user });

    // let allLikes = await LikeModel.find({});
    // console.log("Size of all likes are : ", allLikes.length);

    const deletedLikeObject = await LikeModel.findOneAndDelete({
      post: post._id,
    });

    req.body.post = post?._id;
    req.body.like = deletedLikeObject?._id;

    // console.log("Deleted like is ", deletedLikeObject);
    // allLikes = await LikeModel.find({});
    // console.log(
    //   "Size of all likes after deleteing the like are : ",
    //   allLikes.length
    // );

    next();
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while Liking the post !!",
    });
  }
};
