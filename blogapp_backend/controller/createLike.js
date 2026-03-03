const LikeModel = require("../models/LikeModel");

const createLike = async (req, res, next) => {
  try {
    const { post, user } = req.body;
    const likeObject = new LikeModel({ post: post, user: user });

    const savedLike = await (
      await likeObject.save()
    ).populate([
      {
        path: "user",
        model: "User",
      },
      {
        path: "post",
        model: "Post",
      },
    ]);

    req.body.post = post._id;
    req.body.like = savedLike._id;

    // console.log("Printing saved like : ", savedLike);

    next();

    // return res.status(200).json({
    //   success: true,
    //   message: ` You have liked the post ${post.heading} successfully`,
    //   savedLike: savedLike,
    // });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while Liking the post !!",
    });
  }
};

module.exports = createLike;
