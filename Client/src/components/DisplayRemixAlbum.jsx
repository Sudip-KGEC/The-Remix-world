import React, { useContext } from 'react'
import DisplayNavbar from './DispalyNavbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets';
import { playerContext } from '../context/PlayerContext';

const DisplayRemixAlbum = () => {

  const {playWithId} = useContext(playerContext).contextValue

  const {id} = useParams();
  const albumProfile = albumsData.find(album => album.id === parseInt(id));


  return (
    <>
      <DisplayNavbar/>
     <div className='mt-10 flex gap-4 flex-col md:flex-row md:items-end'>
        <img src={albumProfile.image} className='w-48 rounded' alt="" />
        <div className='flex flex-col gap-2'>
            <p className='text-md font-semibold text-slate-400'>Playlist</p>
            <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold '>{albumProfile.name}</h2>
            <p className='text-sm font-semibold text-slate-400 mt-2'>{albumProfile.desc}</p>
            <p className='mt-1 flex gap-2 items-center text-sm font-semibold text-slate-400'>
              <img src={assets.the_remix_world_logo} className='w-8 rounded-2xl' alt="" />
              <b>The Remix World</b>
                - 12,345 likes
                - 50 Remixes
                - songs, 1 hr 30 min
            </p>
        </div>
     </div>

     <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p className='text-sm font-semibold'><b className='mr-1'>#</b>Title</p>
        <p className='text-sm font-semibold'>Album</p>
        <p className='text-sm font-semibold hidden sm:block'>Date Added</p>
        <img src={assets.clock_icon} alt="" className='w-4 m-auto' />
     </div>
     <hr/>
     {
       songsData.map((remix , index) => (
        <div onClick={()=> playWithId(remix.id)} key={index} className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-3 items-center text-[#a7a7a7]  hover:bg-[#ffffff12] cursor-pointer'>
           <p className='text-white items-center'>
            <b className='mr-1 text-[#a7a7a7]'>{index + 1}</b>
             <img src={remix.image} className='w-8 mr-2 inline' alt="" />
             {remix.name}
           </p>
           <p className='text-sm'>{albumProfile.name}</p>
            <p className='text-sm hidden sm:block'>2 days ago</p>
            <p className='text-sm text-center'>{remix.duration}</p>
        </div>
       ))
     }
    </>
  )
}

export default DisplayRemixAlbum