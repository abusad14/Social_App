import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password1 !== data.password2) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/register", {
        username: data.username,
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      });
      alert("Signup Success");
      console.log("Register success", res.data);

      setData({
        username: "",
        email: "",
        password1: "",
        password2: "",
      });
      navigate("/login");
    } catch (error) {
      console.log("This is catch", error);
    }
  };
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-300">
      <div className="h-[70%]  hidden md:flex w-1/3  items-center justify-center flex-col gap-5">
        <h1 className="text-blue-600 text-6xl font-bold">Social</h1>
        <h2 className="text-2xl">Connect with friends and family</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="h-[70%] lg:h-[65%] w-[80vw] md:w-[40%] rounded-md border-2 shadow-lg shadow-black  flex p-3 flex-col bg-white gap-3 justify-center"
      >
        <input
          type="text"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="USERNAME"
          name="username"
          value={data.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="E-MAIL"
          value={data.email}
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          placeholder="PASSWORD"
          value={data.password1}
          name="password1"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="PASSWORD AGAIN"
          name="password2"
          value={data.password2}
          onChange={handleChange}
          required
        />
        {error && <p>{error}</p>}
        <button className="bg-blue-600 text-white h-10 lg:h-12 w-full rounded-md text-xl ">
          Sign Up
        </button>
        <Link
          to="/login"
          className="w-1/2 bg-green-600 text-white h-10 lg:h-12  rounded-md text-xl flex justify-center items-center mx-auto flex-wrap overflow-auto "
        >
          Log into Account
        </Link>
      </form>
    </div>
  );
};

export default Signup;
