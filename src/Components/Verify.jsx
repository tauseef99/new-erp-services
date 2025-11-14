// frontend/src/Components/Verify.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://just-erp-backend.onrender.com";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from location state or localStorage
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      localStorage.setItem("verif_email", location.state.email);
    } else {
      const storedEmail = localStorage.getItem("verif_email");
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }
  }, [location.state]);

  // Handle resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Validate inputs
  const validateInputs = () => {
    if (!email.trim()) {
      return "Email is required";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Please enter a valid email address";
    }
    if (!code.trim()) {
      return "Verification code is required";
    }
    if (code.trim().length !== 6) {
      return "Verification code must be 6 digits";
    }
    return null;
  };

  // Handle email verification
  const handleVerify = async (e) => {
    e.preventDefault();
    
    const validationError = validateInputs();
    if (validationError) {
      setMessage({ text: validationError, type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/verify-email`,
        { 
          email: email.trim().toLowerCase(), 
          code: code.trim() 
        },
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setMessage({ 
        text: response.data.message || "Email verified successfully!", 
        type: "success" 
      });

      // Clean up stored email
      localStorage.removeItem("verif_email");

      // Redirect to login after delay
      setTimeout(() => {
        navigate("/signIn", { 
          state: { 
            message: "Email verified successfully! You can now login.",
            verified: true 
          } 
        });
      }, 1500);

    } catch (error) {
      console.error("Verification error:", error);
      
      let errorMessage = "Verification failed. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        
        if (error.response.status === 400) {
          errorMessage = "Invalid verification code. Please check and try again.";
        } else if (error.response.status === 404) {
          errorMessage = "No pending verification found for this email.";
        }
      } else if (error.request) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Handle resend verification code
  const handleResend = async () => {
    if (!email.trim()) {
      setMessage({ text: "Email is required to resend code", type: "error" });
      return;
    }

    if (resendCooldown > 0) {
      setMessage({ 
        text: `Please wait ${resendCooldown} seconds before requesting a new code`, 
        type: "error" 
      });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/resend-code`,
        { email: email.trim().toLowerCase() },
        {
          timeout: 30000,
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      setMessage({ 
        text: response.data.message || "Verification code sent successfully!", 
        type: "success" 
      });
      
      // Set cooldown (60 seconds)
      setResendCooldown(60);

    } catch (error) {
      console.error("Resend error:", error);
      
      let errorMessage = "Failed to resend verification code. Please try again.";
      
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      }
      
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Verify your email</h2>
          <p className="text-sm text-gray-600 mt-2">
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {email && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800 text-center">
              Code sent to: <span className="font-medium">{email}</span>
            </p>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition disabled:opacity-50"
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Verification Code Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code *
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => {
                // Allow only numbers and limit to 6 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setCode(value);
              }}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#708238] focus:border-transparent transition text-center text-lg font-mono disabled:opacity-50"
              placeholder="000000"
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the 6-digit code from your email
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                "Verify Email"
              )}
            </button>
            
            <button
              type="button"
              onClick={handleResend}
              disabled={loading || resendCooldown > 0}
              className="py-2 px-4 border border-gray-300 hover:bg-gray-50 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : "Resend Code"}
            </button>
          </div>
        </form>

        {/* Message Display */}
        {message.text && (
          <div className={`mt-4 p-3 rounded-lg border text-center ${
            message.type === "success" 
              ? "bg-green-50 border-green-200 text-green-800" 
              : "bg-red-50 border-red-200 text-red-800"
          }`}>
            {message.text}
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive the code? Check your spam folder or{" "}
            <button
              onClick={handleResend}
              disabled={loading || resendCooldown > 0}
              className="text-[#FFA500] hover:text-[#708238] underline disabled:opacity-50"
            >
              request a new one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}