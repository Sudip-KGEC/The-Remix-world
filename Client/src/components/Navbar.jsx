import React from 'react'
import { assets } from '../assets/assets'
import GoogleAdsNavbar from './GoogleAdsNavbar'

const Navbar = () => {
  return (
    <>
     <nav className='w-full h-[10%] flex font-semibold items-center justify-between px-4 py-2 border-b border-neutral-800 '>
     <div className='flex items-center  gap-8 w-[12%] lg:w-[25%]'>
       <img src={assets.the_remix_world_logo} className='w-10 rounded-2xl' alt="" />
       <div className="search lg:flex items-center gap-2 hidden  border-slate-800 border px-2  py-1 rounded">
        <input type="text" name="" id="" className='w-full  text-white border-0 px-2 outline-none' placeholder='Search remix...' />
        <button>
            <img src={assets.search_icon} className='w-6' alt=""  />
        </button>
       </div>
     </div>

   <div className="ads-nav w-[80%] lg:w-[55%]  h-12 rounded-lg px-1">
    <GoogleAdsNavbar/>
    </div>

        <div className='flex items-center gap-2 w-[8%] lg:w-[20%] ml-auto justify-end'>
            <p className='bg-purple-600 text-sm px-3 py-1 rounded-2xl hidden lg:block cursor-pointer'>Exprole Premium</p>
            <p className='bg-black text-white text-sm px-2 py-1 hidden lg:block rounded-2xl cursor-pointer'>Install App</p>
            <p className='bg-blue-700 text-white w-7 h-7 rounded-full flex justify-center items-center'>S</p>
        </div>  
    </nav>
    <div className='px-4 '>
         <div className="search flex items-center gap-2 lg:hidden  border-slate-800 border px-5  py-2 rounded">
        <input type="text" name="" id="" className='w-full  text-white border-0 px-2 outline-none' placeholder='Search remix...' />
        <button>
            <img src={assets.search_icon} className='w-6' alt=""  />
        </button>
       </div>
    </div>
      
     </>
  )
}

export default Navbar