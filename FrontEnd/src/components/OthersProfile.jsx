import { Link, useParams } from "react-router-dom";
import LeftBar from "./LeftBar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import MyAllPosts from "./MyAllPosts";

const OthersProfile = () => {
  const id = useParams();
  console.log(id.id);
  const [userData, setUserData] = useState("");
  const [profileData, setProfileData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("Checking");
      const res = await axios.get(`http://localhost:5000/profile/${id.id}`);
      console.log("Response", res);
      setUserData(res.data.userData);
      setProfileData(res.data.profileData);
    };
    fetchData();
  }, [id.id]);
  console.log(userData, profileData);
  return (
    <>
      <div className="-mt-16 pt-16 ">
        <Topbar />
      </div>
      <div className="flex">
        <LeftBar />
        <div className=" h-[90.5vh] overflow-y-auto overflow-x-hidden">
          <div className="h-[53vh] w-[calc(100vw-288px)] mt-16">
            <div className="h-[40vh] w-full bg-pink-400 relative">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq66TwZTFF_T7Q04v03pBsfQqaWvYh7SHAeQ&s"
                src={`http://localhost:5000/${profileData.coverPicture}`}
                alt="Cover Pic"
                className="h-full w-full object-cover border-blue-500 border-b-4"
              />
              <div className="absolute w-40 h-40 rounded-full  -bottom-20 left-[3%] border-blue-500 border-b-8">
                <img
                  // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq66TwZTFF_T7Q04v03pBsfQqaWvYh7SHAeQ&s"
                  src={`http://localhost:5000/${profileData.profilePicture}`}
                  // src={`http://localhost:5000/uploads/1734427070113-pexels-karolina-grabowska-4210336.jpg`}
                  className="h-full w-full object-cover rounded-full cursor-pointer "
                />
              </div>
            </div>
          </div>
          <div className="px-14 py-3 bg-gradient-to-r from-gray-200 to-blue-300 flex flex-col gap-1">
            <h1 className=" text-3xl font-semibold uppercase">
              {userData.username}
            </h1>
            {/* <h1>Username</h1> */}
            <h1 className="text-xl font-semibold">
              Welcome! to my profile page
            </h1>
            <h1 className="font-serif text-2xl">Bio: {profileData.bio}</h1>
            <h1 className="font-sans text-2xl">City: {profileData.city}</h1>

            <div className="flex gap-5 items-center">
              <h1 className="flex items-center gap-2">
                <span className="text-2xl text-blue-600">500</span> followers
              </h1>
              <h1 className="flex items-center gap-2">
                <span className="text-2xl text-blue-600">500</span> followings
              </h1>
            </div>
          </div>
          <div>
            <MyAllPosts id={id.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default OthersProfile;
