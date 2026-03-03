import { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import SignupImage from "../assests/images/SignupImage.jpg";
import { apiConnector } from "../services/apiconnector";

const CreateBlogPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heading: "",
    body: "",
  });

  const changeHandler = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const heading = formData.heading.trim();
    const body = formData.body.trim();

    if (!heading || !body) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"))?._id;
    if (!user) {
      toast.error("User not logged in");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/api/v1/createpost",
        { heading, body, user },
      );

      setLoading(false);

      // Safely check response
      if (response?.data?.success) {
        toast.success(response.data.message || "Blog created successfully!");
        navigate("/dashboard/my-profile");
      } else {
        toast.error(
          response?.data?.message ||
            `Error ${response?.status || ""}: Failed to create blog`,
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error creating post:", error);
      toast.error(error?.message || "Server or network error");
    }
  };

  return (
    <div className="w-[100vw] h-fit bg-gray-900">
      {loading ? (
        <div className="text-white text-center py-10 text-xl">Loading...</div>
      ) : (
        <div className="w-[92%] h-fit flex justify-center gap-6 mx-auto mt-2 mb-2">
          <div className="w-[50%] flex flex-col gap-2 mt-10 text-white p-4 mb-2">
            <h1 className="text-blue-200 text-4xl font-bold mx-auto">
              Create and view beautiful blogs
            </h1>
            <form
              onSubmit={onSubmitHandler}
              className="text-blue-50 flex flex-col gap-2 p-2"
            >
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={changeHandler}
                placeholder="Enter heading of your blog here"
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="text"
                name="body"
                value={formData.body}
                onChange={changeHandler}
                placeholder="Enter your post here"
                className="text-black p-2 mt-2 rounded-md"
              />
              <button type="submit" className="mt-4">
                <CustomButton title={"CreateBlog"} bg_color={"bg-yellow-400"} />
              </button>
            </form>
          </div>
          <div className="w-[45%] mt-16">
            <img src={SignupImage} alt="SignupImage" width={600} height={500} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlogPage;
