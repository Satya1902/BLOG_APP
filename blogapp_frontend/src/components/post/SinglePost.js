import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegCommentDots } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { safeParseJSON } from "../../utils/helper";

export function SinglePost() {
  const [liked, setLiked] = useState(false);
  const { singlePost } = useSelector((state) => state.post);
  const post = singlePost;
  const navigate = useNavigate();

  useEffect(() => {
    isUserLikedThisPost();
  }, []);

  const userObj = safeParseJSON(localStorage.getItem("user"));
  const userId = userObj?._id;

  const matchUser = (uid) => uid === userId;

  async function isUserLikedThisPost() {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/isuserlikedthispost`,
        { params: { userid: userId, postid: post?._id } },
      );
      setLiked(response?.data?.liked || false);
    } catch (error) {
      console.error("Error checking like:", error);
    }
  }

  async function likePost() {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/createlike`,
        { post, user: userObj },
      );
      if (response?.data?.success) setLiked(true);
    } catch (error) {
      console.error("Like Error:", error);
      toast.error("Failed to like post");
    }
  }

  async function disLikePost() {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/dislike`,
        { post, user: userObj },
      );
      if (response?.data?.success) setLiked(false);
    } catch (error) {
      console.error("Dislike Error:", error);
      toast.error("Failed to dislike post");
    }
  }

  const likeClickHandler = (event) => {
    event.stopPropagation();
    if (!liked) {
      likePost();
      toast.success("You liked this post");
    } else {
      disLikePost();
      toast.error("You have disliked this post");
    }
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-900">
      <div className="w-[80%] h-[94%] mx-auto mt-4 flex flex-col gap-2 justify-between items-center bg-gray-700">
        <div className="w-full flex flex-col gap-4 items-center text-white">
          <div className="text-blue-400 text-3xl mt-4 font-bold">
            {post.heading}
          </div>
          <div className="text-white text-md">{post.body}</div>
          <div className="w-[94%] mt-12 flex items-center justify-center text-sm opacity-70">
            {`This post was created by ${post.user.firstname} ${post.user.lastname} on ${post.createdAt}`}
          </div>
        </div>

        {/* Likes & Comments */}
        <div className="w-full mt-6 flex justify-between mb-8 text-white">
          <div className="flex gap-4 text-red-400 ml-10">
            <button onClick={likeClickHandler}>
              {liked ? <FcLike size={25} /> : <FcLikePlaceholder size={22} />}
            </button>
            <NavLink to={`/likes/${post?._id}`}>
              Total likes: {post?.likes?.length}
            </NavLink>
          </div>

          <div className="flex gap-4 text-red-400 mr-12">
            <NavLink
              to={`/comments/${post?._id}`}
              className="flex gap-2 relative text-green-200"
            >
              <FaRegCommentDots size={24} />
              <div>Total comments: {post?.comments?.length}</div>
            </NavLink>
          </div>
        </div>

        <div className="w-[90%] flex justify-evenly p-1 text-lg font-bold mb-4">
          <button
            className="ml-2 text-red-800 bg-gray-800 hover:text-red-600 border px-3 rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          {matchUser(post.user._id) && (
            <>
              <button className="text-red-800 bg-gray-800 hover:text-red-600 border px-3 rounded-md">
                Delete this post
              </button>
              <button className="text-yellow-800 bg-gray-800 hover:text-yellow-600 border px-3 rounded-md">
                Update this post
              </button>
            </>
          )}
          <NavLink to="/dashboard/my-profile">
            <button className="mr-2 text-yellow-800 bg-gray-800 hover:text-yellow-600 border px-3 py-2 rounded-md">
              Back to Dashboard
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
