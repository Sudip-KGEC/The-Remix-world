import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import Navbar from "./components/Navbar";
import GoogleAdsSidebar from "./components/GoogleAdsSidebar";
import { playerContext } from "./context/PlayerContext";

const App = () => {
 
   const {remixRef , trackProgress} = useContext(playerContext).contextValue;

  //  console.log(trackProgress) 

  return (
    <div className="h-screen bg-black text-white flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar (hidden mobile) */}
        <Sidebar />

        {/* Main Display */}
        <Display />

        {/* Google Ads Right Sidebar */}
        <GoogleAdsSidebar/>

      </div>

      {/* Player */}
      <Player />
      <audio ref={remixRef} src={trackProgress.file} preload="auto"></audio>

    </div>
  );
};

export default App;