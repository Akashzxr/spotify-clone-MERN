import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Await, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { verifyUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import MobilePlayer from "../components/MobilePlayer";

function HomeLayout() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [width, setWidth] = useState(window.innerWidth); //765

  useEffect(() => {
    //verifiying if token is there in cookie
    const verifyCookie = async () => {
      //verifiying the user through token
      const result = await verifyUser();
      const { status, user } = result;
      console.log(status);
      console.log(user);

      if (!status) {
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies]);

  return (
    <div>
      {width >= 765 ? (
        <div className="h-screen flex-col hidden md:flex">
          <Navbar />
          <div className="flex">
            <Sidebar />
            <Outlet />
          </div>
          <Footer />
        </div>
      ) : (
        /* for mobile screens */
        <div className="lg:hidden">
          <Navbar />
          <Outlet />
          <div>
            <MobilePlayer />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeLayout;
