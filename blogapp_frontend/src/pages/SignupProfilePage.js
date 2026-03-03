import { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";

import SignupImage from "../assests/images/SignupImage.jpg";
import { apiConnector } from "../services/apiconnector";
import { removeEmail } from "../store/auth";

const SignupProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let authState = useSelector((state) => state.auth);
  let email = authState.email || "er..satyagautam@gmail.com";

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    role: "USER",
    about: "",
  });

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const password = formData.password;
    const firstname = formData.firstname;
    const lastname = formData.lastname;
    const about = formData.about;
    const role = formData.role;
    let response;
    setLoading(true);
    response = await apiConnector(
      "POST",
      `http://localhost:4000/api/v1/createuser`,
      { email, firstname, lastname, password, about, role }
    );
    setLoading(false);
    dispatch(removeEmail(null));
    console.log(" response from createuser controller ", response);
    if (response.data.success) {
      toast.success(response.data.message);
      console.log("printing response after creating user ", response);
      navigate("/login");
    } else {
      toast.error(response.data.message);
      console.log(" Something went wrong, Please try again ");
      navigate("/signup");
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
              Join this BLOG APP for absolue free to create and view the blogs{" "}
            </h1>
            <form
              onSubmit={onSubmitHandler}
              className="text-blue-50 flex flex-col gap-2 p-2"
            >
              {/* <label className="mt-16"> Enter your email to varify</label> */}
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={changeHandler}
                placeholder="Enter your first name here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={changeHandler}
                placeholder="Enter your last name here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="Enter your password here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="text"
                name="about"
                value={formData.about}
                onChange={changeHandler}
                placeholder="Enter about yourself here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={changeHandler}
                placeholder="Enter your role here "
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

export default SignupProfilePage;
