import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaArrowRight,
  FaUserAlt,
  FaCalendarAlt,
  FaBullhorn,
  FaVideo,
} from "react-icons/fa";
import SellerLayout from "../layouts/SellerLayout";
import { Link } from "react-router-dom";
import axios from "axios";

const SellerDashboard = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  useEffect(() => {
    fetchProfileImage();
  }, []);

  const fetchProfileImage = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoadingImage(false);
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      const response = await axios.get('http://localhost:5000/api/seller/profile', {
        headers: { 
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data && response.data.profileImage) {
        setProfileImage(response.data.profileImage);
      }
    } catch (error) {
      console.log('Profile image fetch error:', error.response?.data || error.message);
    } finally {
      setLoadingImage(false);
    }
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }, []);

  const infoCards = [
    {
      icon: <FaUserAlt className="text-emerald-500 text-xl" />,
      title: "Win twice with your Personal Assistant",
      desc: "Activate your assistant to join your fellow freelancers saving an average of 3 hours per day and seeing up to 85% more client conversions.",
      cta: "Activate Now",
    },
    {
      icon: <FaCalendarAlt className="text-purple-500 text-xl" />,
      title: "Join our live Q&A for Fiverr Go",
      desc: "On March 18, Founder and CEO Micha Kaufman will answer your questions, share insights, and discuss all things Fiverr Go.",
      cta: "Register Now",
    },
    {
      icon: <FaBullhorn className="text-amber-500 text-xl" />,
      title: "Reach more potential clients",
      desc: "One or more of your offerings can be promoted through Fiverr Ads.",
      cta: "Promote Gigs",
    },
    {
      icon: <FaVideo className="text-cyan-500 text-xl" />,
      title: "Attract new buyers with an intro video",
      desc: "Connect with buyers by sharing who you are, what you do, and why they should work with you.",
      cta: "Add Video",
    },
  ];

  return (
    <SellerLayout>
      <div className="flex bg-gray-50 min-h-screen p-6">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-gray-100">
            <div className="relative mb-4">
              {loadingImage ? (
        <div className="animate-pulse bg-gray-300 rounded-full w-16 h-16 border-2 border-emerald-500"></div>
      ) : (
        <img
          src={profileImage ? `http://localhost:5000/uploads/${profileImage}` : "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"}
          alt="Profile"
          className="rounded-full w-16 h-16 border-2 border-emerald-500 object-cover"
          onError={(e) => {
            e.target.src = "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg";
          }}
        />
      )}
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
            </div>

            {/* Dynamic user */}
            <h2 className="text-lg font-bold text-gray-800">
              {user?.username || "Loading..."}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              @{user?.username || "user"}
            </p>

            <Link
              to="/seller/Profile"
              className="mt-4 text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-all"
            >
              View profile
            </Link>
          </div>

          {/* Level Overview */}
          <div className="text-left">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded mr-2">
                TOP RATED
              </span>
              Level Overview
            </h3>

            <ul className="text-sm text-gray-600 space-y-3">
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  My level
                </span>
                <span className="font-bold text-emerald-600">Top Rated</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Success score
                </span>
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800">9</span>
                </div>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Rating
                </span>
                <span className="flex items-center gap-1 font-bold text-gray-800">
                  <FaStar className="text-amber-400" /> 4.9
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Response rate
                </span>
                <span className="font-bold text-gray-800">100%</span>
              </li>
            </ul>

            <Link
              to="/seller/Performance"
              className="mt-6 block w-full px-4 py-2.5 text-sm font-medium text-center text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all border border-emerald-200"
            >
              View progress
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.username || "User"}!
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Here's what's happening with your business today
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#708238] hover:bg-[#FFA500] transition-colors duration-300 p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
              <p className="text-white text-sm">Pending Orders</p>
              <p className="text-2xl font-bold text-white mt-1">0</p>
            </div>
            <div className="bg-[#708238] hover:bg-[#FFA500] transition-colors duration-300 p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
              <p className="text-white text-sm">Messages</p>
              <p className="text-2xl font-bold text-white mt-1">0</p>
            </div>
            <div className="bg-[#708238] hover:bg-[#FFA500] transition-colors duration-300 p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer">
              <p className="text-white text-sm">Earnings</p>
              <p className="text-2xl font-bold text-white mt-1">$0</p>
            </div>
          </div>

          {/* Info Cards */}
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Recommendations for you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {infoCards.map((card, index) => (
              <div
                key={index}
                className="bg-white group p-5 rounded-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 shadow-sm hover:shadow-md relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
                <div className="flex">
                  <div className="flex items-start justify-center p-3 bg-gray-50 rounded-lg mr-4">
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">{card.desc}</p>
                    <button className="text-emerald-600 text-sm font-medium flex items-center group-hover:text-emerald-700 transition-colors">
                      {card.cta}
                      <FaArrowRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboard;
