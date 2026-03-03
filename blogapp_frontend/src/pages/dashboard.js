import axios from "axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { MdFormatLineSpacing } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import Blog from "../components/post/Blog";
import { NavLink, useLocation } from "react-router-dom";
import { AllPosts } from "../components/post/AllPosts";

export const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState();
  const [profile, setProfile] = useState(true);
  const [searchData, setSearchData] = useState({ data: "" });
  const [searchedPost, setSearchedPost] = useState();

  const location = useLocation();
  async function fetchData() {
    try {
      await axios
        .get(`http://localhost:4000/api/v1/getallposts`)
        .then((response1) => {
          setAllPosts(response1?.data?.allPosts);
          return response1;
        })
        .catch((error) => {
          setAllPosts(error?.response?.data?.allPosts);
          return error.response;
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  function searhHandler(event) {
    setSearchData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  }

  async function onClickSearchHandler(event) {
    event.preventDefault();
    console.log("Printing search data : ", searchData.data);
    const params = {
      data: searchData.data,
    };
    await axios
      .get(`http://localhost:4000/api/v1/searchdata`, { params: params })
      .then((response1) => {
        // response = response1;
        console.log("response from search api", response1);
        setSearchedPost(response1.data.allBlogs);
        return response1;
      })
      .catch((error) => {
        // response = error.response;
        setSearchedPost(error?.response?.data?.allBlogs);
        console.log("response from search api", error.response);
      });
  }

  function matchPath(path) {
    if (path === location.pathname) {
      return true;
    }
    return false;
  }

  // if (allPosts)
  //   console.log("printing size and allPosts", allPosts.length, " ", allPosts);

  return (
    <div className="w-[100vw] bg-gray-900">
      {!loading && (
        <div className="w-full h-full flex gap-1 overlap-hidden bg-gray-900">
          {/* Profile  */}
          {profile ? (
            <div className="w-[15%] h-full bg-gray-700 ml-1 flex gap-4">
              <div className="w-full h-full flex flex-col pl-4 pt-14 mt-4 text-blue-400 font-bold text-2xl gap-8">
                <NavLink to={"/dashboard/my-profile"}>
                  <div>Profile</div>
                </NavLink>
                <NavLink to={"/dashboard/my-profile"}>
                  <div>Your Posts</div>
                </NavLink>
                <NavLink to={"/createblog"}>
                  <div>Create Posts</div>
                </NavLink>
                <NavLink to={"/changePassword"}>
                  <div className="flex ">Change your Password</div>
                </NavLink>
                <NavLink to={"/logout"}>
                  <div className="flex ">Logout</div>
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="w-[15%] h-full bg-gray-900"></div>
          )}
          <div className="w-[90%] h-full flex flex-col gap-5">
            {/* NAvbar for to handle posts  */}
            <div className="w-[92%] mt-1 pr-4 flex justify-between text-blue-600 text-xl p-2 border-b-[1px] border-gray-600 rounded-md">
              <button
                className={`py-1`}
                onClick={() => {
                  setProfile(!profile);
                }}
              >
                <MdFormatLineSpacing size={25} className="w-10" />
              </button>
              <NavLink
                to={"/dashboard/my-profile"}
                className={` ${matchPath(
                  "/dashboard/my-profile"
                )} ? border-b-[1px] ${matchPath(
                  "/dashboard/my-profile"
                )} ? border-yellow-400`}
              >
                All Posts
              </NavLink>
              <NavLink to={"/createblog"}>Create Posts</NavLink>
              <NavLink to={"your Blogs"}>Your Posts</NavLink>
            </div>
            {/* Search field */}
            <div className="w-[85%] flex ml-10 text-white p-2 rounded-full mt-8 gap-2 justify-betwen items-center">
              <div className="text-xl">
                <CiSearch />
              </div>
              <div className="w-full">
                <input
                  onChange={searhHandler}
                  name="data"
                  value={searchData.data}
                  type="text"
                  className="w-full rounded-full pl-4 text-black"
                  placeholder="Enter heading to search post"
                />
              </div>
              <button
                className="px-2 bg-yellow-200 rounded-full text-black font-bold"
                onClick={onClickSearchHandler}
              >
                Search
              </button>
            </div>
            {/* All Posts */}
            {searchedPost ? (
              <div className="w-full h-full flex flex-wrap gap-5 mt-5 mx-auto">
                <div className="h-200 flex flex-wrap gap-4 justify-center text-white">
                  {searchedPost?.map((post, index) => (
                    <Blog post={post} key={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex flex-wrap gap-5 mt-5 mx-auto">
                {allPosts ? (
                  <AllPosts allPosts={allPosts} />
                ) : (
                  <div className="text-white text-3xl mx-auto">
                    No posts yet
                  </div>
                )}
              </div>
            )}
            <div className="w-30"></div>
          </div>
        </div>
      )}
    </div>
  );
};
