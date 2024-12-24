import { CiSearch } from "react-icons/ci";
import { IoChatboxEllipses } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const Topbar = () => {
  // console.log("user", user);
  // console.log("profile", profile);
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  const id = decodedToken.userId;
  console.log(decodedToken.userId);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:5000/profile/my/${id}`);
      console.log(res.data);
      setUser(res.data.userData);
      setProfile(res.data.profileData);
    };
    fetchData();
  }, [id]);

  const [isOpen, setIsOpen] = useState(false);
  const handleDropDown = () => {
    setIsOpen(!isOpen);
  };
  // !Delete functionn
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure");

    if (confirmDelete) {
      try {
        let data = await axios.delete(
          `http://localhost:5000/user/delete/${user._id}`
        );
        if (data) {
          alert("deleted");
          console.log(data);
        }
        alert("Cant delete");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("No confirmation for delete");
    }
  };
  return (
    <div className="text-white w-screen h-12 sm:h-16 bg-blue-500 flex justify-between items-center px-2 sm:px-8 fixed z-10 ">
      <h1 className=" text-2xl font-serif sm:text-5xl sm:mx-4">Social</h1>
      <div className="text-black sm:flex justify-between items-center hiddens w-1/3 h-1/2 bg-white rounded-2xl p-2   ">
        <CiSearch className="text-3xl cursor-pointer " />
        <input
          type="text"
          className="w-full px-2 rounded-2xl focus:outline-none"
          placeholder="Search friend"
        />
      </div>
      <div className="flex items-center justify-between text  gap-1 sm:gap-4 sm:text-2xl">
        <h1>Homepage</h1>
        <h1>Timeline</h1>
      </div>
      <div className="flex items-center justify-between gap-2 sm:gap-5 ">
        <div className="relative">
          <CgProfile className=" text-xl sm:text-3xl" />
          <div className="h-3 w-3 sm:h-5 sm:w-5 rounded-full bg-red-500 absolute -top-1 -right-1 flex items-center justify-center">
            <h3 className="">1</h3>
          </div>
        </div>
        <div className="relative">
          <IoChatboxEllipses className=" text-xl sm:text-3xl" />
          <div className="h-3 w-3 sm:h-5 sm:w-5 rounded-full bg-red-500 absolute -top-1 -right-1 flex items-center justify-center">
            <h3 className="">5</h3>
          </div>
        </div>
        <div className="relative">
          <FaBell className=" text-xl sm:text-3xl" />
          <div className="h-3 w-3 sm:h-5 sm:w-5 rounded-full bg-red-500 absolute -top-1 -right-1 flex items-center justify-center">
            <h3 className="">2</h3>
          </div>
        </div>
      </div>
      <img
        // src="https://www.beautycrew.com.au/media/55194/vanilla-girl.png"
        src={`http://localhost:5000/${profile.profilePicture}`}
        alt=""
        className="h-10 w-10 rounded-full cursor-pointer hover:scale-125"
        onClick={handleDropDown}
      />
      {isOpen && (
        <div className="absolute right-8 top-14 outline outline-blue-500 w-48 bg-white shadow-lg rounded-lg border border-gray-300 text-2xl   ">
          <Link
            to="/Home"
            className="block px-4 py-2 text-black hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to={`/profile/my/${user._id}`}
            className="block px-4 py-2 text-black hover:bg-gray-200"
          >
            Profile
          </Link>

          <Link to="" className="block px-4 py-2 text-black hover:bg-gray-200">
            About
          </Link>
          {/* <Link
            to={`/profile/delete/${user._id}`}
            className="block px-4 py-2 text-red-500 hover:bg-gray-200"
          >
            Delete
          </Link> */}
          <button onClick={handleDelete}>Delete</button>

          <Link
            to="/login"
            className="block px-4 py-2 text-yellow-600 hover:bg-gray-200"
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Topbar;
