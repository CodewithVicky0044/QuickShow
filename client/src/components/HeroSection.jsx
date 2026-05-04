import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight, CalendarIcon, ClockIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center md:items-start justify-center gap-4 px-6 md:px-16 lg:px-36 bg-[url('/backgroundImage.png')] bg-cover bg-center h-screen text-center md:text-left">
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 flex flex-col items-center md:items-start">
        <img src={assets.marvelLogo} alt="Marvel logo" className="h-8 sm:h-10 lg:h-11 mt-16 md:mt-20" />

        <h1 className="text-4xl sm:text-5xl md:text-[64px] md:leading-[1.05] font-semibold max-w-[700px] mt-4">
          Guardians
          <br />
          of the Galaxy
        </h1>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 text-gray-200 mt-2 text-sm sm:text-base">
          <span>Action | Adventure | Sci-Fi</span>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" /> 2018
          </div>
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" /> 2h 8m
          </div>
        </div>

        <p className="max-w-md text-gray-200 mt-1 text-sm sm:text-base">
          In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
        </p>

        <button
          onClick={() => navigate("/movies")}
          className="mt-2 flex items-center gap-1 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
        >
          Explore Movies
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;

