import { NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assests/logo's/blogAppLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth, setToken, setUser } from "../../store/auth";
import toast from "react-hot-toast";
// import { useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  const user = authState.user;
  const navigate = useNavigate();

  function onClickLogoutHandler() {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetAuth());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/login");
  }

  // const token = localStorage.getItem("token");

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 
       ${location.pathname !== "/" ? "bg-richblack-800" : ""} 
       transition-all duration-200`}
    >
      <div
        className={`flex w-11/12 max-w-maxContent items-center justify-between`}
      >
        <NavLink to="/">
          <img src={logo} alt="Logo" width={40} height={2} loading="lazy" />
        </NavLink>
        <div className={`flex gap-3 text-gray-400`}>
          <button
            className={`rounded-md px-3 py-2 hover:text-gray-800 hover:bg-gray-400 ${
              location.pathname === "/" ? "text-yellow-200" : " "
            }`}
          >
            <NavLink to={"/"}>Homepage</NavLink>
          </button>
          <button
            className={`rounded-md px-3 py-2 hover:text-gray-800 hover:bg-gray-400 ${
              location.pathname === "/about" ? "text-yellow-200" : " "
            }`}
          >
            <NavLink to={"/about"}>About</NavLink>
          </button>
        </div>
        {user === null && (
          <div className={`flex text-gray-400 gap-1`}>
            <button
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/signup" ? "text-yellow-200" : " "
              }`}
            >
              <NavLink to={"/signup"}>Signup</NavLink>
            </button>
            <button
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/login" ? "text-yellow-200" : " "
              }`}
            >
              <NavLink to={"/login"}>Login</NavLink>
            </button>
          </div>
        )}
        {user && (
          <div className={`flex text-gray-400 gap-4`}>
            <button
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/profile" ? "text-yellow-200" : " "
              }`}
            >
              <NavLink to={"/dashboard/my-profile"}>Dashboard</NavLink>
            </button>
            <button
              onClick={onClickLogoutHandler}
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/logout" ? "text-yellow-200" : " "
              }`}
            >
              <NavLink to={"/logout"}>Logout</NavLink>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
