import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaPen, FaStar } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import ProfileWizardModal from "./ProfileWizardModal";
import EditSectionModal from "./EditSectionModal";

import axios from "axios";

// ProfileImageUpload Component
const ProfileImageUpload = ({ currentImage, onImageUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Client-side validation
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Maximum size is 5MB");
      return;
    }

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert("Please select an image file");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setUploading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert("Please login again");
        return;
      }
      
      // Clean token if it's stored as a stringified JSON
      const cleanToken = token.replace(/^"(.*)"$/, '$1');

      // Updated endpoint URL to match common API patterns
      const response = await axios.post(
        "http://localhost:5000/api/seller/profile/upload-image",
       
        
        formData,
        {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.profileImage) {
        onImageUpdate(response.data.profileImage);
        alert("Profile image updated successfully!");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("Upload error:", error);
      
      // More detailed error messages
      if (error.response) {
        // Server responded with an error status
        console.error("Server response:", error.response.data);
        alert(error.response.data.message || "Failed to upload image. Server error.");
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        alert("Failed to upload image. Please check your connection.");
      } else {
        // Something else happened
        alert("Failed to upload image. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
        {currentImage ? (
          <img
            src={`http://localhost:5000/uploads/${currentImage}`}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">No Image</span>
          </div>
        )}
      </div>
      
      <label className="absolute bottom-0 right-0 bg-[#708238] text-white p-2 rounded-full cursor-pointer hover:bg-[#5a6a2d] transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          disabled={uploading}
        />
        {uploading ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </label>
    </div>
  );
};

// ProfileInfo Component
const ProfileInfo = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    {icon}
    <span className="text-gray-600 font-medium">{label}:</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

// SectionHeader Component
const SectionHeader = ({ title, icon, onEdit }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      {icon}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    </div>
    <button
      onClick={onEdit}
      className="flex items-center gap-1 text-[#708238] hover:text-[#5a6a2d] transition-colors"
    >
      <FaPen className="w-4 h-4" />
      <span className="text-sm font-medium">Edit</span>
    </button>
  </div>
);

export default function SellerProfile() {
  const [user, setUser] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWizard, setShowWizard] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, section: null, data: null });
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user data:", e);
        // fallback dummy data
        setUser({
          username: "naseem hussain",
          email: "naseem@example.com",
          firstName: "naseem",
          lastName: "hussain"
        });
      }
    } else {
      // fallback dummy data
      setUser({
        username: "naseem hussain",
        email: "naseem@example.com",
        firstName: "naseem",
        lastName: "hussain"
      });
    }
    
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }
      
      // Clean token if it's stored as a stringified JSON
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      // Fetch profile wizard data
      const response = await axios.get('http://localhost:5000/api/profile-wizard', {
        headers: { 
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSellerData(response.data);
      
      // Also fetch full seller profile to get the profile image
      try {
        const profileResponse = await axios.get('http://localhost:5000/api/seller/profile', {
          headers: { 
            Authorization: `Bearer ${cleanToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Full profile response:", profileResponse.data);
        
        if (profileResponse.data && profileResponse.data.profileImage) {
          setProfileImage(profileResponse.data.profileImage);
          console.log("Profile image set:", profileResponse.data.profileImage);
        } else {
          console.log("No profile image in response");
        }
      } catch (error) {
        console.log('Profile image fetch error:', error.response?.data || error.message);
        // This is not critical, so we can continue
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
      // Set empty seller data to prevent crashes
      setSellerData({
        professionalSummary: "",
        functionalRoles: [],
        technicalRoles: [],
        projects: [],
        technicalSkills: [],
        certifications: [],
        servicesOffered: [],
        languages: []
      });
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (section) => {
    let data;
    
    switch(section) {
      case 'professionalSummary':
        data = sellerData?.professionalSummary || "";
        break;
      case 'functionalRoles':
        data = sellerData?.functionalRoles || [];
        break;
      case 'technicalRoles':
        data = sellerData?.technicalRoles || [];
        break;
      case 'projects':
        data = sellerData?.projects || [];
        break;
      case 'technicalSkills':
        data = sellerData?.technicalSkills || [];
        break;
      case 'certifications':
        data = sellerData?.certifications || [];
        break;
      case 'servicesOffered':
        data = sellerData?.servicesOffered || [];
        break;
      case 'languages':
        data = sellerData?.languages || [];
        break;
      default:
        data = null;
    }
    
    setEditModal({ isOpen: true, section, data });
  };

  const closeEditModal = () => {
    setEditModal({ isOpen: false, section: null, data: null });
  };

  const handleSaveSection = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login again");
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      let step;
      let dataToSend = {};
      
      switch(editModal.section) {
        case 'professionalSummary':
          step = 0;
          dataToSend = { professionalSummary: updatedData };
          break;
        case 'functionalRoles':
          step = 1;
          dataToSend = { functionalRoles: updatedData };
          break;
        case 'technicalRoles':
          step = 2;
          dataToSend = { technicalRoles: updatedData };
          break;
        case 'projects':
          step = 3;
          dataToSend = { projects: updatedData };
          break;
        case 'technicalSkills':
          step = 4;
          dataToSend = { technicalSkills: updatedData };
          break;
        case 'certifications':
          step = 5;
          dataToSend = { certifications: updatedData };
          break;
        case 'servicesOffered':
          step = 6;
          dataToSend = { servicesOffered: updatedData };
          break;
        case 'languages':
          step = 7;
          dataToSend = { languages: updatedData };
          break;
        default:
          step = null;
      }
      
      if (step !== null) {
        await axios.put('http://localhost:5000/api/profile-wizard/step', {
          step,
          data: dataToSend,
          isCompleted: true
        }, {
          headers: {
            Authorization: `Bearer ${cleanToken}`,
            'Content-Type': 'application/json'
          }
        });
        
        // Refresh data
        fetchSellerData();
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert("Error saving changes. Please try again.");
      throw error;
    }
  };

  // Function to close the wizard
  const closeWizard = () => {
    setShowWizard(false);
    // Refresh data after wizard closes
    fetchSellerData();
  };

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#708238]"></div>
        </div>
      </SellerLayout>
    );
  }

  if (!user) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg">Please login to view your profile</p>
        </div>
      </SellerLayout>
    );
  }

  // Calculate experience years from functional roles
  const calculateExperienceYears = () => {
    if (!sellerData || !sellerData.functionalRoles) return 0;
    return sellerData.functionalRoles.length;
  };

  // Extract industries from roles and projects
  const extractIndustries = () => {
    const industries = new Set();
    
    if (sellerData?.functionalRoles) {
      sellerData.functionalRoles.forEach(role => {
        if (role.industry) industries.add(role.industry);
      });
    }
    
    if (sellerData?.technicalRoles) {
      sellerData.technicalRoles.forEach(role => {
        if (role.industry) industries.add(role.industry);
      });
    }
    
    if (sellerData?.projects) {
      sellerData.projects.forEach(project => {
        if (project.industry) industries.add(project.industry);
      });
    }
    
    return Array.from(industries);
  };

  // Generate tagline based on seller data
  const generateTagline = () => {
    if (!sellerData) return "ERP Consultant";
    
    const certification = sellerData.certifications && sellerData.certifications.length > 0 
      ? sellerData.certifications[0].name 
      : "Certified";
    
    const experienceYears = calculateExperienceYears();
    const projectCount = sellerData.projects ? sellerData.projects.length : 0;
    const industries = extractIndustries();
    
    const industryList = industries.length > 0 
      ? `in ${industries.length} industries (${industries.slice(0, 3).join(", ")}${industries.length > 3 ? ", and more" : ""})`
      : "";
    
    return `${certification} Consultant, with ${experienceYears}-years' experience, ${projectCount} projects delivered ${industryList}`;
  };

  return (
    <SellerLayout>
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8 font-sans">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">ERP Consultant Profile</h1>
            <button 
              onClick={() => setShowWizard(true)}
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Complete Your Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#708238]/10 to-[#FFA500]/10 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <ProfileImageUpload 
                  currentImage={profileImage} 
                  onImageUpdate={setProfileImage} 
                />
                
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {user.username}
                  </h1>
                  <p className="text-lg text-gray-600 mt-1">
                    {generateTagline()}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileInfo 
                      icon={<FaMapMarkerAlt className="text-gray-500" />} 
                      label="Based in" 
                      value="Karachi, Pakistan" 
                    />
                    <ProfileInfo 
                      icon={<FaCalendarAlt className="text-gray-500" />} 
                      label="Member since" 
                      value="Apr 2023" 
                    />
                    <ProfileInfo 
                      icon={<FaClock className="text-gray-500" />} 
                      label="Avg. response time" 
                      value="< 1 hour" 
                    />
                    <ProfileInfo 
                      icon={<FaTruck className="text-gray-500" />} 
                      label="Last delivery" 
                      value="2 days ago" 
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile Sections */}
            <div className="p-6 space-y-8">
              {/* Professional Summary */}
              <SectionHeader 
                title="Professional Summary" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                onEdit={() => openEditModal('professionalSummary')}
              />
              <p className="text-gray-600 leading-relaxed">
                {sellerData?.professionalSummary || "No professional summary provided."}
              </p>
              
              {/* Functional Experience */}
              <SectionHeader 
                title="Functional Role" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                onEdit={() => openEditModal('functionalRoles')}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.functionalRoles && sellerData.functionalRoles.length > 0 ? (
                      sellerData.functionalRoles.map((role, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{role.year || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.responsibility || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.industry || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No functional roles added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Technical Experience */}
              <SectionHeader 
                title="Technical Role" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                }
                onEdit={() => openEditModal('technicalRoles')}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.technicalRoles && sellerData.technicalRoles.length > 0 ? (
                      sellerData.technicalRoles.map((role, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{role.year || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.responsibility || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{role.industry || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No technical roles added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Project Delivered  */}
              <SectionHeader 
                title="Project Delivered" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                onEdit={() => openEditModal('projects')}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Project Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Role Played</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Activities</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.projects && sellerData.projects.length > 0 ? (
                      sellerData.projects.map((project, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{project.name || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.industry || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.role || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.teamSize || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{project.activities || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No projects added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Technical Skills */}
              <SectionHeader 
                title="Technical Skills" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                onEdit={() => openEditModal('technicalSkills')}
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sellerData?.technicalSkills && sellerData.technicalSkills.length > 0 ? (
                  sellerData.technicalSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">No technical skills added yet.</p>
                )}
              </div>
              
              {/* Certifications */}
              <SectionHeader 
                title="Certifications" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                onEdit={() => openEditModal('certifications')}
              />
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Certification Name</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Exam</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Certification No.</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Issued By</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Validity/Expire Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.certifications && sellerData.certifications.length > 0 ? (
                      sellerData.certifications.map((cert, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-4 py-2">{cert.name || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.exam || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.certificationNumber || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.issuedBy || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.validityDate || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No certifications added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Services Offered */}
              <SectionHeader 
                title="Services Offered" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                }
                onEdit={() => openEditModal('servicesOffered')}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sellerData?.servicesOffered && sellerData.servicesOffered.length > 0 ? (
                  sellerData.servicesOffered.map((service, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-medium text-gray-800">{service.name || "Service"}</h3>
                      <p className="text-gray-600 mt-1 text-sm">{service.description || "No description provided."}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No services added yet.</p>
                )}
              </div>
              
              {/* Languages */}
              <SectionHeader 
                title="Languages" 
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                }
                onEdit={() => openEditModal('languages')}
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sellerData?.languages && sellerData.languages.length > 0 ? (
                  sellerData.languages.map((language, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200 text-center">
                      <span className="font-medium text-gray-800">{language.name || "Language"}</span>
                      <span className="text-gray-600 text-sm block mt-1">{language.proficiency || "N/A"}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No languages added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Wizard Modal */}
        {showWizard && (
          <ProfileWizardModal 
            isOpen={showWizard} 
            onClose={closeWizard} 
            onSave={fetchSellerData}
          />
        )}

        {/* Edit Section Modal */}
        {editModal.isOpen && (
          <EditSectionModal 
            isOpen={editModal.isOpen}
            onClose={closeEditModal}
            section={editModal.section}
            data={editModal.data}
            onSave={handleSaveSection}
          />
        )}
      </div>
    </SellerLayout>
  );
}