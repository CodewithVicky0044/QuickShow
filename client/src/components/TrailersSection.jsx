import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { dummyTrailers } from "../assets/assets";
import { Play } from "lucide-react";
import BlurCircle from "./BlurCircle";

const TrailersSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20 relative overflow-hidden">
      
      {/* 🔥 Background Blur */}
      <BlurCircle top="-100px" right="-120px" />
      <BlurCircle bottom="-100px" left="-120px" />

      {/* Heading */}
      <p className="text-gray-300 text-lg font-medium mb-6 relative z-10">
        Trailers
      </p>

      {/* 🎬 VIDEO WRAPPER */}
      <div className="relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(248,69,101,0.15)]">

        {/* 🔥 IMPORTANT FIX */}
        <ReactPlayer
          url={currentTrailer.videoUrl}
          playing={playing}
          controls
          width="100%"
          height="100%"
          className="absolute top-0 left-0"
        />

        {/* ▶ Overlay */}
        {!playing && (
          <div
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          >
            <div className="bg-white/20 p-4 rounded-full hover:scale-110 transition">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          </div>
        )}
      </div>

      {/* 🎞️ THUMBNAILS */}
      <div className="flex justify-center gap-5 mt-8 flex-wrap relative z-10">
        {dummyTrailers.map((trailer, index) => (
          <div
            key={index}
            onClick={() => {
              setCurrentTrailer(trailer);
              setPlaying(false);
            }}
            className={`relative w-[150px] h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 
            ${
              currentTrailer.videoUrl === trailer.videoUrl
                ? "ring-2 ring-primary scale-105"
                : "opacity-80 hover:opacity-100"
            }`}
          >
            <img
              src={trailer.image}
              alt=""
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailersSection;