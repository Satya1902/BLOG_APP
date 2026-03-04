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
  const [activeTab, setActiveTab] = useState("all");
  const [profile, setProfile] = useState(true);
  const [searchData, setSearchData] = useState({ data: "" });
  const [searchedPost, setSearchedPost] = useState([]);
  const [searched, setSearched] = useState(false);

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
      setLoading(true);
      const res = await axios.get("http://localhost:4000/api/v1/getallposts");
      setAllPosts(res?.data?.allPosts || []);
    } catch (err) {
      console.error("Error fetching all posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch posts of logged-in user
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const userid = getUserId();
      if (!userid) return;
      const res = await axios.get("http://localhost:4000/api/v1/getuserposts", {
        params: { userid },
      });
      setUserPosts(res?.data?.userPosts || []);
    } catch (err) {
      console.error("Error fetching user posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "all") fetchAllPosts();
    else fetchUserPosts();
  }, [activeTab]);

  // ✅ Handle input change
  const searchHandler = (e) => {
    setSearchData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ✅ Search button click
  const onClickSearchHandler = async (e) => {
    e.preventDefault();
    if (!searchData.data.trim()) return;
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:4000/api/v1/searchdata",
        { params: { data: searchData.data } },
      );

      // Normalize search results to ensure shape similar to posts
      const posts = response.data.allBlogs || [];
      setSearchedPost(posts);
      setSearched(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchedPost([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset search results
  const clearSearch = () => {
    setSearchData({ data: "" });
    setSearchedPost([]);
    setSearched(false);
  };

  return (
    <div className="w-[100vw] bg-gray-900 min-h-screen">
      <div className="flex w-full h-full gap-1 bg-gray-900">
        {/* Sidebar */}
        {profile ? (
          <div className="w-[15%] h-full bg-gray-700 ml-1 flex flex-col pl-4 pt-14 mt-4 text-blue-400 font-bold text-2xl gap-8">
            <NavLink to="/dashboard/my-profile">Profile</NavLink>
            <NavLink to="/createblog">Create Posts</NavLink>
            <NavLink to="/changePassword">Change Password</NavLink>
            <NavLink to="/logout">Logout</NavLink>
          </div>
        ) : (
          <div className="w-[15%] h-full bg-gray-900"></div>
        )}

        {/* Main Section */}
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

          {/* Search */}
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
            {searched && (
              <button
                className="ml-2 px-3 bg-red-400 text-white rounded-full"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}
          </div>

          {/* Posts Display */}
          <div className="w-full h-full flex flex-wrap gap-5 mt-5 mx-auto text-white">
            {loading ? (
              <div className="text-center w-full mt-10">Loading...</div>
            ) : searched ? (
              searchedPost.length > 0 ? (
                <AllPosts allPosts={searchedPost} />
              ) : (
                <div className="text-center w-full mt-10 text-gray-400">
                  No posts found for “{searchData.data}”
                </div>
              )
            ) : activeTab === "user" ? (
              <AllPosts allPosts={userPosts} />
            ) : (
              <AllPosts allPosts={allPosts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
