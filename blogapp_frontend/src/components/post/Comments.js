import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function Comments() {
  // fetching id from params
  const [postid, setPostid] = useState(useParams().postid);
  const [comments, setComments] = useState();
  const [loading, setLoading] = useState();

  const [formData, setFormData] = useState({
    body: "",
  });

  async function fetchPost() {
    const params = { id: postid, name: "postid" };
    await axios
      .get(`http://localhost:4000/api/v1/comments`, { params })
      .then((response) => {
        setComments(response.data.comments);
        return response;
      })
      .catch((error) => {
        setComments(error.response.data.comments);
        return error.response;
      });
  }

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    let body = formData.body;
    const localUser = JSON.parse(localStorage.getItem("user"));
    const user = localUser?._id;
    const post = postid;
    const commentResponse = await axios
      .post(`http://localhost:4000/api/v1/createcomment`, {
        post,
        body,
        user,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    console.log("Printing response while commenting", commentResponse);

    if (commentResponse?.data?.success) {
      toast.success(commentResponse.data.message);
    } else {
      toast.error("Something went wrong while comment Please try again");
    }
  }

  useEffect(() => {
    setLoading(true);
    try {
      fetchPost();
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong while fetching post");
    }
    setLoading(false);
  }, []);

  return (
    <div className=" bg-gray-900">
      <div className="w-[90%] flex flex-col mx-auto bg-gray-900">
        <div className="w-[80%] h-[80%] flex flex-col justify-between gap-2 mx-auto py-2 px-2 bg-gray-800">
          <div className="w-full flex flex-col gap-5 p-4">
            <div className="w-fit mx-auto text-green-400 font-bold text-2xl border-b-[2px] border-green-400">
              List of all Comments
            </div>
            {loading ? (
              <div className="w-full text-white text-3xl font-bold">
                Loading
              </div>
            ) : (
              <div className="w-full flex flex-col gap-2 text-white justify-between items-center">
                {comments?.length ? (
                  <div className="w-full flex flex-col justify-center gap-1">
                    {comments.map((comment, index) => (
                      <div className="w-full flex text-green-400" key={index}>
                        <div className="w-full flex justify-start flex-wrap">
                          <div className="text-md text-white text-bold p-2">
                            {comment?.body}
                          </div>
                          <div className="w-1"></div>
                          <div className="flex justify-end gap-2 text-md text-blue-400 text-bold p-2">
                            <div className="">{`- ${comment.user.firstname}`}</div>
                            <div>{comment.user.lastname}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-red font-bold text-3xl">
                    No one commented on this post
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="w-full mt-4 h-12 mx-auto flex p-2">
            <form
              className="w-full flex justify-between gap-2"
              onSubmit={onSubmitHandler}
            >
              <input
                type="text"
                name="body"
                value={formData.body}
                onChange={changeHandler}
                className="w-[80%] rounded-md p-1 text-black"
                placeholder="enter your comment here"
              />
              <button className="text-black bg-yellow-200 px-2 py-1 text-sm font-bold rounded-full hover:bg-yellow-400">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
