import { useDispatch } from "react-redux";
import { resetAuth, setToken, setUser } from "../store/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(resetAuth());
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  //   toast.success("Logged Out");
  navigate("/login");

  //   //   useEffect(() => {
  //   dispatch(resetAuth());
  //   console.log("Printing navigateor after logout");
  //   navigate("/login");

  //   window.location.reload();
  //   }, []);
}
