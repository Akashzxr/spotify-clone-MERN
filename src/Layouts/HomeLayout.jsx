import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

function HomeLayout() {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar/>
       <div className='flex'>
         <Sidebar/>
         <Outlet/>
       </div>
      <Footer/>
    </div>
  )
}

export default HomeLayout
