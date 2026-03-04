import { useState } from "react";
// import { CgPassword } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { setUser, setToken } from "../store/auth";
import LoginImage from "../assests/images/SignupImage.jpg";
import CustomButton from "../components/common/CustomButton";
// import { apiConnector } from "../services/apiconnector";
import axios from "axios";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();

    const { email, password } = formData;

    setLoading(true);
    let response;
    // try {
    //   response = await apiConnector(
    //     "POST",
    //     `http://localhost:4000/api/v1/login`,
    //     { email, password }
    //   );
    // } catch (error) {

    // }
    try {
      response = await axios
        .post(`http://localhost:4000/api/v1/login`, { email, password })
        .then((response1) => {
          return response1;
        })
        .catch((error) => {
          return error.response;
        });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);

    console.log("Printing response from backend login api ");
    console.log(response);

    if (response.data.success === true) {
      toast.success(response.data.message);
      console.log(
        "setting user & token to Auth state with ",
        response.data.user,
        response.data.token,
      );
      dispatch(setUser(response.data.user));
      dispatch(setToken(response.data.token));
      // dispatch(resetAuth());
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard/my-profile");
    } else {
      toast.error(response.data.message);
      navigate("/login");
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
              Login to the blogs app
            </h1>
            <form
              onSubmit={onSubmitHandler}
              className="text-blue-50 flex flex-col gap-2 p-2"
            >
              <label className="mt-16">
                {" "}
                Enter your email and password to Login{" "}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Enter your email here "
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
              <button className="mt-16">
                <CustomButton title={"Login"} bg_color={"bg-yellow-400"} />
              </button>
            </form>
          </div>
          <div className="w-[45%] mt-16">
            <img src={LoginImage} alt="LoginImage" width={600} h={500} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
