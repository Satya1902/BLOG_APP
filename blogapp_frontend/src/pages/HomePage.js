import { NavLink } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CustomButton from "../components/common/CustomButton";

const HomePage = () => {
    return (
    <div className="w-[100vw] h-[100vh] bg-gray-900">
        <div className="w-[80%] h-[90%] flex flex-col items-center justify-center gap-8 mx-auto mt-8 shadow-2xl">
            <h1 className="text-yellow-400 text-4xl font-bold">BLOG APP</h1>
            <div className="text-gray-100 flex flex-col gap-2">
               <p className="text-2xl">Publish your passions, your way</p>
               <p className="w-[90%] text-small mx-auto">Create a unique and beautiful blog easily.</p>
            </div>
            <div className="mt-12 bg-yellow-400 ">
               <NavLink to={"/signup"} >
                  <div className="flex items-center p-2">
                    <CustomButton title={"Get started"} bg_color={"bg-yellow-400"} />
                    <FaArrowRight />
                  </div>
               </NavLink>  
            </div>
            <div className="mt-8"></div>
        </div>
    </div>
    );
}

export default HomePage;
