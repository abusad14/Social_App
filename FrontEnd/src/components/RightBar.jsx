import { useContext } from "react";
// import { MyContext } from "../pages/Home";
import { Link } from "react-router-dom";

const RightBar = ({ user, profile }) => {
  // const data = useContext(MyContext);
  // console.log(user.username, profile);

  return (
    <>
      <div className=" h-32 w-full my-5">
        <h1 className="text-2xl font-semibold">{user.username}❤️</h1>
        <h1 className="text-2xl ">City : {profile.city}</h1>
        <h1 className="text-2xl ">Bio : {profile.bio}</h1>
        <h1>Right bar</h1>
      </div>
      {/* <hr /> */}
      <Link
        to="/home/sharePost"
        className="bg-green-400 px-4 text-3xl rounded-lg "
      >
        Share a post{" "}
      </Link>
    </>
  );
};

export default RightBar;
