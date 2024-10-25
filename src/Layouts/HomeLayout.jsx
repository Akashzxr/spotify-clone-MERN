import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Await, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { verifyUser } from "../api/auth";
import { toast,ToastContainer } from "react-toastify";

function HomeLayout() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    //verifiying if token is there in cookie
    const verifyCookie = async () => {
      
      //verifiying the user through token
      const result = await verifyUser();
      const { status, user } = result;

      if(!status){
        removeCookie("token");
        navigate("/login");
      }
     
    };

    verifyCookie();
  }, [cookies, navigate]);

 
 

  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default HomeLayout;
