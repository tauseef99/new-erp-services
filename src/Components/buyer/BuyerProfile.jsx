import React, { useState, useEffect } from "react";
import { FaUserCircle, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function BuyerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    company: "",
    position: "",
    location: ""
  });

  // Get auth token and user data from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  // Get user data from localStorage or auth context
  const getUserData = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };

  // API configuration
  const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`
    }
  });

  // Fetch buyer profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const userData = getUserData();
      
      // Set initial name from user data if available (from login)
      if (userData && userData.name) {
        setFormData(prev => ({
          ...prev,
          name: userData.name
        }));
      }

      const response = await api.get("/buyer/profile");
      if (response.data.profile) {
        setProfile(response.data.profile);
        setFormData({
          name: response.data.profile.name || userData?.name || "",
          bio: response.data.profile.bio || "",
          company: response.data.profile.company || "",
          position: response.data.profile.position || "",
          location: response.data.profile.location || ""
        });
        
        if (response.data.profile.profileImage) {
          setPreview(`http://localhost:5000${response.data.profile.profileImage}`);
        }
      } else {
        // If no profile exists but user data is available, use that
        if (userData) {
          setFormData(prev => ({
            ...prev,
            name: userData.name || ""
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      
      // Fallback: Use user data from localStorage if API fails
      const userData = getUserData();
      if (userData && userData.name) {
        setFormData(prev => ({
          ...prev,
          name: userData.name
        }));
        toast.info("Using cached user data");
      } else {
        toast.error("Failed to load profile");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set initial name from user data immediately on component mount
    const userData = getUserData();
    if (userData && userData.name) {
      setFormData(prev => ({
        ...prev,
        name: userData.name
      }));
    }
    
    fetchProfile();
  }, []);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      try {
        const formData = new FormData();
        formData.append("profileImage", file);

        const response = await api.post("/buyer/profile/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        setProfile(response.data.profile);
        toast.success("Profile image updated successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      }
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const response = await api.put("/buyer/profile", formData);
      setProfile(response.data.profile);
      
      // Update localStorage user data if name changed
      const userData = getUserData();
      if (userData && formData.name !== userData.name) {
        userData.name = formData.name;
        localStorage.setItem("user", JSON.stringify(userData));
      }
      
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || getUserData()?.name || "",
        bio: profile.bio || "",
        company: profile.company || "",
        position: profile.position || "",
        location: profile.location || ""
      });
    } else {
      // Fallback to user data if no profile
      const userData = getUserData();
      if (userData) {
        setFormData(prev => ({
          ...prev,
          name: userData.name || prev.name
        }));
      }
    }
    setIsEditing(false);
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-lime-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#FFA500] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const displayData = isEditing ? formData : (profile || formData);
  const completeness = profile?.profileCompleteness || 0;

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-lime-50 py-8 px-4">
        <button
        onClick={() => navigate(-1)}
        className="flex items-center justify-center gap-2 
             px-6 py-3 rounded-full text-white font-medium 
             bg-gradient-to-r from-[#FFA500] to-[#708238] 
             shadow-lg hover:opacity-90 hover:scale-105 
             transition-all duration-300 ease-in-out"
      >
        ← Back
      </button>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FFA500] to-[#708238] text-white p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Professional Profile</h1>
                  <p className="text-amber-100 mt-2">Manage your professional identity</p>
                </div>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center bg-white text-[#FFA500] hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCancel}
                      className="flex items-center bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-white/30"
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center bg-white text-[#FFA500] hover:bg-amber-50 font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                    >
                      <FaSave className="mr-2" /> {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {isEditing ? (
                /* EDIT MODE */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Sidebar - Profile Image */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-amber-50 to-lime-50 rounded-2xl p-6 shadow-lg">
                      <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                          {preview ? (
                            <img
                              src={preview}
                              alt="Profile Preview"
                              className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-2xl"
                            />
                          ) : (
                            <div className="w-40 h-40 bg-gradient-to-br from-amber-200 to-lime-300 rounded-full flex items-center justify-center shadow-2xl">
                              <FaUserCircle className="text-white text-6xl" />
                            </div>
                          )}
                          <label className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#FFA500] text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-amber-600 transition-all duration-300">
                            <FaCamera />
                            <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                          </label>
                        </div>
                        <label className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-amber-200 transition font-medium">
                          Upload New Photo
                          <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Form */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                          <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                            placeholder="Your position"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                            placeholder="Your company"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                          placeholder="Your location"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Bio</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          rows="4"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#FFA500] focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300 resize-vertical"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Sidebar - Profile Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-amber-50 to-lime-50 rounded-2xl p-6 shadow-lg text-center">
                      <div className="flex flex-col items-center mb-6">
                        {preview ? (
                          <img
                            src={preview}
                            alt="Profile"
                            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-xl"
                          />
                        ) : (
                          <div className="w-32 h-32 bg-gradient-to-br from-amber-200 to-lime-300 rounded-full flex items-center justify-center shadow-xl">
                            <FaUserCircle className="text-white text-5xl" />
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-800">{displayData.name || "No Name Provided"}</h2>
                      <p className="text-[#708238] font-medium">{displayData.position || "No position set"}</p>
                      <p className="text-gray-600 text-sm mt-1">{displayData.company || "No company set"}</p>
                      <p className="text-gray-500 text-sm mt-2">{displayData.location || "No location set"}</p>
                      
                      <div className="mt-6 pt-6 border-t border-amber-200">
                        <div className="flex justify-between text-sm text-amber-700">
                          <span>Profile Completeness</span>
                          <span className="font-semibold">{completeness}%</span>
                        </div>
                        <div className="w-full bg-amber-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-[#708238] h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${completeness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Profile Details */}
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                          <label className="block text-sm font-semibold text-amber-700 mb-2">Full Name</label>
                          <p className="text-lg font-medium text-gray-800">{displayData.name || "No name provided"}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                          <label className="block text-sm font-semibold text-amber-700 mb-2">Position</label>
                          <p className="text-lg font-medium text-gray-800">{displayData.position || "Not specified"}</p>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                          <label className="block text-sm font-semibold text-amber-700 mb-2">Company</label>
                          <p className="text-lg font-medium text-gray-800">{displayData.company || "Not specified"}</p>
                        </div>
                      </div>

                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Location</label>
                        <p className="text-lg font-medium text-gray-800">{displayData.location || "Not specified"}</p>
                      </div>

                      <div className="bg-amber-50 rounded-xl p-5 border-l-4 border-[#FFA500]">
                        <label className="block text-sm font-semibold text-amber-700 mb-2">Professional Bio</label>
                        <p className="text-gray-700 leading-relaxed">{displayData.bio || "No bio provided yet."}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}