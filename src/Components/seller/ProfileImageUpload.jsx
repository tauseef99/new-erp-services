import React, { useState } from 'react';
import axios from 'axios';

const ProfileImageUpload = ({ currentImage, onImageUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      setIsUploading(true);
      const token = localStorage.getItem('token');
      const cleanToken = token.replace(/^"(.*)"$/, '$1');

      const response = await axios.put('http://localhost:5000/api/seller/profile', formData, {
        headers: {
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onImageUpdate(response.data.profileImage);
      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <img
          src={currentImage || "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small_2x/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg"}
          alt="profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <label
          htmlFor="profileImageUpload"
          className="absolute bottom-0 right-0 bg-[#708238] text-white p-2 rounded-full cursor-pointer hover:bg-[#5a6a2d]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
      {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
    </div>
  );
};

export default ProfileImageUpload;