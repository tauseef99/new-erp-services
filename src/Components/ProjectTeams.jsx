// src/pages/ProjectTeams.jsx
import React from "react";
import { motion } from "framer-motion";
import comingSoonImg from "../Assets/images/ComingSoon.jpg"; 

const ProjectTeams = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <motion.img
        src={comingSoonImg}
        alt="Coming Soon"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg"
        >
          Coming Soon
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-4 text-xl md:text-2xl text-[#FFA500] font-semibold"
        >
          Project Teams feature under development
        </motion.p>
      </div>
    </div>
  );
};

export default ProjectTeams;
