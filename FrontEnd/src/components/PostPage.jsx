import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PostPage = () => {
  const navigate = useNavigate();
  // !Decoding token to get the userId
  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token);
  const userId = decode.userId;
  //   console.log("userID", userId);

  const [title, setTitle] = useState("");
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const [image, setImage] = useState(null);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    async function fetchData() {
      try {
        // Create FormData object
        const formData = new FormData();
        formData.append("title", title);
        formData.append("image", image);

        // Send data to the backend
        const data = await axios.post(
          `http://localhost:5000/post/share/${userId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log("Data is..", data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    setImage(null);
    setTitle("");
    navigate("/home");
    // console.log(title, image);
  };

  return (
    <>
      <form
        // action="http://localhost:5000/post/share"
        // method="post"
        onSubmit={handleSubmit}
        className="flex flex-col bg-red-300 gap-5 h-[50vh] items-center justify-center w-[50vw] m-auto mt-10 p-5 text-3xl border-2 border-blue-300 rounded-lg"
      >
        <div>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Title"
            onChange={titleHandler}
            required
          />
        </div>
        <input type="file" name="image" onChange={imageHandler} />
        <button className="bg-green-300 w-1/4 rounded-xl hover:scale-110">
          Share
        </button>
      </form>
    </>
  );
};

export default PostPage;
