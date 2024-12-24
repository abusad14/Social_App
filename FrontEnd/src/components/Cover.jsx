import Post from "./Post";
import RightBar from "./RightBar";
import StoryBox from "./StoryBox";

const Cover = ({ user, profile }) => {
  const userData = user;
  const profileData = profile;
  return (
    <>
      {/* <div className=" w-[calc(100vw-200px)] bg-green-400 mt-16 overflow-scroll h-[90.5vh] "> */}
      <div className=" w-[calc(100vw-200px)]  mt-16 h-[90.5vh] flex">
        <div className=" w-[75%] h-full overflow-scroll overflow-x-hidden">
          <StoryBox user={userData} profile={profileData} />
          <Post user={userData} profile={profileData} />
        </div>
        <div className="w-[30%] h-full overflow-scroll  overflow-x-hidden px-3">
          <RightBar user={userData} profile={profileData} />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default Cover;
