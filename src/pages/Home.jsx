import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar/>
      <Footer/>
    </div>
  )
}

export default Home
