import React from 'react'
import MusicCard from '../components/MusicCard'
import img from '../assets/img.jpg'


function Home() {
  const items = [1,2,3,4,5]
  return (
   <div className='bg-background-gray w-full px-6 py-5 flex flex-col gap-10 max-h-78.1vh overflow-y-auto'>
    {/* latest songs */}
     <div className='flex flex-col gap-6'>
       <h2 className='text-white font-spotifytitle font-bold text-2xl tracking-wider'>Latest songs</h2>
       <div className='flex items-center justify-between'>
        {
          items.map((items,index)=>(
            <MusicCard key={index} image={img}/>
          ))
        }
       </div>
     </div>

     {/* top 5 songs */}
     <div className='flex flex-col gap-6'>
       <h2 className='text-white font-spotifytitle font-bold text-2xl tracking-wider'>Top Five</h2>
       <div className='flex items-center justify-between'>
        {
          items.map((items,index)=>(
            <MusicCard image={img}/>
          ))
        }
       </div>
     </div>
   </div>
  )
}

export default Home
