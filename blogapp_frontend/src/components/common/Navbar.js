import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetAuth } from "../../store/auth";
import toast from "react-hot-toast";
import logo from "../../assests/logo's/blogAppLogo.png";

const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(resetAuth());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <NavLink to="/">
          <img src={logo} alt="Logo" width={40} height={40} loading="lazy" />
        </NavLink>

        <div className="flex gap-3 text-gray-400">
          <NavLink
            to="/"
            className={`rounded-md px-3 py-2 hover:text-gray-800 hover:bg-gray-400 ${
              location.pathname === "/" ? "text-yellow-200" : ""
            }`}
          >
            Homepage
          </NavLink>
          <NavLink
            to="/about"
            className={`rounded-md px-3 py-2 hover:text-gray-800 hover:bg-gray-400 ${
              location.pathname === "/about" ? "text-yellow-200" : ""
            }`}
          >
            About
          </NavLink>
        </div>

        {!user ? (
          <div className="flex gap-3 text-gray-400">
            <NavLink
              to="/signup"
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/signup" ? "text-yellow-200" : ""
              }`}
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/login" ? "text-yellow-200" : ""
              }`}
            >
              Login
            </NavLink>
          </div>
        ) : (
          <div className="flex gap-3 text-gray-400">
            <NavLink
              to="/dashboard/my-profile"
              className={`rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400 ${
                location.pathname === "/dashboard/my-profile"
                  ? "text-yellow-200"
                  : ""
              }`}
            >
              Dashboard
            </NavLink>
            <button
              onClick={logoutHandler}
              className="rounded-md px-3 py-2 bg-gray-600 hover:text-gray-800 hover:bg-gray-400"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
