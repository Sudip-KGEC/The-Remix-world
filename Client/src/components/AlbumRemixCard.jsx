import React from 'react'
import { useNavigate } from 'react-router-dom'

const AlbumRemixCard = ({image , name , desc , id}) => {
 
    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate(`/remix-album/${id}`)
    }

  return (
    <div onClick={()=> handleClick(id)} className='min-w-45 max-w-60 p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff12]'> 
        <img src={image} className='rounded' alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-300 text-sm'>{desc}</p>
    </div>
  )
}

export default AlbumRemixCard