// src/Components/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer", // default role
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // handle input
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // handle role toggle
  const toggleRole = () => {
    setFormData({
      ...formData,
      role: formData.role === "buyer" ? "seller" : "buyer"
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        roles: [formData.role],
      });

      setMessage("✅ Registered successfully!");
      console.log("Registered user:", res.data);

      // Redirect to login after success
      navigate("/signIn");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed");
      console.error("Error registering:", err.response?.data || err.message);
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
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I want to be a
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={toggleRole}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
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
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-300 ${
                  formData.role === "seller" 
                    ? "bg-white text-[#708238] shadow-md" 
                    : "bg-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Seller
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
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
        
        {message && (
          <div className={`px-6 pb-4 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>
            <div className={`p-3 rounded-lg ${message.includes("✅") ? "bg-green-50" : "bg-red-50"} border ${message.includes("✅") ? "border-green-200" : "border-red-200"}`}>
              {message}
            </div>
          </div>
        )}
        
        <div className="px-6 pb-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/signIn")} 
              className="text-[#708238] font-semibold hover:underline focus:outline-none transition-all duration-300 hover:text-[#5c6b2d]"
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