// src/Components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// API Base URL - Use environment variable with fallback
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://just-erp-backend.onrender.com";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // success/error
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle role toggle
  const toggleRole = () => {
    setFormData(prev => ({
      ...prev,
      role: prev.role === "buyer" ? "seller" : "buyer"
    }));
  };

  // Validate form data
  const validateForm = () => {
    if (!formData.username.trim()) {
      return "Username is required";
    }
    if (!formData.email.trim()) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Email is invalid";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setMessage({ text: validationError, type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // const response = await axios.post(
      //   `${API_BASE_URL}/api/auth/register`,
      //   {
      //     username: formData.username.trim(),
      //     email: formData.email.trim().toLowerCase(),
      //     password: formData.password,
      //     roles: [formData.role],
      //   },
      //   {
      //     timeout: 30000, // 30 second timeout
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }
      // );
      const response = await axios.post(
  `${API_BASE_URL}/api/auth/register`,
  {
    username: formData.username.trim(),
    email: formData.email.trim().toLowerCase(),
    password: formData.password,
    roles: [formData.role],
  },
  {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false // Add this line
  }
);

      setMessage({ 
        text: "Registered successfully! Please check your email for verification code.", 
        type: "success" 
      });

      // Save email for verification page
      localStorage.setItem("verif_email", formData.email);
      
      // Redirect to verification page after short delay
      setTimeout(() => {
        navigate("/verify", { 
          state: { 
            email: formData.email,
            from: "register" 
          } 
        });
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      } else {
        // Something else happened
        errorMessage = error.message || errorMessage;
      }
      
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4e3] to-[#e2e8d0] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <div className="bg-gradient-to-r from-[#FFA500] to-[#8fa752] p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-white/90 mt-2">Join our community today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              required
              minLength={3}
            />
          </div>
          
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              required
            />
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password *
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition disabled:opacity-50 disabled:cursor-not-allowed"
              required
              minLength={6}
            />
          </div>
          
          {/* Role Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to be a *
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={toggleRole}
                disabled={loading}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 disabled:opacity-50 ${
                  formData.role === "buyer" 
                    ? "bg-white text-[#708238] shadow-md" 
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={toggleRole}
                disabled={loading}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 disabled:opacity-50 ${
                  formData.role === "seller" 
                    ? "bg-white text-[#708238] shadow-md" 
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Seller
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              loading 
                ? "bg-gray-400" 
                : "bg-gradient-to-r from-[#FFA500] to-[#8fa752] hover:from-[#5c6b2d] hover:to-[#748b3f] shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </div>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        
        {/* Message Display */}
        {message.text && (
          <div className={`px-6 pb-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
            <div className={`p-3 rounded-lg border ${
              message.type === "success" 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              {message.text}
            </div>
          </div>
        )}
        
        {/* Login Redirect */}
        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/signIn")} 
              disabled={loading}
              className="text-[#708238] font-semibold hover:underline focus:outline-none transition-all duration-300 hover:text-[#5c6b2d] disabled:opacity-50"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;