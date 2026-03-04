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
  const [likeCount, setLikeCount] = useState(post?.likes?.length || 0);
  const [commentCount, setCommentCount] = useState(post?.comments?.length || 0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Get userId safely from JWT token
  const getTokenUserId = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded?.id || decoded?._id;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  // ✅ Check if user already liked this post
  const checkLikeStatus = useCallback(async () => {
    const userId = getTokenUserId();
    if (!userId || !post?.id) return;
    try {
      const res = await axios.get(
        "http://127.0.0.1:4000/api/v1/isuserlikedthispost",
        {
          params: { userid: userId, postid: post.id },
        },
      );
      setLiked(res.data.liked);
    } catch (err) {
      console.error("Error fetching like status", err);
    }
  }, [post]);

  // ✅ Get updated like/comment count after like/dislike
  const refreshCounts = useCallback(async () => {
    if (!post?.id) return;
    try {
      const res = await axios.get(`http://127.0.0.1:4000/api/v1/getallposts`);
      if (res.data?.success && Array.isArray(res.data.allPosts)) {
        const updated = res.data.allPosts.find((p) => p.id === post.id);
        if (updated) {
          setLikeCount(updated.likes?.length || 0);
          setCommentCount(updated.comments?.length || 0);
        }
      }
    } catch (err) {
      console.error("Error refreshing post data", err);
    }
  }, [post]);

  useEffect(() => {
    checkLikeStatus();
    setShortPost(post?.body?.slice(0, 50) || "");
    setLikeCount(post?.likes?.length || 0);
    setCommentCount(post?.comments?.length || 0);
  }, [post, checkLikeStatus]);

  // ✅ Handle like / dislike toggle
  const likeClickHandler = async (e) => {
    e.stopPropagation();
    const userId = getTokenUserId();
    if (!userId) {
      toast.error("Please login to like a post");
      return;
    }

    try {
      if (!liked) {
        // Like
        const res = await axios.post(
          "http://127.0.0.1:4000/api/v1/createlike",
          {
            post: post.id,
            user: userId,
          },
        );
        if (res.data.success) {
          setLiked(true);
          toast.success("You liked this post");
        }
      } else {
        // Unlike
        const res = await axios.post("http://127.0.0.1:4000/api/v1/dislike", {
          post: post.id,
          user: userId,
        });
        if (res.data.success) {
          setLiked(false);
          toast("You unliked this post", { icon: "💔" });
        }
      }

      // 🔄 Refresh like/comment count
      await refreshCounts();
    } catch (err) {
      console.error("Error updating like", err);
      toast.error("Failed to update like");
    }
  };

  // ✅ Navigate to single post
  const clickPostHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setSinglePost(post));
    navigate(`/post/${post.id}`);
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
          {/* ❤️ Like Section */}
          <div className="flex items-center gap-2 text-red-400">
            <button onClick={likeClickHandler}>
              {liked ? <FcLike size={22} /> : <FcLikePlaceholder size={22} />}
            </button>
            <NavLink to={`/likes/${post.id}`}>{likeCount}</NavLink>
          </div>

          {/* 💬 Comment Section */}
          <NavLink
            to={`/comments/${post.id}`}
            className="flex gap-2 text-green-200 items-center"
          >
            <FaRegCommentDots size={22} />
            <div>{commentCount}</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
