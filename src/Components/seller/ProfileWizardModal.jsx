import React, { useState, useEffect } from "react";
import { FaTimes, FaArrowRight, FaArrowLeft, FaCheck, FaSpinner } from "react-icons/fa";
import axios from "axios";

export default function ProfileWizardModal({ 
  showWizard, 
  closeWizard, 
  user 
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  
  const steps = [
    "Professional Summary",
    "Functional Role",
    "Technical Role",
    "Project History",
    "Technical Skills",
    "Certification",
    "Services Offered",
    "Language Skills"
  ];

  // State for each step's data
  const [professionalSummary, setProfessionalSummary] = useState("");
  const [functionalRoles, setFunctionalRoles] = useState([]);
  const [technicalRoles, setTechnicalRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);
  const [languages, setLanguages] = useState([]);

  // Token validation on component mount
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const cleanToken = token.replace(/^"(.*)"$/, '$1');
          // Simple validation request
          await axios.get('http://localhost:5000/api/seller/profile', {
            headers: { Authorization: `Bearer ${cleanToken}` }
          });
        } catch (error) {
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            setSaveStatus("Error: Session expired. Please log in again.");
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        }
      }
    };
    
    validateToken();
  }, []);

  // Load profile data when modal opens
  useEffect(() => {
    if (showWizard) {
      loadProfileData();
    }
  }, [showWizard]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        setSaveStatus("Error: No authentication token found");
        return;
      }
      
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      const response = await axios.get('http://localhost:5000/api/profile-wizard', {
        headers: { 
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = response.data;
      
      // Set all the data from backend
      if (data.professionalSummary) setProfessionalSummary(data.professionalSummary);
      if (data.functionalRoles) setFunctionalRoles(data.functionalRoles);
      if (data.technicalRoles) setTechnicalRoles(data.technicalRoles);
      if (data.projects) setProjects(data.projects);
      if (data.technicalSkills) setTechnicalSkills(data.technicalSkills);
      if (data.certifications) setCertifications(data.certifications);
      if (data.servicesOffered) setServicesOffered(data.servicesOffered);
      if (data.languages) setLanguages(data.languages);
      if (data.completedSteps) setCompletedSteps(data.completedSteps);
      
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setSaveStatus("Error: Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStepData = async (step) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      // Check if token exists
      if (!token) {
        setSaveStatus("Error: No authentication token found");
        // Redirect to login or handle token absence
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }
      
      // Verify token format (remove any quotes if present)
      const cleanToken = token.replace(/^"(.*)"$/, '$1');
      
      let stepData = {};
      switch(step) {
        case 0: stepData = { professionalSummary }; break;
        case 1: stepData = { functionalRoles }; break;
        case 2: stepData = { technicalRoles }; break;
        case 3: stepData = { projects }; break;
        case 4: stepData = { technicalSkills }; break;
        case 5: stepData = { certifications }; break;
        case 6: stepData = { servicesOffered }; break;
        case 7: stepData = { languages }; break;
        default: stepData = {};
      }
      
      const response = await axios.put('http://localhost:5000/api/profile-wizard/step', {
        step,
        data: stepData,
        isCompleted: true
      }, {
        headers: { 
          Authorization: `Bearer ${cleanToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      setSaveStatus("Saved successfully!");
      setTimeout(() => setSaveStatus(""), 2000);
      
      return response.data;
    } catch (error) {
      // Handle token expiration specifically
      if (error.response?.status === 401) {
        setSaveStatus("Error: Session expired. Please log in again.");
        // Clear invalid token
        localStorage.removeItem('token');
        // Redirect to login or show login modal
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        const errorMessage = error.response?.data?.message || error.message;
        setSaveStatus(`Error: ${errorMessage}`);
      }
      throw error;
    } finally {
      setSaving(false);
    }
  };
  
  const handleNext = async () => {
    try {
      // Save current step data before moving to next
      await saveStepData(currentStep);
      
      if (currentStep < steps.length - 1) {
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps([...completedSteps, currentStep]);
        }
        setCurrentStep(currentStep + 1);
      } else {
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps([...completedSteps, currentStep]);
        }
        
        // Generate standardized tagline when wizard is completed
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found for tagline generation');
            closeWizard();
            return;
          }
          
          const cleanToken = token.replace(/^"(.*)"$/, '$1');
          console.log('Generating tagline...');
          
          const response = await axios.post('http://localhost:5000/api/profile-wizard/tagline', {}, {
            headers: { 
              Authorization: `Bearer ${cleanToken}`,
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Tagline generated:', response.data);
        } catch (error) {
          console.error('Error generating tagline:', error);
          console.error('Tagline error response:', error.response?.data);
          // Don't prevent wizard completion if tagline generation fails
        }
        
        closeWizard();
      }
    } catch (error) {
      // Error is already handled in saveStepData, just log it here
      console.error('Error in handleNext:', error);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleStepClick = async (index) => {
    if (index <= completedSteps.length || index === completedSteps.length + 1) {
      try {
        // Save current step before navigating away
        if (currentStep !== index) {
          await saveStepData(currentStep);
        }
        setCurrentStep(index);
      } catch (error) {
        console.error('Error saving before navigation:', error);
      }
    }
  };

  if (!showWizard) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-8 flex items-center justify-center">
          <FaSpinner className="animate-spin text-2xl text-[#708238] mr-2" />
          <span>Loading your profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl h-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Complete Your Profile</h2>
          <div className="flex items-center">
            {saveStatus && (
              <span className={`mr-4 text-sm ${
                saveStatus.includes("Error") ? "text-red-500" : "text-green-500"
              }`}>
                {saveStatus}
              </span>
            )}
            {saving && (
              <FaSpinner className="animate-spin mr-4 text-[#708238]" />
            )}
            <button 
              onClick={closeWizard}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={saving}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep === index 
                      ? "border-[#FFA500] bg-[#FFA500] text-white" 
                      : completedSteps.includes(index)
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-500"
                  } ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {completedSteps.includes(index) && index !== currentStep ? (
                    <FaCheck className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </button>
                <span className={`text-xs mt-2 ${
                  currentStep === index ? "text-[#708238] font-medium" : "text-gray-500"
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 0 && (
            <ProfessionalSummaryStep 
              summary={professionalSummary} 
              setSummary={setProfessionalSummary} 
            />
          )}
          {currentStep === 1 && (
            <FunctionalRoleStep 
              roles={functionalRoles} 
              setRoles={setFunctionalRoles} 
            />
          )}
          {currentStep === 2 && (
            <TechnicalRoleStep 
              roles={technicalRoles} 
              setRoles={setTechnicalRoles} 
            />
          )}
          {currentStep === 3 && (
            <ProjectHistoryStep 
              projects={projects} 
              setProjects={setProjects} 
            />
          )}
          {currentStep === 4 && (
            <TechnicalSkillsStep 
              skills={technicalSkills} 
              setSkills={setTechnicalSkills} 
            />
          )}
          {currentStep === 5 && (
            <CertificationStep 
              certs={certifications} 
              setCerts={setCertifications} 
            />
          )}
          {currentStep === 6 && (
            <ServicesOfferedStep 
              services={servicesOffered} 
              setServices={setServicesOffered} 
            />
          )}
          {currentStep === 7 && (
            <LanguageSkillsStep 
              languages={languages} 
              setLanguages={setLanguages} 
            />
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between  p-6 border-t border-gray-200">
          <button
            onClick={handleBack}
            disabled={currentStep === 0 || saving}
            className={`flex items-center px-4 py-2 rounded-md ${
              currentStep === 0 || saving
                ? "bg-[#FFA500] text-white cursor-not-allowed" 
                : "bg-[#FFA500] text-white hover:bg-gray-200"
            }`}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          
          <button
            onClick={handleNext}
            disabled={saving}
            className="flex items-center px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d] disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? "Complete Profile" : "Next"} 
            <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}


// Step Components with props for data and setters
function ProfessionalSummaryStep({ summary, setSummary }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Professional Summary</h3>
      <p className="text-sm text-gray-600">
        Write a professional summary that highlights your expertise and experience.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <textarea
          value={summary}
          onChange={(e) => {
            if (e.target.value.length <= 150) {
              setSummary(e.target.value);
            }
          }}
          rows={6}
          maxLength={150}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
        />
        <p className="text-sm text-gray-500 mt-1">{summary.length}/150</p>
      </div>
    </div>
  );
}

function FunctionalRoleStep({ roles, setRoles }) {
  const [newRole, setNewRole] = useState({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });

  const addRole = () => {
    if (newRole.year && newRole.role && newRole.responsibility) {
      setRoles([...roles, newRole]);
      setNewRole({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });
    }
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Functional Role Experience</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{role.year}</td>
                <td className="border border-gray-200 px-4 py-2">{role.role}</td>
                <td className="border border-gray-200 px-4 py-2">{role.responsibility}</td>
                <td className="border border-gray-200 px-4 py-2">{role.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{role.industry}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button 
                    onClick={() => removeRole(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Functional Role</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newRole.year}
              onChange={(e) => setNewRole({...newRole, year: e.target.value})}
              placeholder="e.g. June 2023 to Current"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={newRole.role}
              onChange={(e) => setNewRole({...newRole, role: e.target.value})}
              placeholder="e.g. SAP MM Senior Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibility</label>
            <input
              type="text"
              value={newRole.responsibility}
              onChange={(e)=> setNewRole({...newRole, responsibility: e.target.value})}
              placeholder="e.g. Configuration, Sign-Off, BA, documentation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newRole.teamSize}
              onChange={(e) => setNewRole({...newRole, teamSize: e.target.value})}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newRole.industry}
              onChange={(e) => setNewRole({...newRole, industry: e.target.value})}
              placeholder="e.g. Manuf."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addRole}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Role
        </button>
      </div>
    </div>
  );
}

function TechnicalRoleStep({ roles, setRoles }) {
  const [newRole, setNewRole] = useState({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });

  const addRole = () => {
    if (newRole.year && newRole.role && newRole.responsibility) {
      setRoles([...roles, newRole]);
      setNewRole({ year: "", role: "", responsibility: "", teamSize: "", industry: "" });
    }
  };

  const removeRole = (index) => {
    setRoles(roles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Technical Role Experience</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Year</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Role</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Responsibility</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{role.year}</td>
                <td className="border border-gray-200 px-4 py-2">{role.role}</td>
                <td className="border border-gray-200 px-4 py-2">{role.responsibility}</td>
                <td className="border border-gray-200 px-4 py-2">{role.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{role.industry}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button 
                    onClick={() => removeRole(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Technical Role</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input
              type="text"
              value={newRole.year}
              onChange={(e) => setNewRole({...newRole, year: e.target.value})}
              placeholder="e.g. June 2023 to Current"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input
              type="text"
              value={newRole.role}
              onChange={(e) => setNewRole({...newRole, role: e.target.value})}
              placeholder="e.g. SAP MM Senior Consultant"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsibility</label>
            <input
              type="text"
              value={newRole.responsibility}
              onChange={(e) => setNewRole({...newRole, responsibility: e.target.value})}
              placeholder="e.g. Configuration, Sign-Off, BA, documentation"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newRole.teamSize}
              onChange={(e) => setNewRole({...newRole, teamSize: e.target.value})}
              placeholder="e.g. 2"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newRole.industry}
              onChange={(e) => setNewRole({...newRole, industry: e.target.value})}
              placeholder="e.g. Manuf."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addRole}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Role
        </button>
      </div>
    </div>
  );
}

function ProjectHistoryStep({ projects, setProjects }) {
  const [newProject, setNewProject] = useState({ name: "", industry: "", role: "", teamSize: "", activities: "" });

  const addProject = () => {
    if (newProject.name && newProject.industry && newProject.role) {
      setProjects([...projects, newProject]);
      setNewProject({ name: "", industry: "", role: "", teamSize: "", activities: "" });
    }
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Project Delivered</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Project Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Industry</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Role Played</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Team Size</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Activities</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{project.name}</td>
                <td className="border border-gray-200 px-4 py-2">{project.industry}</td>
                <td className="border border-gray-200 px-4 py-2">{project.role}</td>
                <td className="border border-gray-200 px-4 py-2">{project.teamSize}</td>
                <td className="border border-gray-200 px-4 py-2">{project.activities}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button 
                    onClick={() => removeProject(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Project</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              placeholder="e.g. S4HANA"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={newProject.industry}
              onChange={(e) => setNewProject({...newProject, industry: e.target.value})}
              placeholder="e.g. Manufacturing"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Played</label>
            <input
              type="text"
              value={newProject.role}
              onChange={(e) => setNewProject({...newProject, role: e.target.value})}
              placeholder="e.g. Team Lead"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
            <input
              type="text"
              value={newProject.teamSize}
              onChange={(e) => setNewProject({...newProject, teamSize: e.target.value})}
              placeholder="e.g. 4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activities</label>
            <input
              type="text"
              value={newProject.activities}
              onChange={(e) => setNewProject({...newProject, activities: e.target.value})}
              placeholder="e.g. Interviewing, documentation, communication"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addProject}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Project
        </button>
      </div>
    </div>
  );
}

function TechnicalSkillsStep({ skills, setSkills }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Technical Skills</h3>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div key={skill} className="relative group">
            <span className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20">
              {skill}
            </span>
            <button
              onClick={() => removeSkill(skill)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Skill</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
          
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            Add Skill
          </button>
        </div>
      </div>
    </div>
  );
}

function CertificationStep({ certs, setCerts }) {
  const [newCert, setNewCert] = useState({ name: "", exam: "", number: "", issuedBy: "", validity: "" });

  const addCert = () => {
    if (newCert.name && newCert.exam && newCert.issuedBy) {
      setCerts([...certs, newCert]);
      setNewCert({ name: "", exam: "", number: "", issuedBy: "", validity: "" });
    }
  };

  const removeCert = (index) => {
    setCerts(certs.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Certification Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Exam</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Certification No.</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Issued By</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Validity/Expire Date</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {certs.map((cert, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{cert.name}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.exam}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.number}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.issuedBy}</td>
                <td className="border border-gray-200 px-4 py-2">{cert.validity}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button 
                    onClick={() => removeCert(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Certification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
            <input
              type="text"
              value={newCert.name}
              onChange={(e) => setNewCert({...newCert, name: e.target.value})}
              placeholder="e.g. SAP CRM"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam</label>
            <input
              type="text"
              value={newCert.exam}
              onChange={(e) => setNewCert({...newCert, exam: e.target.value})}
              placeholder="e.g. CAT-05"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification No.</label>
            <input
              type="text"
              value={newCert.number}
              onChange={(e) => setNewCert({...newCert, number: e.target.value})}
              placeholder="e.g. 123456"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issued By</label>
            <input
              type="text"
              value={newCert.issuedBy}
              onChange={(e) => setNewCert({...newCert, issuedBy: e.target.value})}
              placeholder="e.g. SAP SE"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Validity/Expire Date</label>
            <input
              type="text"
              value={newCert.validity}
              onChange={(e) => setNewCert({...newCert, validity: e.target.value})}
              placeholder="e.g. 2025-12-31"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
        </div>
        
        <button
          onClick={addCert}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Certification
        </button>
      </div>
    </div>
  );
}

function ServicesOfferedStep({ services, setServices }) {
  const [newService, setNewService] = useState("");

  const addService = () => {
    if (newService && !services.includes(newService)) {
      setServices([...services, newService]);
      setNewService("");
    }
  };

  const removeService = (serviceToRemove) => {
    setServices(services.filter(service => service !== serviceToRemove));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Services Offered</h3>
      
      <div className="flex flex-wrap gap-3">
        {services.map((service) => (
          <div key={service} className="relative group">
            <span className="px-4 py-2 bg-[#708238]/10 text-[#708238] text-sm font-medium rounded-md border border-[#708238]/20">
              {service}
            </span>
            <button
              onClick={() => removeService(service)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Service</h4>
        <div className="flex gap-2">
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            placeholder="Enter a service"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
          />
          
          <button
            onClick={addService}
            className="px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
}

function LanguageSkillsStep({ languages, setLanguages }) {
  const [newLanguage, setNewLanguage] = useState({ language: "", proficiency: "" });

  const addLanguage = () => {
    if (newLanguage.language && newLanguage.proficiency) {
      setLanguages([...languages, newLanguage]);
      setNewLanguage({ language: "", proficiency: "" });
    }
  };

  const removeLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Language Skills</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-200 px-4 py-2 text-left">Language</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Proficiency</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-200 px-4 py-2">{lang.language}</td>
                <td className="border border-gray-200 px-4 py-2">{lang.proficiency}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button 
                    onClick={() => removeLanguage(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium text-gray-800 mb-3">Add Language</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
            <input
              type="text"
              value={newLanguage.language}
              onChange={(e) => setNewLanguage({...newLanguage, language: e.target.value})}
              placeholder="e.g. English"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Proficiency</label>
            <select
  value={newLanguage.proficiency}
  onChange={(e) => setNewLanguage({...newLanguage, proficiency: e.target.value})}
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#708238] focus:border-[#708238]"
>
  <option value="">Select proficiency</option>
  <option value="Native">Native</option>
  <option value="Fluent">Fluent</option>
  <option value="Intermediate">Intermediate</option>
  <option value="Basic">Basic</option>
</select>
            
          </div>
        </div>
        
        <button
          onClick={addLanguage}
          className="mt-4 px-4 py-2 bg-[#708238] text-white rounded-md hover:bg-[#5a6a2d]"
        >
          Add Language
        </button>
      </div>
    </div>
  );
}