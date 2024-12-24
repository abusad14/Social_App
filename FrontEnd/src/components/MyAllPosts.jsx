import axios from "axios";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaCommentDots } from "react-icons/fa";

const MyAllPosts = ({ id }) => {
  console.log(id);
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/post/myAllPosts/${id}`
      );
      console.log(res.data);
      setAllPosts(res.data);
    };
    fetchData();
  }, [id]);
  return (
    <>
      <h1 className="text-center m-2 text-2xl font-mono">My Posts</h1>
      {allPosts.length != 0 ? (
        allPosts.map((v, i) => (
          <div
            key={v._id}
            className=" h-[80vh] p-1 m-5 rounded-md shadow shadow-black "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center  gap-1">
                {/* <Link
            className="flex items-center  gap-1"
            to={`/profile/${v.userId}`}
          > */}
                <img
                  src={`http://localhost:5000/${v.profilePicture}`}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-2xl font-bold">{v.username}</h2>
                {/* </Link> */}
              </div>
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
        ))
      ) : (
        <h1>No post yet</h1>
      )}
    </>
  );
};

export default MyAllPosts;
