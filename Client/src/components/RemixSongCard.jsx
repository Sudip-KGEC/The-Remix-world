import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import { playerContext } from '../context/PlayerContext'

const RemixSongCard = ({title , image , desc , id }) => {
  
    // const navigate = useNavigate()
    const {playWithId} = useContext(playerContext).contextValue


    const handleClick = (id) => {
        playWithId(id)
        // navigate(`/song/${id}`)
    }   
  return (
    <div  onClick={()=> handleClick(id)} className='min-w-45 max-w-60 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff10]'>
        <img src={image} className='rounded' alt="" />
        <p className='font-bold mt-2 mb-1'>{title}</p>
        <p className='text-slate-300 text-sm'>{desc}</p>
    </div>
  )
}

export default RemixSongCard