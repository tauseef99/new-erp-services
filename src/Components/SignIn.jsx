// frontend/src/Components/SignIn.jsx
import React, { useState } from "react";
import myImage from "../Assets/images/signin-bg2.png";
import { FcGoogle } from "react-icons/fc";
import { FaRegEnvelope, FaApple, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: identifier, 
        password,
      });

    
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setMessage("✅ Login successful!");

      const role = res.data.user.roles[0]; 
      if (role === "buyer") {
        navigate("/buyer/dashboard");
      } else if (role === "seller") {
        navigate("/seller/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setMessage(err.response?.data?.message || " Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden h-screen">
  {/* Left Side Section - Image (Full width on small, half on large) */}
  <div className="w-full md:w-1/2 h-48 md:h-full">
    <img
      src={myImage}
      alt="Woman working on laptop"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right Side Section */}
  <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center overflow-y-auto">
    <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">
      Sign in to your account
    </h2>
    <p className="mb-5 text-gray-600 text-sm">
      Don’t have an account?{" "}
      <Link to="/register">
        <button className="text-[#FFA500] underline hover:text-[#708238]">
          Join here
        </button>
      </Link>
    </p>

    {!showEmailForm ? (
      <>
        {/* Google Login */}
        <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-3 hover:bg-gray-50 text-sm">
          <FcGoogle className="w-5 h-5 mr-2" />
          Continue with Google
        </button>

        {/* Email Form Trigger */}
        <button
          onClick={() => setShowEmailForm(true)}
          className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 mb-5 hover:bg-gray-50 text-sm"
        >
          <FaRegEnvelope className="w-5 h-5 mr-2" />
          Continue with email/username
        </button>
      </>
    ) : (
      <form onSubmit={handleLogin} className="space-y-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email or Username
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
            placeholder="Enter your email or username"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500]"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#708238] hover:bg-[#FFA500] text-white py-2 rounded-md"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}

        <p className="text-xs text-gray-500 text-center">
          <button
            type="button"
            onClick={() => setShowEmailForm(false)}
            className="text-[#FFA500] underline hover:text-[#708238]"
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
          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm">
            <FaApple className="w-5 h-5" />
            <span className="ml-2">Apple</span>
          </button>

          <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-3 hover:bg-gray-50 text-sm text-blue-600 font-semibold">
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
