import React from 'react'
import DisplayNavbar from './DispalyNavbar'
import AlbumRemixCard from './AlbumRemixCard'
import { albumsData, songsData } from '../assets/assets'
import RemixSongCard from './RemixSongCard'


const DisplayHome = () => {
  return (
    <>
     <DisplayNavbar/>
     <div className='mb-4'>
      <h1 className=' my-4 font-bold text-xl'>Trending Remix Albums</h1>
       <div className=' mt-1 flex overflow-auto no-scrollbar '>
         {albumsData.map((album , index) => (
          <AlbumRemixCard key={index} image={album.image} name={album.name} desc={album.desc} id={album.id}/>
         ))}
       </div>
     </div>

     <div className='mb-4'>
      <h1 className=' my-4 font-bold text-xl'>Top EDM Remix</h1>
       <div className=' mt-1 flex overflow-auto no-scrollbar '>
         {songsData.map((remix , index) => (
          <RemixSongCard key={index} image={remix.image} name={remix.name} desc={remix.desc} id={remix.id}/>
         ))}
       </div>
     </div>
    
    </>
  )
}

export default DisplayHome