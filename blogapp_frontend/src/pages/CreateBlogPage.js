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

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const heading = formData.heading;
    const body = formData.body;
    const user = JSON.parse(localStorage.getItem("user"))._id;
    let response;
    setLoading(true);
    response = await apiConnector(
      "POST",
      `http://localhost:4000/api/v1/createpost`,
      { heading, body, user }
    );
    setLoading(false);
    console.log(" response from createpost controller ", response);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/dashboard/my-profile");
    } else {
      toast.error(response.data.message);
      navigate("/createblog");
    }
  }

  return (
    <div className="w-[100vw] h-fit bg-gray-900">
      {loading ? (
        "loading"
      ) : (
        <div className="w-[92%] h-fit bg-gray-900 flex justify-center gap-6 mx-auto mt-2 mb-2">
          <div className="w-[50%] h-fit-content flex flex-col gap-2 mt-10 text-white p-4 mb-2">
            <h1 className="text-blue-200 text-4xl font-bold mx-auto">
              {" "}
              create and view the beautiful blogs{" "}
            </h1>
            <form
              onSubmit={onSubmitHandler}
              className="text-blue-50 flex flex-col gap-2 p-2"
            >
              {/* <label className="mt-16"> Enter your email to varify</label> */}
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={changeHandler}
                placeholder="Enter heading of your blog here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="text"
                name="body"
                value={formData.body}
                onChange={changeHandler}
                placeholder="Enter your post here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <button className="mt-16">
                <CustomButton title={"Signup"} bg_color={"bg-yellow-400"} />
              </button>
            </form>
          </div>
          <div className="w-[45%] mt-16">
            <img src={SignupImage} alt="SignupImage" width={600} h={500} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlogPage;
