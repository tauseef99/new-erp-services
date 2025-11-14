// frontend/src/Components/SignIn.jsx
import React, { useState } from "react";
import myImage from "../Assets/images/signin-bg2.png";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope, FaApple, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://just-erp-backend.onrender.com";

export default function SignInForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!identifier.trim() || !password.trim()) {
      setMessage({ text: "Please enter both email and password", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { 
          email: identifier.trim().toLowerCase(), 
          password 
        },
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      // Store authentication data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage({ text: "Login successful! Redirecting...", type: "success" });

      // Redirect based on user role
      setTimeout(() => {
        const role = response.data.user.roles[0];
        switch (role) {
          case "buyer":
            navigate("/buyer/dashboard");
            break;
          case "seller":
            navigate("/seller/dashboard");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          default:
            navigate("/");
        }
      }, 1000);

    } catch (error) {
      console.error("Login error:", error);
      
      let errorMessage = "Login failed. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        
        // Handle specific error cases
        if (error.response.status === 401) {
          errorMessage = "Invalid email or password";
        } else if (error.response.status === 403) {
          errorMessage = "Please verify your email before logging in";
        }
      } else if (error.request) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden h-screen">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 h-48 md:h-full">
        <img
          src={myImage}
          alt="Person working on laptop"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
          Sign in to your account
        </h2>
        <p className="mb-5 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/register">
            <button 
              disabled={loading}
              className="text-[#FFA500] underline hover:text-[#708238] disabled:opacity-50"
            >
              Join here
            </button>
          </Link>
        </p>

        {!showEmailForm ? (
          <>
            {/* Social Login Options */}
            <button 
              disabled={loading}
              className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-3 hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </button>

            {/* Email Login Trigger */}
            <button
              onClick={() => setShowEmailForm(true)}
              disabled={loading}
              className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-5 hover:bg-gray-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaRegEnvelope className="w-5 h-5 mr-2" />
              Continue with email
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 mb-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500] disabled:opacity-50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500] disabled:opacity-50"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#708238] hover:bg-[#FFA500] text-white py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Message Display */}
            {message.text && (
              <div className={`text-center text-sm mt-2 ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}>
                {message.text}
              </div>
            )}

            <p className="text-xs text-gray-500 text-center">
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                disabled={loading}
                className="text-[#FFA500] underline hover:text-[#708238] disabled:opacity-50"
              >
                ← Back
              </button>
            </p>
          </form>
        )}

        {!showEmailForm && (
          <>
            <div className="flex items-center justify-center text-gray-400 mb-5">
              <span className="border-b border-gray-300 w-14"></span>
              <span className="px-3">OR</span>
              <span className="border-b border-gray-300 w-14"></span>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <button 
                disabled={loading}
                className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm disabled:opacity-50"
              >
                <FaApple className="w-5 h-5" />
                <span className="ml-2">Apple</span>
              </button>

              <button 
                disabled={loading}
                className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm text-blue-600 font-semibold disabled:opacity-50"
              >
                <FaFacebookF className="w-5 h-5" />
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </>
        )}

        <p className="mt-6 text-xs text-gray-400">
          By joining, you agree to our{" "}
          <span className="underline text-[#FFA500] hover:text-[#708238] cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline text-[#FFA500] hover:text-[#708238] cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}