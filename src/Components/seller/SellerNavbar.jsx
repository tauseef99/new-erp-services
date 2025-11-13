import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiHelpCircle, FiMail, FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/logo-2.jpeg";
import axios from "axios";

export default function SellerNavbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
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

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowNotifications(!showNotifications);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here (clear token/session)
    console.log("User logged out");
    navigate("/register");
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-gradient-to-r from-[#FFA500] to-[#708238]  px-4 py-3 shadow-sm flex justify-between items-center"
      style={{ backgroundColor: "#708238" }}
    >
      {/* Left - Logo and Mobile Menu Button */}
      <div className="flex items-center">
        <button
          className="md:hidden text-white mr-3"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <Link to="/seller/dashboard" className="min-w-[192px]">
          <img
            src={logo}
            alt="Logo"
            className="w-48 rounded-lg object-cover"
          />
        </Link>
      </div>

      {/* Center - Navigation (Desktop) */}
      <ul className="hidden md:flex gap-6 text-white">
        <Link to="/seller/dashboard">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
            Dashboard
          </li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
            My Business
          </li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
            Orders
          </li>
        </Link>
        <Link to="#">
          <li className="hover:text-[#FFA500] cursor-pointer transition-colors">
            Settings
          </li>
        </Link>
      </ul>

      {/* Right - Icons */}
      <div className="flex items-center gap-3 md:gap-5 relative">
        {/* Balance */}
        <span className="text-sm font-semibold px-3 py-1 rounded-md border border-[#FFA500] bg-[#FFA500] text-white hidden md:block">
          $0000
        </span>

        {/* Notification Bell with Dropdown */}
        <div className="relative flex items-center gap-3">
  {/* Notification Icon */}
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="relative focus:outline-none p-[10px] rounded-full bg-gradient-to-br from-[#FFA500] to-[#708238] hover:from-[#708238] hover:to-[#FFA500] transition-all duration-300 shadow-md"
    >
      <FiBell className="w-5 h-5 text-white" />
      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full border border-[#FFA500]" />
    </button>

    {showNotifications && (
      <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-50">
        <div className="p-4 border-b font-semibold text-gray-700">
          Notifications
        </div>
        <ul className="max-h-60 overflow-y-auto">
          <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
            🎉 New order received!
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
            💬 You've got a new message.
          </li>
          <li className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 cursor-pointer">
            📈 Your gig performance has improved.
          </li>
        </ul>
        <div className="px-4 py-2 text-center text-sm text-[#FFA500] hover:underline cursor-pointer">
          View All Notifications
        </div>
      </div>
    )}
  </div>

  {/* Message Icon */}
  <Link to="/seller/messages">
    <button className="relative group p-[10px] rounded-full bg-gradient-to-br from-[#FFA500] to-[#708238] hover:from-[#708238] hover:to-[#FFA500] transition-all duration-300 shadow-md">
      <FiMail className="w-5 h-5 text-white" />
      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-white rounded-full border border-[#FFA500]" />
    </button>
  </Link>
</div>


       
        {/* Profile Image + Dropdown */}
       <div className="relative flex items-center gap-3" ref={dropdownRef}>
  {/* Name + Title on the left */}
  <div
    className="hidden md:flex flex-col items-end leading-tight cursor-pointer"
    onClick={toggleProfileDropdown}
  >
    <span className="text-sm font-semibold text-gray-900">Tauseef</span>
    <span className="text-xs text-[#FFA500] font-medium">
      Techno-Functional ERP Consultant
    </span>
  </div>

  {/* Profile Image on the right */}
  <img
    src={
      profileImage
        ? `http://localhost:5000/uploads/${profileImage}`
        : "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
    }
    alt="Profile"
    onClick={toggleProfileDropdown}
    className="w-10 h-10 rounded-full object-cover border-2 border-white cursor-pointer"
    onError={(e) => {
      e.target.src =
        "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg";
    }}
  />

  {/* Dropdown Menu */}
  {showProfileDropdown && (
    <div className="absolute right-0 mt-14 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-50">
      <div className="px-4 py-2 border-b text-gray-700 text-sm">
        <p className="font-semibold">Tauseef</p>
        <p className="text-xs text-gray-500">tauseef.hussain@example.com</p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>


      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-[#708238] z-40 pt-16 px-4">
          <div className="flex flex-col gap-6 py-6">
            <Link
              to="/seller/dashboard"
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="#"
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              My Business
            </Link>
            <Link
              to="#"
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Orders
            </Link>
            <Link
              to="#"
              className="text-white hover:text-[#FFA500] text-lg py-2 border-b border-[#5a6a2d]"
              onClick={toggleMobileMenu}
            >
              Settings
            </Link>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-semibold px-3 py-1 rounded-md border border-[#FFA500] bg-[#FFA500] text-white">
                $114.40
              </span>

              <div className="flex gap-4 items-center">
                <FiHelpCircle className="w-5 h-5 text-white hover:text-[#FFA500] cursor-pointer" />
                <div className="relative" ref={dropdownRef}>
                  <img
                    src="https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"
                    alt="User"
                    onClick={toggleProfileDropdown}
                    className="w-8 h-8 rounded-full object-cover border border-white cursor-pointer"
                  />

                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="px-4 py-2 border-b text-gray-700 text-sm">
                        <p className="font-semibold">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
