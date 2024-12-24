import { useEffect, useState } from "react";
import LeftBar from "../components/LeftBar";
import Topbar from "../components/Topbar";
import Post from "./Post";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import MyAllPosts from "./MyAllPosts";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  // const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  const [userData, setUserData] = useState("");
  const [profileData, setProfileData] = useState("");
  const [loading, setLoading] = useState(true);

  // console.log(decodedToken.userId);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/profile/my/${decodedToken.userId}`
        );
        setUserData(response.data.userData);
        setProfileData(response.data.profileData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [decodedToken.userId]);
  // console.log(userData, profileData);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  // if (!profileData || userData) {
  //   return <h1>No Profile or user find</h1>;
  // }
  // console.log("Userdata", userData);
  // console.log("ProfilePicture", profileData.profilePicture);
  return (
    <>
      <Topbar user={userData} profile={profileData} />
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
              <div className="absolute w-40 h-40 rounded-full  -bottom-20 left-[3%] group border-blue-500 border-b-8">
                <Link to={`/profile/update/${decodedToken.userId}`}>
                  <img
                    // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq66TwZTFF_T7Q04v03pBsfQqaWvYh7SHAeQ&s"
                    src={`http://localhost:5000/${profileData.profilePicture}`}
                    // src={`http://localhost:5000/uploads/1734427070113-pexels-karolina-grabowska-4210336.jpg`}
                    className="h-full w-full object-cover rounded-full cursor-pointer hover:opacity-70"
                  />
                  <span className="absolute opacity-0 group-hover:opacity-100 text-2xl top-[40%] bg-white hover:outline-none ring-1 ring-blue-500 mt-4 rounded-lg">
                    Update Profile
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="px-14 py-3 bg-gradient-to-r from-gray-200 to-blue-300 flex flex-col gap-1">
            <h1 className=" text-3xl font-semibold">{userData.username}</h1>
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
            {/* <Post /> */}
            {/* <h1>My posts</h1> */}
            <MyAllPosts id={decodedToken.userId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
