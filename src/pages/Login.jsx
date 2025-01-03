import React, { useEffect, useState } from "react";
import logo from "../assets/spotify.svg";
import { Link, useNavigate } from "react-router-dom";
import { login, verifyUser } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

function Login() {
  const navigate = useNavigate();
  const [inputvalue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  //handle the changing input
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputvalue,
      [name]: value,
    });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(inputvalue);
    const { message, success, token } = await result;

    console.log("token:" + token);

    setCookie("token", token, {
      path: "/", // Make the cookie accessible across the site
      maxAge: 3 * 24 * 60 * 60, // Cookie expiration in seconds (3 days)
      httpOnly: false, // This is client-side, so httpOnly is not applicable
    });

    /*  console.log("token cookie:"+cookies.token); */

    //verifiying the user through token
    /* const verifyCookie = async () => {
      const result2 = await verifyUser();
      const { status, user } = await result2;
      console.log(status);
      console.log(user);

      if (!status) {
        // removeCookie("token");
        navigate("/login");
        console.log("error is there");
      } else {
        navigate("/");
      }
    }; */

    /*  if (success) {
      navigate("/");
    } else {
      toast.error(message);
    } */
  };

  useEffect(() => {
    if (cookies.token) {
      console.log("Updated cookies.token:", cookies.token);
      const verifyCookie = async () => {
        const result2 = await verifyUser(cookies.token);
        const { status, user } = await result2;
        console.log(status);
        console.log(user);

        if (!status) {
          // removeCookie("token");
          navigate("/login");
          console.log("error is there");
        } else {
          navigate("/");
        }
      };
      verifyCookie();
    }
  }, [cookies]);

  return (
    <div className="flex items-center justify-center min-h-svh bg-black text-white md:min-h-screen">
      <ToastContainer />
      <div className="w-full max-w-md p-7 space-y-6">
        {/* logo */}
        <div className="flex justify-center">
          <img src={logo} alt="Spotify Logo" className="w-12 h-12" />
        </div>

        {/* Title */}
        <h1 className="text-center text-4xl font-bold max-w-72 leading-tight mx-auto font-spotifytitle">
          Log in to Spotify
        </h1>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3 text-base font-spotifytitle font-extrabold text-black bg-green-500 rounded-full hover:bg-green-600 "
            >
              Log In
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center space-x-2">
          <hr className="flex-grow border-t border-gray-600" />
          <span className="text-sm">or</span>
          <hr className="flex-grow border-t border-gray-600" />
        </div>

        {/* Register link */}
        <div className="space-x-2 flex items-center justify-center">
          <p className="text-gray-500 font-medium text-sm font-spotifytitle md:text-base">
            Don't have an account?
            <Link to={"/register"} className="underline text-white ms-1">
              Sign up for Spotify
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
