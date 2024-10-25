import React, { useState } from "react";
import logo from "../assets/spotify.svg";
import { Link, useNavigate } from "react-router-dom";
import { signup,verifyUser } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //to hande the input value changes
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  //to hande the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(inputValues);
    const { message, success } = result;
    if (success) {
     await toast.success(message);
    } else {
      await toast.error(message);
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-svh bg-black text-white md:min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-md p-7 space-y-6">
        {/* logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Spotify Logo" className="w-12 h-12" />
        </div>

        {/* Title */}
        <h1 className="text-center text-5xl font-bold max-w-72 leading-tight mx-auto font-spotifytitle">
          Sign up to start listening
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              onChange={handleOnchange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 bg-inherit"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@domain.com"
              onChange={handleOnchange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 bg-inherit"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={handleOnchange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 bg-inherit"
            />
          </div>

          {/* Signup Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 text-base font-spotifytitle font-extrabold text-black bg-green-500 rounded-full hover:bg-green-600 "
            >
              Signup
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>

        {/* Login link */}
        <div className="space-x-2 flex items-center justify-center">
          <p className="text-gray-500 font-medium text-base font-spotifytitle">
            Already have an account?
            <Link to={"/login"} className="underline text-white ms-1">
              Log in here
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
