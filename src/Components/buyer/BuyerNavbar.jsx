import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FiBell, FiMail, FiSearch, FiHelpCircle } from "react-icons/fi";
import { FaHome, FaBoxOpen, FaEnvelope, FaUser, FaStar, FaStore } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from '../../Assets/images/logo-2.jpeg';
import BuyerProfile from './BuyerProfile';

export default function BuyerNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = (type) => {
    if (type === 'notifications') {
      setShowNotifications(!showNotifications);
      setShowProfileMenu(false);
    } else if (type === 'profile') {
      setShowProfileMenu(!showProfileMenu);
      setShowNotifications(false);
    } else {
      setShowNotifications(false);
      setShowProfileMenu(false);
    }
  };

  return (
    <nav 
      className="border-b border-[#5a6a2d] px-4 py-3 shadow-sm flex justify-between items-center sticky top-0 z-50"
      style={{ backgroundColor: '#708238' }}
    >
      {/* Left - Logo and Search */}
      <div className="flex items-center gap-6 w-full max-w-6xl mx-auto">
        {/* Minimal Logo */}
        <Link to="/buyer/dashboard" className="min-w-[160px]">
  <img src={logo} alt="Logo" className="h-16 w-auto rounded object-contain" />
</Link>

        {/* Search Bar */}
        {/* <div className="hidden md:flex items-center bg-white rounded-md px-4 py-2 flex-1 max-w-xl">
          <FiSearch className="text-gray-500 mr-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What service are you looking for today?" 
            className="bg-transparent border-none outline-none w-full text-sm placeholder-gray-500"
          />
        </div> */}

        {/* Right Side Navigation */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Navigation Links - Hidden on mobile */}
          <ul className="hidden lg:flex gap-6 text-white text-sm font-medium">
            <Link to="/buyer/dashboard">
              <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
                Home
              </li>
            </Link>
            <Link to="/buyer/orders">
              <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
                Orders
              </li>
            </Link>
            <Link to="/buyer/messages">
              <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
                Messages
              </li>
            </Link>
          </ul>

          {/* Become a Seller - Hidden on mobile */}
          <Link to="/seller/dashboard" className="hidden md:flex items-center gap-1 text-sm font-medium text-white hover:text-[#FFA500] transition-colors">
            <FaStore className="text-sm" /> Switch to Selling
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('notifications')} 
              className="relative focus:outline-none p-2 hover:bg-[#5a6a2d] rounded-full"
            >
              <FiBell className="w-5 h-5 text-white hover:text-[#FFA500]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFA500] rounded-full"></span>
            </button>
          </div>

          {/* Mail Icon */}
          <Link to="/buyer/messages">
            <button className="relative group p-2 hover:bg-[#5a6a2d] rounded-full">
              <FiMail className="w-5 h-5 text-white group-hover:text-[#FFA500]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FFA500] rounded-full"></span>
            </button>
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => toggleDropdown('profile')}
              className="flex items-center gap-1 focus:outline-none"
            >
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                alt="User"
                className="w-8 h-8 rounded-full object-cover border border-white"
              />
              <IoIosArrowDown className={`text-white text-xs transition-transform ${showProfileMenu ? 'transform rotate-180' : ''}`} />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer flex items-center gap-2 hover:text-[#FFA500]">
                    <Link to="/buyer/profile">
                    <FaUser className="text-gray-500" /> Profile
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer flex items-center gap-2 hover:text-[#FFA500]">
                    <FaBoxOpen className="text-gray-500" /> Orders
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer flex items-center gap-2 hover:text-[#FFA500]">
                    <FaStar className="text-gray-500" /> Favorites
                  </li>
                  <div className="border-t my-1"></div>
                  <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer hover:text-[#FFA500]">
                    Settings
                  </li>
                  <li
  className="px-4 py-2 hover:bg-gray-50 text-sm text-red-600 cursor-pointer"
  onClick={() => {
    // Clear token & user data
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // if you save user data too

    // Redirect to login
    window.location.href = "/signin"; // or "/login" depending on your route
  }}
>
  Logout
</li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search - Hidden on desktop */}
      <div className="md:hidden ml-2">
        <button className="p-2 hover:bg-[#5a6a2d] rounded-full">
          <FiSearch className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-16 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="p-3 border-b font-semibold text-gray-700 flex justify-between items-center">
            <span>Notifications</span>
            <button className="text-xs text-[#FFA500] hover:underline">Mark all as read</button>
          </div>
          <ul className="max-h-60 overflow-y-auto">
            <li className="px-3 py-3 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer border-b">
              <div className="flex items-start gap-2">
                <div className="bg-[#708238]/10 p-2 rounded-full">
                  <FiBell className="text-[#708238]" />
                </div>
                <div>
                  <p className="font-medium">New offer received!</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </li>
            <li className="px-3 py-3 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer border-b">
              <div className="flex items-start gap-2">
                <div className="bg-[#FFA500]/10 p-2 rounded-full">
                  <FiMail className="text-[#FFA500]" />
                </div>
                <div>
                  <p className="font-medium">You have a new message</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
            </li>
            <li className="px-3 py-3 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
              <div className="flex items-start gap-2">
                <div className="bg-purple-100 p-2 rounded-full">
                  <FaBoxOpen className="text-purple-500 text-sm" />
                </div>
                <div>
                  <p className="font-medium">Order delivered successfully</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </li>
          </ul>
          <div className="px-4 py-2 text-center text-sm text-[#FFA500] hover:underline cursor-pointer border-t">
            View All Notifications
          </div>
        </div>
      )}
    </nav>
  );
}