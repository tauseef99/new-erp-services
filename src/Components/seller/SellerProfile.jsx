import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaTruck, FaPen, FaStar } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import ProfileWizardModal from "./ProfileWizardModal";
import EditSectionModal from "./EditSectionModal";
import axios from "axios";

// ProfileImageUpload Component (from your working code)
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
      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 border-4 border-orange-400 overflow-hidden shadow-md">
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
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <span className="text-gray-600 text-sm">No Image</span>
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
      setUser(JSON.parse(storedUser));
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
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
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
        
        if (profileResponse.data.profileImage) {
          setProfileImage(profileResponse.data.profileImage);
        }
      } catch (error) {
        console.log('Profile image not available yet');
      }
    } catch (error) {
      console.error('Error fetching seller data:', error);
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
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </SellerLayout>
    );
  }

  if (!user) {
    return (
      <SellerLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-gray-600 text-lg">Loading profile...</p>
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
              className="bg-[#708238] hover:bg-[#FFA500] text-white px-5 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Complete Your Profile
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#708238]/10 to-[#FFA500]/10 p-6  rounded-xl shadow-md">
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

  {/* Professional Summary - Orange Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#FFA500] transition-all hover:border-[#708238]">
    <SectionHeader 
      title="Professional Summary" 
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4 4 0 11-8 0 4 4 0 08 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      }
      onEdit={() => openEditModal('professionalSummary')}
    />
    <p className="text-gray-600 leading-relaxed">
      {sellerData?.professionalSummary || "No professional summary provided."}
    </p>
  </div>

  {/* Functional Experience - Green Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#708238] transition-all hover:border-[#FFA500]">
    <SectionHeader 
      title="Functional Role" 
      icon={
        <svg
          className="w-5 h-5 text-[#708238]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      }
      onEdit={() => openEditModal('functionalRoles')}
    />
    <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-300">
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
  </div>

  {/* Technical Experience - Orange Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#FFA500] transition-all hover:border-[#708238]">
    <SectionHeader 
      title="Technical Role" 
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      }
      onEdit={() => openEditModal('technicalRoles')}
    />
    <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-300">
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
  </div>

  {/* Project Delivered - Green Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#708238] transition-all hover:border-[#FFA500]">
    <SectionHeader 
      title="Project Delivered" 
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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
  </div>

  {/* Technical Skills - Orange Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#FFA500] transition-all hover:border-[#708238]">
    <SectionHeader 
      title="Technical Skills" 
      icon={
        <svg
          className="w-5 h-5 text-[#708238]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M13 2L3 14h7v8l11-13h-8z" />
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
  </div>

  {/* Certifications - Green Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#708238] transition-all hover:border-[#FFA500]">
    <SectionHeader 
      title="Certifications" 
      icon={
        <svg 
  className="w-5 h-5 text-green-600" 
  fill="none" 
  stroke="currentColor" 
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    strokeWidth="2" 
    d="M5 13l4 4L19 7" 
  />
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
                          <td className="border border-gray-200 px-4 py-2">{cert.number || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.issuedBy || "N/A"}</td>
                          <td className="border border-gray-200 px-4 py-2">{cert.validity || "N/A"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-200">
                          No certifications added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
  </div>

  {/* Services Offered - Orange Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#FFA500] transition-all hover:border-[#708238]">
    <SectionHeader 
      title="Services Offered" 
      icon={
        <svg
  className="w-5 h-5 text-gray-600"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M21 13.255A8.962 8.962 0 0112 21a8.962 8.962 0 01-4.255-1.11L3 21l1.11-4.255A8.962 8.962 0 013 12a9 9 0 1118 1.255z"
  />
</svg>

      }
      onEdit={() => openEditModal('servicesOffered')}
    />
     <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {sellerData?.servicesOffered && sellerData.servicesOffered.length > 0 ? (
                  sellerData.servicesOffered.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20 text-center"
                    >
                      {service}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">No services added yet.</p>
                )}
              </div>
  </div>

  {/* Language Proficiencies - Green Outline */}
  <div className="bg-white rounded-2xl shadow-md p-6 border-l-8 border-[#708238] transition-all hover:border-[#FFA500]">
    <SectionHeader 
      title="Language Proficiencies" 
      icon={
        <svg
  className="w-5 h-5 text-gray-600"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M3 5h12l4 4v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
  />
</svg>

      }
      onEdit={() => openEditModal('languages')}
    />
    <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left">Language</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Basic</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Intermediate</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Fluent</th>
                      <th className="border border-gray-200 px-4 py-2 text-center">Native</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerData?.languages && sellerData.languages.length > 0 ? (
                      sellerData.languages.map((lang, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2 font-medium">{lang.language}</td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Basic"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Intermediate"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Fluent"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                          <td className="border border-gray-200 px-4 py-2 text-center">
                            <input 
                              type="radio" 
                              checked={lang.proficiency === "Native"} 
                              readOnly
                              className="h-4 w-4 text-[#708238] focus:ring-[#708238]" 
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="border border-gray-200 px-4 py-4 text-center text-gray-500">
                          No languages added yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
  </div>
</div>

          </div>
        </div>

        {/* Profile Completion Wizard Modal */}
        <ProfileWizardModal 
          showWizard={showWizard} 
          closeWizard={closeWizard}
          user={user}
        />

        {/* Edit Section Modal */}
        <EditSectionModal
          isOpen={editModal.isOpen}
          section={editModal.section}
          data={editModal.data}
          onClose={closeEditModal}
          onSave={handleSaveSection}
        />
      </div>
    </SellerLayout>
  );
}

// Helper components
function ProfileInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-gray-400">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function SectionHeader({ title, icon, onEdit }) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <div className="flex items-center gap-3">
  <div className="text-[#708238] bg-[#708238]/10 p-2 rounded-lg border-2 border-[#708238] flex items-center justify-center">
    {icon}
  </div>
  <h2 className="text-lg font-semibold text-gray-800 border-b-2 border-orange-500 inline-block pb-1">
    {title}
  </h2>
</div>

      <button 
        onClick={onEdit}
        className="text-gray-500 hover:text-[#708238] flex items-center gap-2 text-sm"
      >
        <FaPen className="text-xs" />
        Edit
      </button>
    </div>
  );
}