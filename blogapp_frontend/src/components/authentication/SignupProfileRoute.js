import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SignupRoute = ({ children }) => {
  const authState = useSelector((state) => state.auth);
  const email = authState.email;
  if (email !== null) return children;
  else {
    toast.error(" You do not have permission for this page ");
    return <Navigate to="/Signup" />;
  }
};

export default SignupRoute;
