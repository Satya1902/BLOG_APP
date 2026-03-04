import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const safeParseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export function Comments() {
  const { postid } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ body: "" });

  const postIdNum = parseInt(postid);

  const fetchComments = useCallback(async () => {
    if (isNaN(postIdNum)) return;
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/v1/comments",
        { params: { id: postIdNum } },
      );
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      const msg = error.response?.data?.detail || "Could not load comments";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [postIdNum]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formData.body.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    const userObj = safeParseJSON(localStorage.getItem("user"));
    const userId = parseInt(userObj?._id || userObj?.id);
    if (!userId) {
      toast.error("Please log in to comment");
      return;
    }

    console.log(
      "post is : ",
      postIdNum,
      " body ",
      formData.body,
      " user ",
      userId,
    );

    if (isNaN(postIdNum)) {
      toast.error("Invalid post ID");
      return;
    }

    try {
      console.log("hello");
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/createcomment",
        { post: postIdNum, body: formData.body, user: userId },
      );

      if (response.data.success) {
        toast.success("Comment added!");
        setFormData({ body: "" });
        fetchComments();
      }
    } catch (error) {
      console.error("Post Error:", error);
      const msg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        JSON.stringify(error.response?.data) ||
        "Failed to post comment";
      toast.error(msg);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-green-400 border-b-2 border-green-400 w-fit mb-6">
            Discussions
          </h2>

          {loading ? (
            <div className="text-white text-center py-10 animate-pulse">
              Loading...
            </div>
          ) : (
            <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {comments.length ? (
                comments.map((comment) => (
                  <div
                    key={comment._id || comment.id}
                    className="bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500"
                  >
                    <p className="text-gray-100 mb-2">{comment.body}</p>
                    <p className="text-right text-sm text-blue-300 font-semibold">
                      — {comment.user?.firstname} {comment.user?.lastname}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-10">
                  No comments yet.
                </p>
              )}
            </div>
          )}

          <form
            onSubmit={onSubmitHandler}
            className="flex gap-2 border-t border-gray-600 pt-6"
          >
            <input
              type="text"
              name="body"
              value={formData.body}
              onChange={changeHandler}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-100 rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-md transition-colors"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
