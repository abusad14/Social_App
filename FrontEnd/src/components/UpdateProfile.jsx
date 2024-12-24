import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
// import { toast, ToastContainer } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  // const [userId, setUserId] = useState("");
  const [data, setData] = useState({
    bio: "",
    city: "",
    profilePicture: null,
    coverPicture: null,
  });
  const changeHandler = (e) => {
    if (e.target.files) {
      setData({ ...data, [e.target.name]: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const params = useParams();
  console.log(params.id);

  // !Decoding the token to get userID

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     const dcodedToken = jwtDecode(token);
  //     setUserId(dcodedToken.userId);
  //   }
  //   console.log(userId);
  // }, [userId]);
  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("Submit handler");
    // console.log(localStorage.getItem("authToken"));

    // console.log(id);

    const formData = new FormData();
    formData.append("bio", data.bio);
    formData.append("city", data.city);
    formData.append("profilePicture", data.profilePicture);
    formData.append("coverPicture", data.coverPicture);

    try {
      const res = await axios.put(
        `http://localhost:5000/profile/update/${params.id}`,
        formData
      );
      console.log("Profile updated", res.data);
      setData({
        bio: "",
        city: "",
        profilePicture: null,
        coverPicture: null,
      });
      navigate(`/profile/my/${params.id}`);
      // alert("Data uploaded successfully");
      // Clear file inputs
      // document.querySelector("input[name='profilePicture']").value = "";
      // document.querySelector("input[name='coverPicture']").value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={submitHandler}
        className="h-[80vh] w-[50vw] rounded-md border-2 shadow-lg shadow-black  flex p-5 flex-col mx-auto bg-white gap-7 justify-center"
      >
        <h1 className="text-blue-500 text-3xl font-bold text-center">
          Update profile
        </h1>
        <input
          type="text"
          className="h-12 border-2 px-2 text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="BIO..."
          name="bio"
          value={data.bio}
          onChange={changeHandler}
        />
        <input
          type="text"
          className="h-12 border-2 px-2 text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="City"
          name="city"
          value={data.city}
          onChange={changeHandler}
        />
        <div>
          <label className="text-2xl">Profile : </label>
          <input
            type="file"
            className="h-12  px-2 text-2xl "
            name="profilePicture"
            onChange={changeHandler}
          />
        </div>
        <div>
          <label className="text-2xl">Cover : </label>
          <input
            type="file"
            className="h-12  px-2 text-2xl "
            name="coverPicture"
            onChange={changeHandler}
          />
        </div>
        <button className="bg-blue-600 text-white h-12 rounded-md text-2xl ">
          Update
        </button>
      </form>
      <Link
        to={`/profile/my/${params.id}`}
        className="w-1/2 bg-green-600 text-white h-12 rounded-md text-2xl  flex justify-center items-center mx-auto"
      >
        Show Profile
      </Link>
    </>
  );
};

export default UpdateProfile;
