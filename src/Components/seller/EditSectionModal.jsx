import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditSectionModal = ({ section, data, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState(section === 'professionalSummary' ? '' : []);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Reset form data when modal opens or section changes
    if (section === 'professionalSummary') {
      setFormData(data || '');
    } else if (section === 'profileImage') {
      setFormData(data || '');
      setImagePreview(data || null);
    } else {
      // For array data, ensure we have an array
      setFormData(Array.isArray(data) ? [...data] : []);
    }
  }, [data, isOpen, section]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(newArray);
  };

  const addArrayItem = () => {
    // Create appropriate template based on section type
    let template = {};
    
    switch(section) {
      case 'functionalRoles':
      case 'technicalRoles':
        template = { year: '', role: '', responsibility: '', teamSize: '', industry: '' };
        break;
      case 'projects':
        template = { name: '', industry: '', role: '', teamSize: '', activities: '' };
        break;
      case 'technicalSkills':
        // For technical skills, we're storing as array of strings, not objects
        template = '';
        break;
      case 'certifications':
        template = { name: '', exam: '', number: '', issuedBy: '', validity: '' };
        break;
      case 'servicesOffered':
        // For services offered, we're storing as array of strings, not objects
        template = '';
        break;
      case 'languages':
        template = { language: '', proficiency: '' };
        break;
      default:
        template = {};
    }
    
    setFormData(prev => [...prev, template]);
  };

  const removeArrayItem = (index) => {
    setFormData(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('profileImage', file);
      
      const token = localStorage.getItem('token');
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      const response = await axios.post('http://localhost:5000/api/seller/profile/upload-image', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${cleanToken}`
        }
      });
      
      // Set the image path returned from server
      const imagePath = response.data.profileImage;
      setFormData(imagePath);
      setUploading(false);
      
      // Call onSave to update the profile image immediately
      onSave(imagePath);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (!isOpen) return null;

  const renderFormFields = () => {
    switch (section) {
      case 'professionalSummary':
        return (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Professional Summary
            </label>
            <textarea
              value={formData || ''}
              onChange={(e) => setFormData(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
              rows="4"
              maxLength="150"
              placeholder="Brief professional summary (max 150 characters)"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.length}/150 characters</p>
          </div>
        );

      case 'functionalRoles':
      case 'technicalRoles':
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">
                {section === 'functionalRoles' ? 'Functional Roles' : 'Technical Roles'}
              </label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Role
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No roles added yet. Click "Add Role" to get started.
              </div>
            ) : (
              formData.map((role, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Year</label>
                      <input
                        type="text"
                        value={role.year || ''}
                        onChange={(e) => handleArrayChange(index, 'year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="e.g., 2020-2022"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Role</label>
                      <input
                        type="text"
                        value={role.role || ''}
                        onChange={(e) => handleArrayChange(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="e.g., Project Manager"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Responsibility</label>
                    <textarea
                      value={role.responsibility || ''}
                      onChange={(e) => handleArrayChange(index, 'responsibility', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      rows="2"
                      placeholder="Describe your responsibilities"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Team Size</label>
                      <input
                        type="text"
                        value={role.teamSize || ''}
                        onChange={(e) => handleArrayChange(index, 'teamSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="e.g., 5-10 people"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Industry</label>
                      <input
                        type="text"
                        value={role.industry || ''}
                        onChange={(e) => handleArrayChange(index, 'industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="e.g., IT, Healthcare"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'projects':
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">Projects</label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Project
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No projects added yet. Click "Add Project" to get started.
              </div>
            ) : (
              formData.map((project, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Project Name</label>
                    <input
                      type="text"
                      value={project.name || ''}
                      onChange={(e) => handleArrayChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      placeholder="Project name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Industry</label>
                      <input
                        type="text"
                        value={project.industry || ''}
                        onChange={(e) => handleArrayChange(index, 'industry', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Industry"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Role Played</label>
                      <input
                        type="text"
                        value={project.role || ''}
                        onChange={(e) => handleArrayChange(index, 'role', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Your role in the project"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Team Size</label>
                      <input
                        type="text"
                        value={project.teamSize || ''}
                        onChange={(e) => handleArrayChange(index, 'teamSize', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Team size"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Activities</label>
                      <input
                        type="text"
                        value={project.activities || ''}
                        onChange={(e) => handleArrayChange(index, 'activities', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Activities performed"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'technicalSkills':
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">Technical Skills</label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Skill
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No skills added yet. Click "Add Skill" to get started.
              </div>
            ) : (
              formData.map((skill, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Skill Name</label>
                    <input
                      type="text"
                      value={skill || ''}
                      onChange={(e) => {
                        const newArray = [...formData];
                        newArray[index] = e.target.value;
                        setFormData(newArray);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      placeholder="e.g., JavaScript, React, Node.js"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'servicesOffered':
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">Services Offered</label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Service
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No services added yet. Click "Add Service" to get started.
              </div>
            ) : (
              formData.map((service, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Service Name</label>
                    <input
                      type="text"
                      value={service || ''}
                      onChange={(e) => {
                        const newArray = [...formData];
                        newArray[index] = e.target.value;
                        setFormData(newArray);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      placeholder="Service name"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'certifications':
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">Certifications</label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Certification
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No certifications added yet. Click "Add Certification" to get started.
              </div>
            ) : (
              formData.map((cert, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="mb-3">
                    <label className="block text-gray-700 text-sm mb-1">Certification Name</label>
                    <input
                      type="text"
                      value={cert.name || ''}
                      onChange={(e) => handleArrayChange(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      placeholder="Certification name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Exam</label>
                      <input
                        type="text"
                        value={cert.exam || ''}
                        onChange={(e) => handleArrayChange(index, 'exam', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Exam name"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Certification No.</label>
                      <input
                        type="text"
                        value={cert.number || ''}
                        onChange={(e) => handleArrayChange(index, 'number', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Certification number"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Issued By</label>
                      <input
                        type="text"
                        value={cert.issuedBy || ''}
                        onChange={(e) => handleArrayChange(index, 'issuedBy', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Issuing organization"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Validity/Expire Date</label>
                      <input
                        type="text"
                        value={cert.validity || ''}
                        onChange={(e) => handleArrayChange(index, 'validity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                        placeholder="Validity or expiration date"
                      />
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      case 'languages':
        const languageOptions = ['English', 'Urdu', 'Arabic', 'French', 'Spanish', 'Hindi'];
        
        return (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 text-sm font-bold">Languages</label>
              <button
                type="button"
                onClick={addArrayItem}
                className="bg-[#708238] text-white px-3 py-1 rounded text-sm hover:bg-[#5a6a2d] transition-colors"
              >
                Add Language
              </button>
            </div>
            
            {formData.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No languages added yet. Click "Add Language" to get started.
              </div>
            ) : (
              formData.map((lang, index) => (
                <div key={index} className="border p-4 rounded mb-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Language</label>
                      <select
                        value={lang.language || ''}
                        onChange={(e) => handleArrayChange(index, 'language', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      >
                        <option value="">Select Language</option>
                        {languageOptions.map(langOption => (
                          <option key={langOption} value={langOption}>{langOption}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1">Proficiency</label>
                      <select
                        value={lang.proficiency || ''}
                        onChange={(e) => handleArrayChange(index, 'proficiency', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#708238]"
                      >
                        <option value="">Select proficiency</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native">Native</option>
                      </select>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-4 text-gray-500">
            No form fields defined for this section.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Edit {section.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {renderFormFields()}
            
            <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSectionModal;