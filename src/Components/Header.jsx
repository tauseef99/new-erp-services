import React, { useRef, useState } from "react";
import { FaArrowRight, FaSearch, FaPause, FaPlay } from "react-icons/fa";
import heroVideo from "../Assets/videos/Header-bg.mp4"; 

const HeroHeader = () => {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const tags = [
    "SAP Consulting",
    "Microsoft Dynamics",
    "Oracle ERP",
    "ERP Development",
    "NetSuite Customization",
    "Cloud Migration",
  ];

  const trustedBy = ["Google", "NETFLIX", "P&G", "PayPal", "Payoneer"];

  return (
    <header className="relative w-full xl:h-screen min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
    
      {/* Content */}
      <div className="relative z-20 flex flex-col max-w-7xl mx-auto justify-center h-full px-4 text-white">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 text-center pt-20 md:pt-32 lg:pt-[200px]">
          Your first meeting with {" "}
          <br className="hidden xs:block" />
           ERP Consultant starts Here!
        </h1>
    
        {/* Filters Box */}
        <div className="w-full md:w-[90%] lg:w-[80%] mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end text-gray-800 shadow-lg rounded-lg border-[3pt] sm:border-[4pt] border-[#FFA500] bg-black/40">
          {/* ERP System Dropdown */}
          <div>
            <p className="pb-2 sm:pb-3 font-semibold text-center text-white text-sm sm:text-base">Select ERP</p>
            <select className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base">
              <option value="">Choose ERP System</option>
              <option value="sap">SAP</option>
              <option value="oracle">Oracle</option>
              <option value="microsoft">Microsoft Dynamics</option>
            </select>
          </div>

          {/* Module Dropdown */}
          <div>
            <p className="pb-2 sm:pb-3 font-semibold text-center text-white text-sm sm:text-base">Select Module</p>
            <select className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base">
              <option value="">Choose Module</option>
              <option value="finance">Finance</option>
              <option value="hr">Human Resources</option>
              <option value="inventory">Inventory</option>
            </select>
          </div>

          {/* Experience Dropdown */}
          <div>
            <p className="pb-2 sm:pb-3 font-semibold text-center text-white text-sm sm:text-base">Consultant Experience</p>
            <select className="w-full px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ACC8F] text-sm sm:text-base">
              <option value="">Experience Level</option>
              <option value="0-1">0-1 Year</option>
              <option value="2-4">2-4 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="flex justify-center mt-2 sm:mt-0">
            <button className="flex justify-center items-center gap-2 bg-[#FFA500] hover:bg-[#cc8400] text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all duration-200 text-sm sm:text-base w-full sm:w-auto">
              Find Consultants
            </button>
          </div>
        </div>
        
        {/* Video Control Button (Mobile Only) */}
        <div className="fixed bottom-4 right-4 z-30 md:hidden">
          <button 
            onClick={handleVideoToggle}
            className="p-3 bg-black/50 rounded-full text-white"
            aria-label={isPaused ? "Play video" : "Pause video"}
          >
            {isPaused ? <FaPlay size={20} /> : <FaPause size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeroHeader;