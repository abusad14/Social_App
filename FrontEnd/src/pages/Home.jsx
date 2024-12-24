import { useEffect, useState } from "react";
import Cover from "../components/Cover";
import LeftBar from "../components/LeftBar";
import Topbar from "../components/Topbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Home = () => {
  const token = localStorage.getItem("authToken");
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  // !decode the token
  const decodedToken = jwtDecode(token);
  console.log("Decode jwt token", decodedToken);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/profile/${decodedToken.userId}`
        );
        setUser(res.data.userData);
        setProfile(res.data.profileData);
        // console.log(res.data.userData, res.data.profileData);
      } catch (error) {
        console.log("error at home page", error);
      }
    };
    fetchData();
  }, [decodedToken.userId]);
  console.log(user, profile);

  return (
    <>
      <Topbar />
      <div className="flex ">
        <LeftBar user={user} profile={profile} />
        {/* <MyContext.Provider value={{ user, profile }}> */}
        <Cover user={user} profile={profile} />
        {/* </MyContext.Provider> */}
      </div>
    </>
    // <>
    //   {user.length > 0 && profile.length > 0 ? (
    //     <>
    //       <Topbar user={user} profile={profile} />
    //       <div className="flex -z-10">
    //         <LeftBar user={user} profile={profile} />
    //         <Cover user={user} profile={profile} />
    //       </div>
    //     </>
    //   ) : (
    //     <p>Loading...</p> // Show a loader or placeholder
    //   )}
    // </>
  );
};

export default Home;
