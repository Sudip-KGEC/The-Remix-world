import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { playerContext } from '../context/PlayerContext'

const Player = () => {

    const { trackProgress, seekbarRef, seekbgRef, isPlaying, playAudio, pauseAudio, timeProgress, previousSong,
        nextSong, seekAudio} = useContext(playerContext).contextValue;

    return (
        <div className='w-full bottom-0 h-[10%] bg-black flex justify-between items-center px-4 text-white border-t border-neutral-800'>
            <div className=' hidden lg:flex items-center gap-4'>
                <img src={trackProgress.image} className='w-12' alt="" />
                <div>
                    <p>{trackProgress.name}</p>
                    <p>{trackProgress.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-3 m-auto'>
                <div className='flex  gap-6 lg:gap-4 '>
                    <img src={assets.shuffle_icon} className='w-4 cursor-pointer' alt="" />
                    <img onClick={previousSong} src={assets.prev_icon} className='w-4 cursor-pointer' alt="" />
                    {isPlaying ? (
                        <img onClick={pauseAudio} src={assets.pause_icon} className='w-4 cursor-pointer' alt="" />
                    ) : (
                        <img onClick={playAudio} src={assets.play_icon} className='w-4 cursor-pointer' alt="" />
                    )}
                    <img onClick={nextSong} src={assets.next_icon} className='w-4 cursor-pointer' alt="" />
                    <img src={assets.loop_icon} className='w-4 cursor-pointer' alt="" />
                </div>
                <div className='flex items-center gap-5'>
                    <p className='text-xs'>{timeProgress.currentTime.minutes} : {timeProgress.currentTime.seconds}</p>
                    <div ref={seekbgRef} onClick={seekAudio} className='w-[60vw] lg:w-[30vw] h-1 bg-slate-300 rounded-full cursor-pointer'>
                        <div ref={seekbarRef} className='w-[10vw] h-1 bg-purple-600 rounded-full' />
                    </div>
                    <p className='text-xs'>{timeProgress.duration.minutes} : {timeProgress.duration.seconds}</p>
                </div>
            </div>

            <div className='hidden lg:flex items-center gap-1 opacity-75'>
                <img className='w-4' src={assets.plays_icon} alt="" />
                <img className='w-4' src={assets.mic_icon} alt="" />
                <img className='w-4' src={assets.queue_icon} alt="" />
                <img className='w-4' src={assets.speaker_icon} alt="" />
                <img className='w-4' src={assets.volume_icon} alt="" />
                <div className='w-20 h-1 bg-slate-300 rounded-full'>
                    <div className='w-10 h-1 bg-purple-600 rounded-full'></div>
                </div>
                <img className='w-4' src={assets.mini_player_icon} alt="" />
                <img className='w-4' src={assets.zoom_icon} alt="" />
            </div>
        </div>
    )
}

export default Player