import { MdPhotoLibrary } from "react-icons/md";
import { IoIosPricetags } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react";
// import { MyContext } from "../pages/Home";
const StoryBox = ({ user, profile }) => {
  // const data = useContext(MyContext);

  console.log(user, profile);
  return (
    <div className="h-60 w-[95%]  p-3 m-5 rounded-md shadow shadow-black    ">
      <div className="h-[50%]   p-3 flex items-center">
        <Link to={`/profile/my/${user._id}`}>
          <img
            // src="https://www.beautycrew.com.au/media/55194/vanilla-girl.png"
            src={`http://localhost:5000/${profile.profilePicture}`}
            alt=""
            className="h-16 w-20 rounded-full"
          />
        </Link>
        <input
          type="text"
          className="h-full w-full px-5 focus:outline-none text-3xl mx-3"
          placeholder="What's in your mind!"
        />
      </div>
      <hr />
      <div className="h-[50%] p-3 flex justify-between items-center">
        <div className=" flex items-center gap-2 text-3xl cursor-pointer">
          <MdPhotoLibrary className="text-red-500" />
          <h1>Photo</h1>
        </div>
        <div className=" flex items-center gap-2 text-3xl cursor-pointer">
          <IoIosPricetags className="text-blue-500" />
          <h1>Tag</h1>
        </div>
        <div className=" flex items-center gap-2 text-3xl cursor-pointer">
          <FaLocationDot className="text-yellow-500" />
          <h1>Location</h1>
        </div>
        <button className="bg-green-600 px-5 text-3xl py-2 rounded-lg cursor-pointer text-white">
          Share
        </button>
      </div>
    </div>
  );
};

export default StoryBox;
