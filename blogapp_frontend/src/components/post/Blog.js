import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSinglePost } from "../../store/post";
import { jwtDecode } from "jwt-decode";

export default function Blog({ post }) {
  const [liked, setLiked] = useState(false);
  const [shortPost, setShortPost] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTokenUser = () => {
    const token = localStorage.getItem("user");
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  };

  const checkLikeStatus = useCallback(async () => {
    const user = getTokenUser();
    if (!user?._id) return;
    try {
      const res = await axios.get(
        "http://127.0.0.1:4000/api/v1/isuserlikedthispost",
        {
          params: { userid: user._id, postid: post._id },
        },
      );
      setLiked(res.data.liked);
    } catch {
      console.error("Error fetching like status");
    }
  }, [post]);

  useEffect(() => {
    checkLikeStatus();
    setShortPost(post?.body?.slice(0, 50) || "");
  }, [post, checkLikeStatus]);

  const likeClickHandler = async (e) => {
    e.stopPropagation();
    const user = getTokenUser();
    if (!user) return;

    try {
      if (!liked) {
        await axios.post("http://127.0.0.1:4000/api/v1/createlike", {
          post: post._id,
          user: user._id,
        });
        setLiked(true);
      } else {
        await axios.post("http://127.0.0.1:4000/api/v1/dislike", {
          post: post._id,
          user: user._id,
        });
        setLiked(false);
      }
    } catch {
      toast.error("Error updating like");
    }
  };

  const clickPostHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSinglePost(post));
    navigate(`/post/${post._id}`);
  };

  return (
    <div className="w-[30%] h-[30%] bg-gray-900 border-2 p-6 rounded-md">
      <div className="flex flex-col">
        <div className="cursor-pointer" onClick={clickPostHandler}>
          <h3 className="text-green-400 text-2xl font-bold">{post.heading}</h3>
          <p className="text-white opacity-50 mt-1">
            {shortPost} {post?.body?.length > 50 ? "...more" : ""}
          </p>
        </div>

        <div className="flex justify-around mt-4">
          <div className="flex items-center gap-2 text-red-400">
            <button onClick={likeClickHandler}>
              {liked ? <FcLike size={22} /> : <FcLikePlaceholder size={22} />}
            </button>
            <NavLink to={`/likes/${post._id}`}>
              {post?.likes?.length || 0}
            </NavLink>
          </div>

          <NavLink
            to={`/comments/${post._id}`}
            className="flex gap-2 text-green-200 items-center"
          >
            <FaRegCommentDots size={22} />
            <div>{post?.comments?.length || 0}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
