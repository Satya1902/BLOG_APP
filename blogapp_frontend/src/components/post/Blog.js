import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSinglePost } from "../../store/post";

export default function Blog({ post }) {
  const [liked, setLiked] = useState(false);
  const [shortPost, setShortPost] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    isUserLikedThisPost();
    if (post?.body) setShortPost(post.body.slice(0, 25));
    // eslint-disable-next-line
  }, []);

  async function isUserLikedThisPost() {
    try {
      const userRaw = localStorage.getItem("user");
      // Safety check: if no user is logged in, don't try to fetch like status
      if (!userRaw || userRaw === "undefined") return; 

      const response = await axios.get(`http://localhost:4000/api/v1/isuserlikedthispost`, {
        params: {
          userid: JSON.parse(userRaw)?._id,
          postid: post?._id,
        },
      });
      setLiked(response?.data?.liked);
    } catch (error) {
      console.error("error", error);
    }
  }

  async function disLikePost() {
    try {
      const userRaw = localStorage.getItem("user");
      const user = userRaw ? JSON.parse(userRaw) : null;
      const res = await axios.post(`http://localhost:4000/api/v1/dislike`, { post, user });
      if (res?.data?.success) setLiked(false);
    } catch (error) {
      toast.error("Error disliking");
    }
  }

  async function likePost() {
    try {
      const userRaw = localStorage.getItem("user");
      const user = userRaw ? JSON.parse(userRaw) : null;
      const res = await axios.post(`http://localhost:4000/api/v1/createlike`, { post, user });
      if (res?.data?.success) setLiked(true);
    } catch (error) {
      toast.error("Error liking");
    }
  }

  function likeClickHandler(event) {
    event.stopPropagation();
    if (!liked) {
      likePost();
      toast.success("You liked this post");
    } else {
      disLikePost();
      toast.error("You have disliked this post");
    }
    setTimeout(() => { window.location.reload(); }, 1000);
  }

  function clickPostHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    dispatch(setSinglePost(post));
    navigate(`/post/${post._id}`);
  }

  return (
    <div className="w-[30%] h-[30%] bg-gray-900 border-2 p-8 rounded-md">
      <div className="flex flex-col">
        <button className="flex flex-col justify-center items-center gap-2 p-2" onClick={clickPostHandler}>
          <div className="text-green-400 text-2xl mx-auto font-bold">{post.heading}</div>
          <div className="w-full flex flex-row">
            <div className="text-white mx-auto flex gap-1">
              <div className="opacity-50">
                {shortPost}{post.body.length > 25 ? " ...more" : "."}
              </div>
            </div>
          </div>
        </button>
        <div className="flex justify-around mt-5">
          <div className="flex gap-2 text-red-400">
            <button onClick={likeClickHandler}>
              {liked ? <FcLike size={22} /> : <FcLikePlaceholder size={22} />}
            </button>
            <NavLink to={`/likes/${post?._id}`} className="text-md">{post.likes.length}</NavLink>
          </div>
          <NavLink to={`/comments/${post?._id}`} className="flex gap-2 relative text-green-200">
            <FaRegCommentDots size={24} />
            <div>{post.comments.length}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
