import { MdOutlineRssFeed } from "react-icons/md";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoIosPlayCircle } from "react-icons/io";
import { MdGroups } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import { FaQuestion } from "react-icons/fa6";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaCalendarDay } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const LeftBar = () => {
  const [user, setUser] = useState([]);
  // const user = props.user || "Abusad";
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/user/all");
      console.log(res.data.allUser);
      setUser(res.data.allUser);
    };
    fetchData();
  }, []);

  return (
    <div className=" h-[90.5vh] w-72 flex flex-col  gap-5 p-4 overflow-y-auto overflow-x-hidden mt-16 ">
      <Link to="/home" className="flex items-center gap-2  text-3xl">
        <MdOutlineRssFeed />
        <h1>Feed</h1>
      </Link>
      <div className="flex items-center gap-2  text-3xl">
        <IoChatboxEllipsesSharp />
        <h1>Chats</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <IoIosPlayCircle />
        <h1>Videos</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <MdGroups />
        <h1>Groups</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <FaBookmark />
        <h1>Bookmarks</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <FaQuestion />
        <h1>Questions</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <IoBriefcaseOutline />
        <h1>Jobs</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <FaCalendarDay />
        <h1>Events</h1>
      </div>
      <div className="flex items-center gap-2  text-3xl">
        <GiGraduateCap />
        <h1>Courses</h1>
      </div>
      <button className="px-5 py-2 bg-slate-400 text-white">Show More</button>
      <hr />
      {user.map((v, i) => {
        return (
          <Link
            key={v._id}
            className="text-2xl font-semibold "
            to={`/profile/${v._id}`}
          >
            {v.username}
          </Link>
        );
      })}
    </div>
  );
};

export default LeftBar;
