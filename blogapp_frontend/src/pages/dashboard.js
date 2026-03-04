import axios from "axios";
import { useEffect, useState } from "react";
import { MdFormatLineSpacing } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { AllPosts } from "../components/post/AllPosts";
import { jwtDecode } from "jwt-decode";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // "all" | "user"
  const [profile, setProfile] = useState(true);
  const [searchData, setSearchData] = useState({ data: "" });
  const [searchedPost, setSearchedPost] = useState(null);

  // ✅ Get logged-in user ID safely
  const getUserId = () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        return decoded?.id || decoded?._id;
      }

      const user = localStorage.getItem("user");
      if (user) {
        const parsed = JSON.parse(user);
        return parsed?.id || parsed?._id;
      }

      return null;
    } catch (err) {
      console.error("Error decoding user:", err);
      return null;
    }
  };

  // ✅ Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/getallposts");
      setAllPosts(res?.data?.allPosts || []);
    } catch (err) {
      console.error("Error fetching all posts:", err);
    }
  };

  // ✅ Fetch posts of logged-in user
  const fetchUserPosts = async () => {
    try {
      const userid = getUserId();
      if (!userid) {
        console.warn("No user ID found.");
        return;
      }

      const res = await axios.get("http://localhost:4000/api/v1/getuserposts", {
        params: { userid },
      });
      setUserPosts(res?.data?.userPosts || []);
      console.log("Fetched user posts:", res?.data?.userPosts);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    }
  };

  // ✅ Run on tab switch
  useEffect(() => {
    setLoading(true);
    if (activeTab === "all") fetchAllPosts();
    else fetchUserPosts();
    setLoading(false);
  }, [activeTab]);

  const searchHandler = (e) => {
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onClickSearchHandler = async (e) => {
    e.preventDefault();
    try {
      const params = { data: searchData.data };
      const response = await axios.get(
        "http://localhost:4000/api/v1/searchdata",
        { params },
      );
      setSearchedPost(response.data.allBlogs || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchedPost([]);
    }
  };

  return (
    <div className="w-[100vw] bg-gray-900">
      {!loading && (
        <div className="flex w-full h-full gap-1 bg-gray-900">
          {/* Sidebar */}
          {profile ? (
            <div className="w-[15%] h-full bg-gray-700 ml-1 flex flex-col pl-4 pt-14 mt-4 text-blue-400 font-bold text-2xl gap-8">
              <NavLink to="/dashboard/my-profile">
                <div>Profile</div>
              </NavLink>
              <NavLink to="/createblog">
                <div>Create Posts</div>
              </NavLink>
              <NavLink to="/changePassword">
                <div>Change Password</div>
              </NavLink>
              <NavLink to="/logout">
                <div>Logout</div>
              </NavLink>
            </div>
          ) : (
            <div className="w-[15%] h-full bg-gray-900"></div>
          )}

          {/* Main Content */}
          <div className="w-[85%] h-full flex flex-col gap-5">
            {/* Top Navbar Tabs */}
            <div className="w-[92%] mt-1 pr-4 flex justify-between text-blue-600 text-xl p-2 border-b-[1px] border-gray-600 rounded-md">
              <button className="py-1" onClick={() => setProfile(!profile)}>
                <MdFormatLineSpacing size={25} />
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 transition-all ${
                  activeTab === "all"
                    ? "border-b-4 border-yellow-400 text-yellow-300"
                    : ""
                }`}
              >
                All Posts
              </button>
              <NavLink to="/createblog">Create Post</NavLink>
              <button
                onClick={() => setActiveTab("user")}
                className={`px-3 transition-all ${
                  activeTab === "user"
                    ? "border-b-4 border-yellow-400 text-yellow-300"
                    : ""
                }`}
              >
                Your Posts
              </button>
            </div>

            {/* Search Field */}
            <div className="w-[85%] flex ml-10 text-white p-2 rounded-full mt-8 gap-2 justify-between items-center">
              <div className="text-xl">
                <CiSearch />
              </div>
              <input
                onChange={searchHandler}
                name="data"
                value={searchData.data}
                type="text"
                className="w-full rounded-full pl-4 text-black"
                placeholder="Enter heading to search post"
              />
              <button
                className="px-2 bg-yellow-200 rounded-full text-black font-bold"
                onClick={onClickSearchHandler}
              >
                Search
              </button>
            </div>

            {/* Posts */}
            <div className="w-full h-full flex flex-wrap gap-5 mt-5 mx-auto">
              {searchedPost ? (
                <AllPosts allPosts={searchedPost} />
              ) : activeTab === "user" ? (
                <AllPosts allPosts={userPosts} />
              ) : (
                <AllPosts allPosts={allPosts} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
