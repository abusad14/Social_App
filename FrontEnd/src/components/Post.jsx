import { BiLike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = () => {
  const [postsData, setPostsData] = useState([]);
  // console.log(user, profile);

  // !Fetching all the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/post/allPost`);
        setPostsData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {postsData.map((v, i) => (
        <div
          key={v._id}
          className=" h-[80vh] p-1 m-5 rounded-md shadow shadow-black "
        >
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center  gap-1"> */}
            <Link
              className="flex items-center  gap-1"
              to={`/profile/${v.userId}`}
            >
              <img
                src={`http://localhost:5000/${v.profilePicture}`}
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-2xl font-bold">{v.username}</h2>
            </Link>
            {/* </div> */}
            <div className="flex">
              <h3 className="text-xl">5 min ago</h3>
            </div>
          </div>
          <p className="text-2xl ">{v.title}</p>
          <img
            src={`http://localhost:5000/${v.image}`}
            className="h-[75%] w-full object-cover my-1 rounded-md"
          />
          <div className="flex justify-between items-center p-2">
            <div className="flex gap-2 items-center">
              <BiLike className="text-4xl" />
              <h1>20 peopel liked</h1>
            </div>
            <div className="flex items-center gap-2">
              <FaCommentDots className="text-4xl" />
              <h1>20 comments</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
    // <>
    //   <h1>Post Page...</h1>
    //   {/* <h2>ID:{postsData[0]._id}</h2> */}
    // </>
  );
};

export default Post;
