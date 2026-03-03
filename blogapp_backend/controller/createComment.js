const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");

const createComment = async (req, res, next) => {
  try {
    const { post, body, user } = req.body;
    const commentObject = new CommentModel({ post, body, user });

    const savedComment = await (await commentObject.save()).populate("user");
    // console.log("Pring saved post : ", savedComment);

    req.body.post = post;
    req.body.comment = savedComment;

    next();

    // return res.status(200).json({
    //   success: true,
    //   message: " Post has been created successully :) ",
    //   savedComment: savedComment,
    // });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: " Something went wrong while creating comment !!",
    });
  }
};

module.exports = createComment;
