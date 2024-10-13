import React from "react";
import logo from "../assets/spotify.svg";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
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
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium ">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="username"
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 bg-inherit"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="name@domain.com"
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
              className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-green-400 bg-inherit"
            />
          </div>

          {/* Next Button */}
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
