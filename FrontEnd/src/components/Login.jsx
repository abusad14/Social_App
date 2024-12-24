import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [id, setId] = useState("");
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );
      // console.log(res.data);
      localStorage.setItem("authToken", res.data.token);
      console.log(localStorage.getItem("authToken"));
      // setId(res.data.user._id);
      console.log(
        "Login success "
        // localStorage.getItem("authToken")
        // "id",
        // id
        // res.data.user._id
      );
      // console.log("Id is..", id);
      // navigate(`/profile/${res.data.user._id}`);
      navigate(`/home`);
    } catch (error) {
      alert("Something wrong");
      console.log(error);
    }
  };
  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-gray-300">
      <div className="h-[70%]  hidden lg:flex w-1/3  items-center justify-center flex-col gap-5 ">
        <h1 className="text-blue-600 text-6xl font-bold">Social</h1>
        <h2 className="text-2xl">Connect with friends and family</h2>
      </div>
      <form
        onSubmit={submitHandler}
        className="h-[60%] lg:h-[55%] w-[80vw] lg:w-1/3  rounded-md border-2 shadow-lg shadow-black  flex p-5 flex-col bg-white gap-3 justify-center"
      >
        <input
          type="email"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="E-MAIL"
          name="email"
          onChange={changeHandler}
        />
        <input
          type="password"
          className="h-10 lg:h-12 w-full border-2 px-2 text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="PASSWORD"
          name="password"
          onChange={changeHandler}
        />
        <button className="bg-blue-600 text-white h-10 rounded-md text-xl ">
          Login
        </button>
        <a href="" className="text-blue-600 text-center">
          Forgot password?
        </a>
        <Link
          to="/"
          className="w-1/2 bg-green-600 text-white h-10 rounded-md text-xl  flex justify-center items-center mx-auto overflow-auto"
        >
          Create new Account
        </Link>
      </form>
    </div>
  );
};

export default Login;
