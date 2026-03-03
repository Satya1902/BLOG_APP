import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSinglePost } from "../../store/post";

export default function Blog({ post }) {
  const [liked, setLiked] = useState(false);
  const [shortPost, setShortPost] = useState();
  let response;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isUserLikedThisPost();
    setShortPost(post.body.slice(0, 25));
  }, []);

  async function isUserLikedThisPost() {
    try {
      response = await axios
        .get(`http://localhost:4000/api/v1/isuserlikedthispost`, {
          params: {
            userid: JSON.parse(localStorage.getItem("user"))?._id,
            postid: post?._id,
          },
        })
        .then((response1) => {
          return response1;
        })
        .catch((error) => {
          return error.response;
        });
    } catch (error) {
      console.error("error", error);
    }
    setLiked(response?.data?.liked);
    return response;
  }

  async function disLikePost() {
    let likeResponse;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      likeResponse = await axios
        .post(`http://localhost:4000/api/v1/dislike`, { post, user })
        .then((response1) => {
          return response1;
        })
        .catch((error) => {
          return error.response;
        });
    } catch (error) {
      console.error("error", error);
    }
    if (likeResponse?.data?.success) {
      setLiked(false);
    } else {
      console.log("error", response?.data?.message);
      toast.error(response?.data?.message);
    }
  }

  async function likePost() {
    let likeResponse;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      likeResponse = await axios
        .post(`http://localhost:4000/api/v1/createlike`, { post, user })
        .then((response1) => {
          return response1;
        })
        .catch((error) => {
          return error.response;
        });
    } catch (error) {
      console.error("error", error);
    }
    if (likeResponse?.data?.success) {
      setLiked(true);
    } else {
      console.log("error", response?.data?.message);
      toast.error(response?.data?.message);
    }
  }

  function likeClickHandler(event) {
    event.stopPropagation();
    if (!liked) {
      likePost();
      setLiked(false);
      toast.success("You liked this post");
    } else {
      disLikePost();
      setLiked(true);
      toast.error("You have disliked this post");
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // navigate("/logout");
  }

  // console.log("Short post is : ", shortPost);

  function clickPostHandler(event) {
    event.preventDefault();
    event.stopPropagation();

    dispatch(setSinglePost(post));
    navigate(`/post/${post._id}`);
  }

  return (
    <div className="w-[30%] h-[30%] bg-gray-900 border-2 p-8 rounded-md">
      <div className="flex flex-col">
        {/* Post Handler */}
        <button
          className="flex flex-col justify-center items-center gap-2 p-2"
          onClick={clickPostHandler}
        >
          <div className="text-green-400 text-2xl mx-auto font-bold">
            {post.heading}
          </div>
          <div className="w-full flex flex-row">
            <div className="text-white mx-auto flex gap-1">
              <div className="opacity-50">
                {shortPost}
                {post.body.length > 25 ? " ...more" : "."}
              </div>
            </div>
          </div>
        </button>
        {/* Like and comment */}
        <div className="flex justify-around mt-5">
          <div className="flex gap-2 text-red-400">
            <button onClick={likeClickHandler}>
              {liked ? <FcLike size={22} /> : <FcLikePlaceholder size={22} />}
            </button>
            <NavLink to={`/likes/${post?._id}`} className="text-md">
              {post.likes.length}
            </NavLink>
          </div>
          <NavLink
            to={`/comments/${post?._id}`}
            className="flex gap-2 relative text-green-200"
          >
            <FaRegCommentDots size={24} />
            <div>{post.comments.length}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
