const express = require("express");

const router = express.Router();

const mailSenderController = require("../controller/MailSenderController");
// const otpController = require("../controller/SignupController");
const createUserController = require("../controller/UserController");
const LoginController = require("../controller/LoginCotroller");
const { Auth, isUser } = require("../middlewares/Auth");
// const { Auth, isUser, isAdmin } = require("../middlewares/Auth");
// const fileUploader = require("../controller/FileUploader");
// const multer = require("multer");
const createPost = require("../controller/PostController");
const createComment = require("../controller/createComment");
const { updatePost } = require("../controller/UpdatePost");
const createLike = require("../controller/createLike");
const getAllPosts = require("../controller/AllPosts");

const {
  allLikesOfOnePost,
  allCommentsOfOnePost,
} = require("../controller/singlePost");
const isUserLikedThePost = require("../controller/isUserLikedThePost");

const disLikePost = require("../controller/disLikePost");
const { deleteLike } = require("../controller/deleteLike");
const { getAllSearchedData } = require("../controller/searchController");

router.post("/sendMail", mailSenderController);

// router.post("/storeOtp",otpController);

router.post("/createuser", createUserController);
router.post("/login", LoginController);

// router.post("/auth",Auth,(req,res)=>{return res.status(200).json({success : true,message : "Token varified successfully "})});

// router.post("/user",Auth,isUser,(req,res)=>{return res.status(200).json({success : true,message : "Hi user, Welcome to the BLOGAPP "})});
// router.post("/admin",Auth,isAdmin,(req,res)=>{return res.status(200).json({success : true,message : "Hi Admin, Welcome to the BLOGAPP "})})

// const storage = multer.memoryStorage();
// const upload = multer({storage});
// router.post("/imageupload",upload.single('image'),fileUploader);

router.post("/createpost", createPost);
router.post("/createcomment", createComment, updatePost);
router.post("/updatepost", updatePost);

// router.post("/createlike", createLike);
router.get("/getallposts", getAllPosts);

router.get("/likes", allLikesOfOnePost);
router.get("/comments", allCommentsOfOnePost);

router.get("/isuserlikedthispost", isUserLikedThePost);
router.post("/createlike", createLike, updatePost);
router.post("/dislike", deleteLike, disLikePost);

router.get("/searchdata", getAllSearchedData);

module.exports = router;
