import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function Likes() {
  // fetching id from params
  const [postid, setPostid] = useState(useParams().postid);
  const [likes, setLikes] = useState();
  const [loading, setLoading] = useState();

  async function fetchPost() {
    const params = { id: postid, name: "postid" };
    await axios
      .get(`http://localhost:4000/api/v1/likes`, { params })
      .then((response) => {
        setLikes(response.data.likes);
        return response;
      })
      .catch((error) => {
        setLikes(error.response.data.likes);
        return error.response;
      });
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

  //   if (likes) {
  //     likes.map((like) => {
  //       console.log(like.user.firstname, "", like.user.lastname);
  //     });
  //   }

  return (
    <div className="w-[80%] mx-auto mt-14 text-white">
      <div className="flex flex-col gap-10 p-4">
        <div className="text-green-400 font-bold text-2xl flex items-center justify-center">
          List of users who liked this post
        </div>
        {loading ? (
          <div className="text-white text-3xl font-bold">Loading</div>
        ) : (
          <div className="flex flex-col gap-2 text-white justify-between items-center">
            {likes ? (
              <div className="text-blue-400 text-xl font-bold flex flex-col gap-2 ">
                {likes.map((like, index) => (
                  <div className="font-bold flex flex-col gap-2 " key={index}>
                    <div className="flex gap-1">
                      <div>{like.user.firstname}</div>
                      <div>{like.user.lastname}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-red font-bold text-3xl">
                No one liked this post
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
