import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/images/logo-2.jpeg";
import SignInForm from "../Components/SignIn";
import { FaChevronRight, FaChevronLeft, FaBars, FaTimes } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import Modal from "./Modal";

const subNavItems = [
  "Trending 🔥",
  "S4/HANA Upgrade",
  "SAP ABAP",
  "S4/HANA Public Cloud",
  "ERP Migration",
  "NetSuite Customization",
  "SAP BASIS",
  "Crystal Reports",
  "MS365",
  "MS Dynamics",
  "ERP Upgrade",
  "BI/ BO",
  "Customize Reports",
  "Cloud Migration",
  "Oracle EBS",
  "Infor",
  "Acumatica",
  "ERP Training",
  "SAP Ariba",
  "JD Edward",
  "Project Management",
  "SAP Signavio",
  "SuccessFactors",
  "HCM",
  "Epicor",
  "Oddo",
];

const aboutDropdownItems = [
  "How JustERPs works",
  "How to hire ERP Consultant",
  "Join as Freelancer ERP Consultant",
  "Personal Data Protection",
  "Refer to a Consultant Bonus",
  "Customer Support",
  "Social Responsibility",
  "Privacy Policy & Term of Use",
  "Protecting Data in ERP Implementation",
  "Categories",
];


function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showAboutDropdownDesktop, setShowAboutDropdownDesktop] = useState(false);
  const [showAboutDropdownMobile, setShowAboutDropdownMobile] = useState(false);

  const subNavRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    // Close desktop dropdown on outside click
    const handleClickOutside = (event) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target)
      ) {
        setShowAboutDropdownDesktop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubNavClick = (item) => {
    console.log(`Clicked: ${item}`);
  };

  const handleChevronClick = () => {
    if (subNavRef.current) {
      subNavRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleChevronLeftClick = () => {
    if (subNavRef.current) {
      subNavRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setShowAboutDropdownMobile(false); // close About when reopening menu
  };

  return (
    <>
      <div className="pt-4 bg-white fixed w-full z-50 shadow-sm">
        <nav className="max-w-7xl px-4 sm:px-6 pb-4 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          {/* Logo + Hamburger */}
          <div className="w-full lg:w-max flex items-center justify-between lg:justify-start">
            <Link to="/" className="flex items-center">
              <img src={logo} className="w-36 md:w-48 rounded-lg" alt="Logo" />
            </Link>
            <button
              className="text-2xl lg:hidden text-gray-700"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex gap-2 xl:gap-6 font-semibold items-center text-[#62646A] text-sm xl:text-[15px] relative">
            {/* About Dropdown (Desktop) */}
            <div
              className="flex items-center gap-2 relative cursor-pointer"
              onMouseEnter={() => setShowAboutDropdownDesktop(true)}
              onMouseLeave={() => setShowAboutDropdownDesktop(false)}
              ref={aboutDropdownRef}
            >
              <p>About</p>
              <FaChevronDown className="text-sm" />
              {showAboutDropdownDesktop && (
                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md w-56 z-50">
                  {aboutDropdownItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#62646A] hover:bg-[#FFA500] hover:text-white cursor-pointer"
                      onClick={() => handleSubNavClick(item)}
                    >
                      <FaChevronRight className="text-xs" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link to="/ourstory" className="text-[#62646A] cursor-pointer">
                Our Story
              </Link>
            </div>

            <div className="flex items-center gap-2 cursor-pointer">
              <TfiWorld className="text-md" />
              <p>EN</p>
            </div>

            <Link to="/erpconsultant">
              <p className="cursor-pointer hidden xl:block">
                Register as ERP Consultant
              </p>
              <p className="cursor-pointer xl:hidden">Become a Consultant</p>
            </Link>

            <p
              onClick={() => setShowSignInModal(true)}
              className="cursor-pointer"
            >
              Sign in
            </p>

            <button
              className="text-black border border-black rounded-md px-3 md:px-5 py-1 md:py-2 hover:bg-[#FFA500] hover:text-white transition-colors duration-300"
              onClick={() => setShowSignInModal(true)}
            >
              Join
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="flex flex-col gap-4 w-full mt-4 lg:hidden font-semibold text-[#62646A] text-sm">
              {/* Mobile About Dropdown */}
              <div
                className="flex items-center justify-between p-2 border-b"
                onClick={() =>
                  setShowAboutDropdownMobile(!showAboutDropdownMobile)
                }
              >
                <span>About</span>
                <FaChevronDown
                  className={`transition-transform ${
                    showAboutDropdownMobile ? "rotate-180" : ""
                  }`}
                />
              </div>

              {showAboutDropdownMobile && (
                <div className="pl-6 border-b pb-2">
                  {aboutDropdownItems.map((item, index) => (
                    <div
                      key={index}
                      className="py-2 text-sm text-[#62646A] cursor-pointer"
                      onClick={() => {
                        handleSubNavClick(item);
                        setShowAboutDropdownMobile(false); // close dropdown after click
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}

              <Link
                to="/ourstory"
                className="p-2 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </Link>

              <div className="flex items-center gap-2 p-2 border-b">
                <TfiWorld className="text-md" />
                <p>EN</p>
              </div>

              <Link
                to="/erpconsultant"
                className="p-2 border-b"
                onClick={() => setIsMenuOpen(false)}
              >
                Register as ERP Consultant
              </Link>

              <p
                className="p-2 border-b cursor-pointer"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Sign in
              </p>

              <button
                className="text-black border border-black rounded-md px-4 py-2 w-fit mt-2"
                onClick={() => {
                  setShowSignInModal(true);
                  setIsMenuOpen(false);
                }}
              >
                Join
              </button>
            </div>
          )}
        </nav>

        {/* Sticky Sub Nav */}
        {isSticky && (
          <div className="sub-nav border-t border-b mt-2 py-2 bg-white">
            <div className="flex items-center max-w-7xl mx-auto px-4">
              {/* Left Arrow */}
              <button
                onClick={handleChevronLeftClick}
                className="mr-2 text-gray-600 hover:text-[#FFA500] transition-colors flex-shrink-0 hidden sm:block"
                aria-label="Scroll left"
              >
                <FaChevronLeft className="text-sm" />
              </button>

              <div
                className="flex overflow-x-auto lg:gap-4 gap-2 scrollbar-hide text-[#62646A] whitespace-nowrap w-full"
                ref={subNavRef}
              >
                {subNavItems.map((item, index) => (
                  <p
                    key={index}
                    className="cursor-pointer flex-shrink-0 px-3 py-1 bg-[#708238]/20 text-[#708238] rounded-lg hover:bg-[#a3b56b] hover:text-white transition-colors text-xs sm:text-sm"
                    onClick={() => handleSubNavClick(item)}
                  >
                    {item}
                  </p>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleChevronClick}
                className="ml-2 text-gray-600 hover:text-[#FFA500] transition-colors flex-shrink-0 hidden sm:block"
                aria-label="Scroll right"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <Modal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
          <SignInForm />
        </Modal>
      )}
    </>
  );
}

export default Navbar;
