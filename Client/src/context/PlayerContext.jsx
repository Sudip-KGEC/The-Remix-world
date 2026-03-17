import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const playerContext = createContext();

const playerContextProvider = ({ children }) => {

    const remixRef = useRef();
    const seekbarRef = useRef();
    const seekbgRef = useRef();

    // console.log(songsData[0].file)

    const [trackProgress, setTrackProgress] = useState(songsData[3]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeProgress, setTimeProgress] = useState({
        currentTime: {
            minutes: '0',
            seconds: '00'
        },
        duration: {
            minutes: '0',
            seconds: '00'
        }
    });



    const playAudio = () => {
        remixRef.current.play();
        setIsPlaying(true);
    };

    const pauseAudio = () => {
        remixRef.current.pause();
        setIsPlaying(false);
    };
    const playWithId = async (id) => {
        await setTrackProgress(songsData[id]);
        await remixRef.current.play();
        setIsPlaying(true);


    };

    const previousSong = async () => {

        if (trackProgress.id > 0) {
            await setTrackProgress(songsData[trackProgress.id - 1]);
            await remixRef.current.play();
            setIsPlaying(true);
        }
    };

    const nextSong = async () => {

        if (trackProgress.id < songsData.length - 1) {
            await setTrackProgress(songsData[trackProgress.id + 1]);
            await remixRef.current.play();
            setIsPlaying(true);
        };
    };

    const seekAudio = (event) => {
        const seekbarWidth = seekbgRef.current.clientWidth;
        const clickX = event.nativeEvent.offsetX;
        const seekTime = (clickX / seekbarWidth) * remixRef.current.duration;
        remixRef.current.currentTime = seekTime;
    };


    useEffect(() => {
        setTimeout(() => {
            remixRef.current.ontimeupdate = () => {

                seekbarRef.current.style.width = `${(remixRef.current.currentTime / remixRef.current.duration) * 100}%`


                setTimeProgress({
                    currentTime: {
                        minutes: Math.floor(remixRef.current.currentTime / 60).toString().padStart(1, '0'),
                        seconds: Math.floor(remixRef.current.currentTime % 60).toString().padStart(2, '0')
                    },
                    duration: {
                        minutes: Math.floor(remixRef.current.duration / 60).toString().padStart(1, '0'),
                        seconds: Math.floor(remixRef.current.duration % 60).toString().padStart(2, '0')
                    }
                })
            }

        }, 1000)


    }, [remixRef])


    const contextValue = {
        remixRef,
        seekbarRef,
        seekbgRef,
        trackProgress,
        setTrackProgress,
        isPlaying,
        setIsPlaying,
        timeProgress,
        setTimeProgress,
        playAudio,
        pauseAudio,
        playWithId,
        previousSong,
        nextSong,
        seekAudio
    };



    return (
        <playerContext.Provider value={{ contextValue }}>
            {children}
        </playerContext.Provider>
    );
}

export default playerContextProvider;