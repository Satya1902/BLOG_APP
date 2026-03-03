import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

import toast from "react-hot-toast";
// import axios from "axios";
import CustomButton from "../components/common/CustomButton";

import SignupImage from "../assests/images/SignupImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { removeOtp, setEmail, setOtp } from "../store/auth";
import { otpGenerator } from "../utils/helper";
import { apiConnector } from "../services/apiconnector";

function VarifyEmail() {
  const [loading, setLoading] = useState(false);

  // *******   How to fetch data from params   ******
  // const location = useLocation();
  // let enteredEmail = location.state.email;
  // let generatedOtp = location.state.otp;

  const authState = useSelector((state) => state.auth);

  let enteredEmail = authState.email;
  let generatedOtp = authState.otp;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    otp: "",
  });

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    const otp = formData.otp;

    if (otp === generatedOtp) {
      toast.success(" Email varified successfully :) ");
      dispatch(removeOtp(null));
      navigate("/signupprofile");
    } else {
      toast.error(" You have entered wrong OTP ");
    }
  }

  async function sendOTPHandler(event) {
    event.preventDefault();

    const email = enteredEmail;
    const subject = " Email varification ";
    let otp = otpGenerator();
    const body = `Your otp is ${otp}`;
    let response;
    setLoading(true);
    try {
      response = await apiConnector(
        "POST",
        `http://localhost:4000/api/v1/sendMail`,
        { email, subject, body }
      );
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    if (response.data.success) {
      toast.success(" Mail has been sent successfully .... ");
      console.log("Otp is : ", otp);
      dispatch(setOtp(otp));
      dispatch(setEmail(email));
      navigate("/varifyemail");
    } else {
      toast.error(
        " Something went wrong while sending email please enter correct email !!!!"
      );
      console.log(" Something went wrong while sending email ");
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
              <label className="mt-16">
                {" "}
                Enter otp that is sent to your email to varify your email{" "}
              </label>
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={changeHandler}
                placeholder=" Enter otp here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <button className="mt-16">
                <CustomButton
                  title={"Varify email"}
                  bg_color={"bg-yellow-400"}
                />
              </button>
            </form>
            <form
              onSubmit={sendOTPHandler}
              className="text-blue-50 flex flex-col gap-2 p-2"
            >
              <button className="">
                <CustomButton
                  title={"Send OTP again"}
                  bg_color={"bg-blue-400"}
                />
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
}

export default VarifyEmail;
