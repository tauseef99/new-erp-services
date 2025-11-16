import React, { useState } from 'react';
import axios from 'axios';

// API Base URL - Use environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://just-erp-backend.onrender.com";

const ProfileImageUpload = ({ currentImage, onImageUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadStatus('Error: Please select a valid image file');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadStatus('Error: Image size must be less than 5MB');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setIsUploading(true);
      setUploadStatus('Uploading...');
      
      const token = localStorage.getItem('token');
      
      // Check if token exists
      if (!token) {
        setUploadStatus('Error: No authentication token found');
        setTimeout(() => {
          window.location.href = '/signIn';
        }, 2000);
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');

      const response = await axios.put(`${API_BASE_URL}/api/seller/profile`, formData, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      onImageUpdate(response.data.profileImage);
      setUploadStatus('Image uploaded successfully!');
      setTimeout(() => setUploadStatus(''), 2000);
      
    } catch (error) {
      console.error('Error uploading image:', error);
      
      // Handle token expiration
      if (error.response?.status === 401) {
        setUploadStatus('Error: Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          window.location.href = '/signIn';
        }, 2000);
      } else if (error.code === 'NETWORK_ERROR' || error.message.includes('network')) {
        setUploadStatus('Error: Network error. Please check your connection.');
      } else {
        setUploadStatus('Error: Failed to upload image. Please try again.');
      }
      
      setTimeout(() => setUploadStatus(''), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  // Default profile image
  const defaultImage = "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg";

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={currentImage || defaultImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <label
          htmlFor="profileImageUpload"
          className={`absolute bottom-0 right-0 bg-[#708238] text-white p-2 rounded-full cursor-pointer hover:bg-[#5a6a2d] transition-colors ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <svg 
            className={`w-4 h-4 ${isUploading ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isUploading ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4m0 12v4m8-10h-4M6 12H2m15.364-7.364l-2.828 2.828M7.464 17.536l-2.828 2.828m0-12.728l2.828 2.828m9.9 9.9l2.828 2.828" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            )}
          </svg>
          <input
            id="profileImageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
      
      {/* Status Message */}
      {uploadStatus && (
        <p className={`text-sm mt-2 ${
          uploadStatus.includes('Error') 
            ? 'text-red-500' 
            : uploadStatus.includes('success')
            ? 'text-green-500'
            : 'text-gray-500'
        }`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default ProfileImageUpload;