import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayRemixAlbum from './DisplayRemixAlbum'
import { albumsData } from '../assets/assets'


const Display = () => {

  const displayref = useRef();
  const location = useLocation()
  const isRemixAlbum = location.pathname.includes('remix-album');
  const remixAlbumId = isRemixAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(remixAlbumId)].bgColor

 useEffect(()=>{
  
  if(isRemixAlbum) {
    displayref.current.style.background = `linear-gradient(${bgColor} , #121212, #000000)`
  } else {
     displayref.current.style.background = '#121212'
  }

 })
 

  return (
    <div ref={displayref} className='w-full lg:w-[65%] lg:ml-0 mt-2 px-4 rounded bg-[#121212] text-white overflow-auto'>
        <Routes>
            <Route path='/' element={<DisplayHome/>}/>
            <Route path='/remix-album/:id' element={<DisplayRemixAlbum/>}/>
        </Routes>
    </div>
  )
}

export default Display