import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const DisplayNavbar = () => {

  const navigate = useNavigate()

  return (

    <>
     <div className='flex items-center mt-2 gap-2'>
       <div className='flex items-center gap-2'>
            <img onClick={()=> navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left}  alt="" />
            <img onClick={()=> navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
        </div>
        <p className='bg-purple-600  px-4 py-1 rounded-2xl cursor-pointer'>All</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>EDM Remix</p>
        <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>DJ Artists</p>
     </div>
    </>
  )
}

export default DisplayNavbar