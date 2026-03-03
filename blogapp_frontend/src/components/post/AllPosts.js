import { NavLink } from "react-router-dom";
import Blog from "./Blog";

export function AllPosts({ allPosts }) {
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="w-[90%] flex items-center justify-center flex-wrap overlap-hidden gap-5 ml-4 mx-auto">
        {allPosts?.map((post, index) => (
          <Blog post={post} key={index} />
        ))}
        <NavLink
          to={"/createblog"}
          className="w-[30%] h-[200px] border-2 hover:cursor-pointer"
        >
          <div className="w-full h-full flex text-3xl justify-center items-center mx-auto font-bold text-green-400">
            Create Blog
          </div>
        </NavLink>
      </div>
    </div>
  );
}
