import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

    const navigate = useNavigate()
  return (
    <div className='h-full w-[20%] lg:ml-0 p-2 flex-col hidden lg:flex gap-2 text-white'>
        <div className='bg-[#121212] h-[10%] rounded flex flex-col justify-center'>
            <div onClick={()=> navigate('/')} className='flex items-center gap-3 pl-6 cursor-pointer  rounded'>
                <img src={assets.home_icon} className='w-5' alt=""  />
                <p className='font-bold'>Home</p>
            </div>
        </div>

        <div className='bg-[#121212] h-[90%] rounded overflow-auto no-scrollbar'>
            <div className='p-3 flex items-center justify-between'>
                <div className='flex items-center gap-2 '>
                    <img  className='w-5' src={assets.stack_icon} alt="" />
                    <p className='font-semibold'>Your Library</p>
                </div>
                <div className='flex items-center gap-3'>
                    <img className='w-4 cursor-pointer' src={assets.arrow_icon} alt="icon" />
                    <img className='w-4 cursor-pointer' src={assets.plus_icon} alt="icon" />
                </div>
            </div>
            <div className='p-3 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-2 pl-4'>
                <h1>Create your first playlist</h1>
                <p className='font-light text-slate-300'>It's easy, we'll help you</p>
                <button className='px-3 py-1 mt-2 bg-purple-600 rounded-2xl text-center text-md cursor-pointer'>Create Playlist</button>
            </div>
            <div className='p-3 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-2 pl-4'>
                <h1>Let's findsome DJ Artist to follow </h1>
                <p className='font-light text-slate-300'>We will keep you update on new Remix songs</p>
                <button className='px-3 py-1 mt-2 bg-purple-600 rounded-2xl text-center text-md cursor-pointer'>Browse DJ Artist</button>
            </div>
        </div>
    </div>
  )
}

export default Sidebar