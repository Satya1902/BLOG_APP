const PostModel = require("../models/PostModel");

const createPost = async (req, res) => {
  try {
    const { heading, body, user } = req.body;
    const postObject = new PostModel({ heading, body, user });

    const savedPost = await postObject.save();
    console.log("Pring saved post : ", savedPost);

    return res.status(200).json({
      success: true,
      message: " Post has been created successully :) ",
      savedPost: savedPost,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while creating post !!",
    });
  }
};

module.exports = createPost;
