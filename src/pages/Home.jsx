import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar/>
       <div className='flex'>
         <Sidebar/>
       </div>
      <Footer/>
    </div>
  )
}

export default Home
