import { useState } from "react";
import CustomButton from "../components/common/CustomButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

import SignupImage from "../assests/images/SignupImage.jpg";
// import { apiConnector } from "../services/apiconnector";
import { setOtp, setEmail } from "../store/auth";
import { otpGenerator } from "../utils/helper";
import axios from "axios";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  function changeHandler(event) {
    setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    const email = formData.email;
    const subject = " Email varification ";
    let otp = otpGenerator();
    // debugger
    const body = `Your otp is ${otp}`;

    let response;
    setLoading(true);
    try {
      response = await axios
        .post(`http://localhost:4000/api/v1/sendMail`, {
          email,
          subject,
          body,
        })
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
    console.log("response outside api connector", response);
    // debugger;
    if (response && response.data && response.data.success) {
      toast.success(response.data.message);
      console.log("Otp is : ", otp);
      dispatch(setOtp(otp));
      dispatch(setEmail(email));

      // ******** To store email and otp in database ****
      // const response = await axios
      //   .post(`http://localhost:4000/api/v1/storeOtp`, { email, otp })
      //   .then(() => {
      //     toast.success(" OTP has been stored on Database ");
      //     setLoading(false);
      //     navigate("/SignupFormAfterValidationOfEmail");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     toast.error(
      //       " Something went wrong while storing tp to database Please try again !!!!"
      //     );
      //     console.log(" Something went wrong while storing tp to database ");
      //     setLoading(false);
      //   });

      navigate("/varifyemail");
      // navigate(`/varifyemail`, {
      //   otp: this.otp,
      //   email: this.email,
      // });
    } else {
      toast.error(response.data.message);
      console.log(" Something went wrong while sending email ");
    }
  }

  return (
    <div className="w-[100vw] h-fit bg-gray-900">
      {loading ? (
        <div className="text-white text-3xl">"loading"</div>
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
              <label className="mt-16"> Enter your email to varify</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={changeHandler}
                placeholder="Enter your email here "
                className="text-black p-2 mt-2 rounded-md"
              />
              <button className="mt-16">
                <CustomButton
                  title={"Varify email"}
                  bg_color={"bg-yellow-400"}
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
};

export default SignupPage;
